-- create notes table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    tag VARCHAR(12),
    note TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create people table
CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    is_npc BOOLEAN,
    family VARCHAR(20),
    relations TEXT[],
    orgs TEXT[],
    note TEXT,
    note_id INT,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);

-- create place table
CREATE TABLE place (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    location VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    orgs TEXT[],
    owned_by VARCHAR(20),
    note text,
    note_id INT,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);

-- create thing table
CREATE TABLE thing (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    type VARCHAR(20) NOT NULL,
    is_magic BOOLEAN,
    owned_by VARCHAR(30),
    description TEXT,
    note TEXT,
    note_id INT,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);

-- create event table
CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    persons_involved TEXT[],
    location VARCHAR(100),
    is_combat BOOLEAN,
    loot TEXT[],
    note TEXT,
    note_id INT,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);

-- create fam table
CREATE TABLE fam (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    fam_id INT,
    status VARCHAR(30),
    family_members TEXT[],
    orgs TEXT[],
    relations TEXT[],
    lives_in TEXT,
    note TEXT,
    note_id INT,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);

-- create org table
CREATE TABLE org (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    org_id INT,
    type VARCHAR(100),
    members TEXT[],
    relations TEXT[],
    found_in TEXT[],
    note TEXT,
    note_id INT,
    FOREIGN KEY (note_id) REFERENCES notes(id)
);

-- trigger functions

-- The `id` from `notes` will be captured for use in the `notes_id` of the chosen table and will be submitted when the user submits their note.

-- Whenever a new note is entered on a table, its `name` is sent to the `notes` table as the value for the `title` column. The table's `id` is sent to the `notes` table setting the `tag` column value to the first two characters of the origin table's name and the id for the post. For instance if the post id is 266 in the `events` table, the `tag` value in `notes` would be `ev266`. The table's `note` is set to the `notes` table setting the `note` colum value to match both columns.

CREATE OR REPLACE FUNCTION insert_note_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- insert title, tag, and note into notes table
    UPDATE notes
        SET title = NEW.name,
            tag = SUBSTRING(TG_TABLE_NAME FROM 1 FOR 2) || NEW.id,
            note = NEW.note    
        WHERE id = NEW.note_id;
        RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

-- When a note is entered into the `event` table, if the `persons_involved` column includes a name that is not included in the `people` table, create a new note in the `people` table for that person referencing the `note_id` being assigned to the new entry for the `event` table.

-- When a note is created in the `event` table, if an item being placed in the `loot` column is not in the `thing` table, create a new note in the `thing` table for that item referencing the `notes_id` being assigned to the new entry for the `event` table.

CREATE OR REPLACE FUNCTION ev_insert_person_or_item_trigger()
RETURNS TRIGGER AS $$
DECLARE
    person TEXT;
    item TEXT;
BEGIN
    -- loop through the `persons_involved` to check if element of `persons_involved` is in the `people` table
    FOREACH person IN ARRAY NEW.persons_involved
    LOOP
        -- check if person is in the people table
        IF NOT EXISTS (SELECT name FROM people WHERE name = person) THEN
            -- if not, insert new row for that person  
            INSERT INTO people (name, note_id) VALUES (person, NEW.note_id);
        END IF;
    END LOOP;

    FOREACH item IN ARRAY new.loot
    LOOP
        -- check if the item is in the thing table
        IF NOT EXISTS (SELECT name FROM thing WHERE name = item) THEN
            --if not, insert new row for that item
            INSERT INTO thing (name, note_id) VALUES (item, NEW.note_id);
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

-- When a note is created on the `person` table, if no values in `fam.name` match the `family` provided in the note entry, create a new entry in the `fam` table, referencing the `notes_id` being assigned to the new entry for the `people` table. Also, this new entry being sent to the fam table should increment the fam_id up one to the next highest value.

CREATE OR REPLACE FUNCTION pe_insert_family_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (SELECT name FROM fam WHERE name = NEW.family) THEN
        INSERT INTO fam (name, fam_id, note_id) VALUES (
            NEW.family,
            (SELECT COALESCE(MAX(fam_id), 0) + 1 FROM fam),    
            NEW.note_id;
        )
    END IF

    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

-- When a note is created in the `org` table, if one of the people listed in `members` on that post is not anywhere in the `people` table, create a new note in the `people` table for that member of the family referencing the `notes_id` being assigned to the new entry for the `org` table.

CREATE OR REPLACE FUNCTION org_insert_person_trigger()
RETURNS TRIGGER AS $$
DECLARE
    person TEXT;
BEGIN
    -- loop through each person in memebers entry
    FOREACH person IN ARRAY NEW.members
    LOOP
        -- check if person is in the people table
        IF NOT EXISTS ( SELECT name FROM people WHERE name = person) THEN
            -- if not, insert new row for that person
            INSERT INTO people (name, note_id) VALUES (person, NEW.note_id);
        END IF;
    END LOOP;
    
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;


-- When a note is created in the `fam` table, if one of the people listed in `members` on that post is not anywhere in the `people` table, create a new note in the `people` table for that member of the family referencing the `notes_id` being assigned to the new entry for the `fam` table.

CREATE OR REPLACE FUNCTION fam_insert_person_trigger()
RETURNS TRIGGER AS $$
DECLARE
    person TEXT;
BEGIN 
    -- loop through each person in family_members
    FOREACH person IN ARRAY NEW.family_members
    LOOP
        -- check if person is in the people table
        IF NOT EXISTS (SELECT name FROM people WHERE name = person) THEN
            -- if not, insert now row for that person
            INSERT INTO people (name, note_id) VALUES (person, NEW.note_id);
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

-- triggers

-- Create the trigger on the 'event' table
CREATE TRIGGER ev_add_notes_data_trigger
AFTER INSERT ON event
FOR EACH ROW
EXECUTE FUNCTION insert_note_trigger();

CREATE TRIGGER insert_p_or_i_trigger
AFTER INSERT ON event
FOR EACH ROW
EXECUTE FUNCTION ev_insert_person_or_item_trigger();

-- Create the trigger on the 'person' table
CREATE TRIGGER pe_add_notes_data_trigger
AFTER INSERT ON person
FOR EACH ROW
EXECUTE FUNCTION insert_note_trigger();

CREATE TRIGGER insert_family_trigger
AFTER INSERT ON person
FOR EACH ROW
EXECUTE FUNCTION pe_insert_family_trigger();

-- Create the trigger on the 'org' table
CREATE TRIGGER org_add_notes_data_trigger
AFTER INSERT ON org
FOR EACH ROW
EXECUTE FUNCTION insert_note_trigger();


CREATE TRIGGER insert_person_org_trigger
AFTER INSERT ON org
FOR EACH ROW
EXECUTE FUNCTION org_insert_person_trigger();

-- Create the trigger on the 'fam' table
CREATE TRIGGER fam_add_notes_data_trigger
AFTER INSERT ON fam
FOR EACH ROW
EXECUTE FUNCTION insert_note_trigger();

CREATE TRIGGER insert_person_fam_trigger
AFTER INSERT ON fam
FOR EACH ROW
EXECUTE FUNCTION fam_insert_person_trigger();
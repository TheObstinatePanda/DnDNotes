# Notes app

## Intended for use with Dungeons and Dragons or other TTRPG games

This app is intended to assist TTRPG to take notes from their character's perspective. It allows users to create notes about people, places, things, events, and more. It is currently under development and has limited functionality but the active and planned functionality is detailed below.

## Getting Started

These instructions give a brief overview of the technologies used to develop this project and the skills used to produce it.

## Installing

I using Node and Node Package Manager(NPM) for all my projects so this installation guide goes over NPM methods for installation. If you use another package managment tool, please consult their documentation.

First, create a new directory and clone the repository into it:

```bash
git clone https://github.com/TheObstinatePanda/DnDNotes.git
```

Install the dependant modules by running:

```bash
npm install
```

This should install `dotenv`, `express`, `morgan`, `pg`, `debug`, `jest`, and `supertest` modules.

Note - `dotenv`, `express`, `morgan`, `pg`, and `debug` are currently separated in package.json from `jest` and `supertest`. The are in `"dependencies"` and `"devDependencies"` respectively.

You will then need to set up the database of your choosing - the schema was written with `postgres` in mind as the database. If you are using any other database management make sure the queries set in the `schema.sql` file will work for that database. For the sake of creating this database, I used [Postbird](https://github.com/Paxa/postbird). Below are the steps to create the database using Postbird. If you need to install Postbird, check out the documentation on Codecademy = [https://www.codecademy.com/article/installing-and-using-postgresql-locally](https://www.codecademy.com/article/installing-and-using-postgresql-locally)

1. Once you are signed into Postbird, you should see a screen like below. Clicking the green circle with the `+` at the bottom right will open a prompt for creating a new database:

![Postbird homescreen with no Database Selected](./readme_imgs/Capture.JPG)

2. In the prompt, enter the table name (we used the name `notes` for this table) and select the type of Tablespace, we used public:

![New Table Prompt](./readme_imgs/Capture2.JPG)

3. This will add the database as named - make a note of the name you gave the table, it will be needed in a later step. Now, it is time to load the schema. You have a few options. 
   - You can copy paste the content from `sechma.sql` into the `Query` tab (make sure your database is showing in the `'Select Database'` drop down). 
   - You can import the `schema.sql` from the File menu (or use Ctrl + O), navigate to the file path `.(your file path).\notes_app\backend\db\` and select the `schema.sql` file. Make sure the Database shows correctly, then click the `Import File` button to import the schema.
4. With the schema set up, come back into your code editor and make a `.env` file in the root folder of the directory
5. Inside `.env`you are going to set up the route which will be used for the app to communicate with the database. First, declare `DATABASE_URL` set to equal the `protocol://username:password@host:port/databasename`. See the example below:
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/notes
```

From there, you should move on to testing.

## Testing

We are currently set up to run basic tests with jest. Take some time to familiarize yourself with the tests contained in `app.test.js` before running tests. Most of the tests we've employed are commented out so we can focus on one table at a time.

To run any of the tests, make sure the tests you intend to run are un-commented (Ctrl + / in VS code) before runing NPM TEST in your terminal. Review the results in the terminal.

-- Known Issue with tests: the way the connection to the database is set up does not allow Jest to close automatically. In order to close it  you will need to hit Ctrl + c on the key board type 'y' and hit enter and it will close.

## Deployment

This app is still under development and does not have a build yet for deployment.

## Built With

This app was built with JavaScipt and SQL. This list of libraries and tools is not yet comprehensive but includes:

- Node
- React.js
- Express.js
- dotenv
- pg
- debug
- jest
- supertest
- Postgresql
- PostBird

## Usage

Below are placeholders for future implementation

### Adding to the `notes` table

The `notes` table is the head of the database. It generates a unique UUID every time a new note is entered. When a user selects to 'add' a note an entry will be placed into this table with default vaules - an id and a time stamp. It will then wait for other updates to be submitted and the other columns, `title`, `tag`, and `note` will be filled in once data is put into any of the other tables.


### Order of Operations as a user is creating a new note.

First, user will click on 'Create Note', this will create an entry on the 'notes' table which fills out the id and timestamp.

```sql
INSERT INTO notes DEFAULT VALUES;
```

The user will then be directed to a page with a drop down menu to select which type of note they want to create - one option for each of the tables. For instance, an entry into the place table:

```SQL
INSERT INTO place (name, location, type, orgs, owned_by, note, note_id) VALUES (
	'The Salty Dog',
	'10 Emiser St, Demedan',
	'Tavern',
	'[hunter's lodge', 'thieves guild'],
	'Marlin MacDougal',
	'A note about the Salty Dog',
	< key captured when the DEFAULT VALUES were entered into notes in the previous step >
)
```

A user should see these notes in specific sections of the page, have the option to select, read, and edit notes that have previously been added. They should also be able to add notes about specific persons, places, things, etc.

## Database Triggers

These triggers are implemented into the [Schema](./backend/db/schema.sql).

### Sending Title, Tag, and Note to the notes table

Whenever a new note is entered on a table, its `name` is sent to the `notes` table as the value for the `title` column. The table's `id` is concated with the first two letters of the origin table's sequential id then sent to the `notes` table setting the `tag` column value (e.g. if the post id is 266 in the `events` table, the `tag` value in `notes` would be `ev266`.). The note entered is sent to the `notes` table setting the `note` column value. This id done where the `note_id` of the entry to the origin table matches the `id` from the `notes` table.

### Triggering entries on `people` table

When a note is entered into the `event` table, if the `persons_involved` column includes a name that is not included in the `people` table, a new entry is created in the `people` table for that person referencing the `note_id` being assigned to the new entry for the `event` table.

When a note is created in the `fam` table, if one of the people listed in `members` on that post is not anywhere in the `people` table, create a new note in the `people` table for that member of the family referencing the `note_id` being assigned to the new entry for the `fam` table.

When a note is created in the `org` table, if one of the people listed in `members` on that post is not anywhere in the `people` table, create a new note in the `people` table for that member of the family referencing the `notes_id` being assigned to the new entry for the `org` table.

### Triggering entries on `fam` table

When a note is created on the `person` table, if no values in `fam.name` match the `family` provided in the note entry, create a new entry in the `fam` table, referencing the `note_id` being assigned to the new entry for the `people` table. Also, this new entry being sent to the fam table should increment the fam_id up one to the next highest value.

### Triggering entries on `thing` table

When a note is created in the `event` table, if an item being placed in the `loot` column is not in the `thing` table, create a new note in the `thing` table for that item referencing the `note_id` being assigned to the new entry for the `event` table.

### People table reqs

The `name` column is required. `is_npc` should default to TRUE if no value is given. Family is not required and should not be entered until the `fam` table is created due to triggers. same goes for relations and orgs. 

## Contributing

## Versioning

## Authors

- Jason Newman - *Initial Work* - [The Obstinate Panda](http://www.opwebdev.com)

## License

## Acknowledgements



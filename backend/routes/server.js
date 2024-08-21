const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const dotenv = require("dotenv");

// set up the database connection

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    search_path: 'public'
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Database connected successfully!');
});

/**
 * Feature 1: Get a list of all notes for a given table
 */
router.get("/notes", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notes");
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/people", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM people");
        res.json(result.rows);
        //console.log(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * Feature 2: Get specific notes from a given table
 */

router.get("/notes", async (req, res) => {
    const { title } = req.params;
    try {
        const result = await pool.query("SELECT * FROM notes where title = $1", 
            [title]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Notes not found" })
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/people", async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query("SELECT * FROM people WHERE name = $1", 
            [name]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Person not found" })
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * Feature 3: Adding new notes to a given table
*/

router.post("/notes", async (req, res) => {
    try {
        const result = await pool.query(             
            "INSERT INTO notes DEFAULT VALUES  RETURNING *",
        );
        if (result.rows.length > 0){
            res.status(201).json({ note: result.rows[0] });
        } else {
            res.status(500).json({ error: "Failed to create note" });
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/people", async (req, res) => {
    const { name, is_npc, family, relations, orgs, note, note_id } = req.body;
    try {
        const result = await pool.query(             
            "INSERT INTO people (name, is_npc, family, relations, orgs, note, note_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, is_npc, family, relations, orgs, note, note_id]
        );
        if (result.rows.length > 0){
            res.status(201).json({ note: result.rows[0] });
        } else {
            res.status(500).json({ error: "Failed to create person note" });
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * Feature 4: Updating notes
 */

router.put("/notes", async (req, res) => {
    try {
        const { orgtitle, newtitle } = req.body; // change variables once determined
        const result = await pool.query(
            "UPDATE notes SET title = $1 WHERE title IS NULL OR title = $2", //add to values when variables have been determined
            [newtitle, orgtitle]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.json({ title: newtitle }); // add variables when variables have been determined
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.put("/people", async (req, res) => {
    try {
        const { name, tgtcol, newinfo } = req.body; // gather name, target column and new info
        console.log(req.body);
        const result = await pool.query(
            `UPDATE people SET ${tgtcol} = $1 WHERE name = $2 RETURNING *`, // update info in a chosen column of a row selected by its name value
            [newinfo, name]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.json({ updatedPerson: result.rows[0] }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * Feature 5: Deleting notes
 */

router.delete("/notes", async (req, res) => {
    try {
        const { title } = req.query;
        const result = await pool.query("DELETE FROM notes WHERE title = $1", [title]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Notes not found" });
        };
        res.status(204).json({ message: "Note removed successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/people", async (req, res) => {
    try {
        const { name } = req.query;
        const result = await pool.query("DELETE FROM people WHERE name = $1",
            [name]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Name not found" });
        }
        res.status(204).json({ message: "Person removed successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the router and pool
module.exports = router;

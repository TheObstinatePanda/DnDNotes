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
 * Feature 1: Get a list of all notes
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

/**
 * Feature 2: Get specific notes
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

/**
 * Feature 3: Adding new notes
*/

router.post("/notes", async (req, res) => {    
    // const { title } = req.body; 
    try {
        const result = await pool.query(             
            "INSERT INTO notes  DEFAULT VALUES  RETURNING *",
        //    [title]  
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
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the router and pool
module.exports = router;

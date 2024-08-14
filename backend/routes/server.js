const express = require("express");
const { v4: uuidv4 } = require("uuid")
const router = express.Router();
const { Pool } = require("pg");
const dotenv = require("dotenv");

// set up the database connection

dotenv.config();

const pool = new Pool({
    connectString: process.env.DATABASE_URL
})

/**
 * Feature 1: Get a list of all notes
 */
router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM notes where id = $1", [id]);
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

router.post("/", async (req, res) => {    
    const {noteTitle} = req.body; // change variables once determined
    const id = uuidv4();
    try {
        await pool.query(
             
            "INSERT INTO notes (id, noteTitle) VALUES($1, $2)", //add to values when variables have been determined
            [id, noteTitle]
        );
        res.status(201).json(id, noteTitle) // add variables when variables have been determined
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * Feature 4: Updating notes
 */

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { noteTitle } = req.body; // change variables once determined
    try {
        const result = await pool.query(
            "UPDATE notes SET noteTitle = $1 WHERE id = $2", //add to values when variables have been determined
            [noteTitle, id]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.json({ id, noteTitle }); // add variables when variables have been determined
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * Feature 5: Deleting notes
 */

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM notes WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Notes not found" });
        };
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the router
module.exports = router;
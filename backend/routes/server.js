const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const dotenv = require("dotenv");

// set up the database connection

dotenv.config();

const pool = new Pool({
    connectString: process.env.DATABASE_URL,
    search_path: 'public'
})

/**
 * Feature 1: Get a list of all notes
 */
router.get("/", async (req, res) => {
    const { id }  = req.params;
    if (Number.isNaN(id / 0)){
        return res.status(400).json({ error: "Invalid ID format" });
    }
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

router.post("/notes", async (req, res) => {      
    try {
        const result = await pool.query(             
            "INSERT INTO notes DEFAULT VALUES"  
        );
        if (result.rows.length > 0){
            console.log(result.rows)
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

router.put("/:id", async (req, res) => {
    
    try {
        console.log(req.params);
        const { id } = req.params;
        console.log('id = ' + id)
        const { notetitle } = req.body; // change variables once determined
        const result = await pool.query(
            "UPDATE notes SET notetitle = $1 WHERE id = $2", //add to values when variables have been determined
            [notetitle, id]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.json({ id, notetitle }); // add variables when variables have been determined
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * Feature 5: Deleting notes
 */

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
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
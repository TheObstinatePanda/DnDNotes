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
 * Feature 1: Get all notes from a given table
 */

/**
 * @swagger
 * /notes:
 *   get:
 *       summary: Retrieve a list of all notes
 *       responses:
 *          200:
 *            description: A JSON array note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: string
 *                              format: uuid
 *                              example: "dd406570-a196-4739-b602-4d6ef2b09694"
 *                          title:
 *                              type: string
 *                              example: "The Battle of Baldwyn Gorge."
 *                          tag:
 *                              type: string
 *                              example: ev6
 *                          note:
 *                              type: text
 *                              example: "A clash in Baldwin Gorge..."
 *                          created_at:
 *                              type: string
 *                              format: date-time
 *                              example: "2024-09-04T12:24:00Z"
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
 * @swagger
 * /people:
 *   get:
 *       summary: Retrieve a list of all notes specific to people
 *       responses:
 *          200:
 *            description: A JSON array people-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "Steve"
 *                          is_npc:
 *                              type: boolean
 *                              example: true
 *                          family:
 *                              type: text
 *                              example: "Portelli"
 *                          relations:
 *                              type: array
 *                              example: ["Brick Caradino", "Daliah Dennaram"]
 *                          orgs:
 *                              type: array
 *                              example: ["The Thieves guild", "The Merchant's guild"]
 *                          note:
 *                              type: text
 *                              example: "Steve is his name."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */
router.get("/people", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM people");
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * @swagger
 * /place:
 *   get:
 *       summary: Retrieve a list of all notes specific to places
 *       responses:
 *          200:
 *            description: A JSON array place-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "House Atlus"
 *                          location:
 *                              type: string
 *                              example: "Oarus Ghein"
 *                          type:
 *                              type: string
 *                              example: "Great House"
 *                          orgs:
 *                              type: array
 *                              example: ["The Thieves guild", "The Merchant's guild"]
 *                          owned_by:
 *                              type: string
 *                              example: "The Atlus family"
 *                          note:
 *                              type: text
 *                              example: "The Atlus family is the leading house in the oligarchy of Oarus Ghein..."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/place", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM place");
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * @swagger
 * /thing:
 *   get:
 *       summary: Retrieve a list of all notes specific to things
 *       responses:
 *          200:
 *            description: A JSON array thing-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "Great Axe of Smashing"
 *                          type:
 *                              type: string
 *                              example: "Great Axe"
 *                          is_magic:
 *                              type: boolean
 *                              example: true
 *                          owned_by:
 *                              type: string
 *                              example: "Deandrey Nhevsky"
 *                          description:
 *                              type: text
 *                              example: "A single bladed axe with with the blade edge portruding from the mouth of a ..."
 *                          note:
 *                              type: text
 *                              example: "Won in a duel against the Martyred fellow's leader."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/thing", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM thing");
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * @swagger
 * /fam:
 *   get:
 *       summary: Retrieve a list of all notes specific to families
 *       responses:
 *          200:
 *            description: A JSON array famly-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "Atlus"
 *                          fam_id:
 *                              type: integer
 *                              description: An incrementing id that only goes up when a new family name is entered
 *                              example: "01"
 *                          status:
 *                              type: string
 *                              example: "Ruling Family"
 *                          family_members:
 *                              type: array
 *                              example: ["Genna Atlus", "Nikolai Atlus", "Mikhael Atlus"]
 *                          orgs:
 *                              type: array
 *                              example: ["City Council", "The Ahnk", "The Military Academy"]
 *                          relations:
 *                              type: array
 *                              example: ["Dalton", "Tenia", "..."]
 *                          lives_in:
 *                              type: array
 *                              example: ["Oarus Ghein"]
 *                          note:
 *                              type: text
 *                              example: "The Atlus family was one of the three founding houses of Oarus Ghein."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/fam", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM fam");
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * @swagger
 * /org:
 *   get:
 *       summary: Retrieve a list of all notes specific to organizations
 *       responses:
 *          200:
 *            description: A JSON array org-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "The Ahnk"
 *                          org_id:
 *                              type: integer
 *                              description: An incrementing id that only goes up when a new org name is entered
 *                              example: "01"
 *                          type:
 *                              type: string
 *                              example: "Mage's Academy"
 *                          members:
 *                              type: array
 *                              example: ["Thomas Tunbrey","Chezex Diroley", "..."]
 *                          relations:
 *                              type: array
 *                              example: ["Military Academy", "Alchemy Guild", "..."]
 *                          found_in:
 *                              type: array
 *                              example: ["Oarus Ghein", "Oarus Khadi", "..."]
 *                          note:
 *                              type: text
 *                              example: "The Ahnk is a place of 'higher' education."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/org", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM org");
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * @swagger
 * /event:
 *   get:
 *       summary: Retrieve a list of all notes specific to events
 *       responses:
 *          200:
 *            description: A JSON array event-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "Brawl at the Brewmaster's Ball"
 *                          persons_involved:
 *                              type: array
 *                              example: ["Deandrey Atlus", "Dalton", "Piotre Pointe"]
 *                          location:
 *                              type: string
 *                              example: "House Atlus, Hall H"
 *                          is_combat:
 *                              type: boolean
 *                              example: false
 *                          loot:
 *                              type: array
 *                              example: [null]
 *                          note:
 *                              type: text
 *                              example: "A minor scuffle at the Brewmaster's Ball"
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/event", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM event");
        res.json(result.rows);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

/**
 * Feature 2: Get specific notes from a given table
 */

/**
 * @swagger
 * /notes/title:
 *   get:
 *     summary: Retrieve a list of all notes by title
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title being searched for in notes
 *     responses:
 *       200:
 *         description: A JSON array of note objects filtered by title
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: 
 *                     type: string
 *                     format: uuid
 *                     example: "dd406570-a196-4739-b602-4d6ef2b09694"
 *                   title:
 *                     type: string
 *                     example: "The Battle of Baldwyn Gorge."
 *                   tag:
 *                     type: string
 *                     example: "ev6"
 *                   note:
 *                     type: string
 *                     example: "A clash in Baldwin Gorge..."
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-04T12:24:00Z"
 */

router.get("/notes/title", async (req, res) => {
    const { title } = req.query;
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
 * @swagger
 * /people/name:
 *   get:
 *       summary: Retrieve a list of all notes specific to people specifically from the people table
 *       parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name being searched for in people
 *       responses:
 *          200:
 *            description: A JSON array people-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "Steve"
 *                          is_npc:
 *                              type: boolean
 *                              example: true
 *                          family:
 *                              type: text
 *                              example: "Portelli"
 *                          relations:
 *                              type: array
 *                              example: ["Brick Caradino", "Daliah Dennaram"]
 *                          orgs:
 *                              type: array
 *                              example: ["The Thieves guild", "The Merchant's guild"]
 *                          note:
 *                              type: text
 *                              example: "Steve is his name."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/people/name", async (req, res) => {
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
 * @swagger
 * /place/name:
 *   get:
 *       summary: Retrieve a list of all notes specific to places specifically from the place table
 *       parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name being searched for in place
 *       responses:
 *          200:
 *            description: A JSON array place-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "House Atlus"
 *                          location:
 *                              type: string
 *                              example: "Oarus Ghein"
 *                          type:
 *                              type: string
 *                              example: "Great House"
 *                          orgs:
 *                              type: array
 *                              example: ["The Thieves guild", "The Merchant's guild"]
 *                          owned_by:
 *                              type: string
 *                              example: "The Atlus family"
 *                          note:
 *                              type: text
 *                              example: "The Atlus family is the leading house in the oligarchy of Oarus Ghein..."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/place/name", async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query("SELECT * FROM place WHERE name = $1", 
            [name]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Place not found" })
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /thing/name:
 *   get:
 *       summary: Retrieve a list of all notes specific to things specifically from the thing table
 *       parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name being searched for in thing
 *       responses:
 *          200:
 *            description: A JSON array thing-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "Great Axe of Smashing"
 *                          type:
 *                              type: string
 *                              example: "Great Axe"
 *                          is_magic:
 *                              type: boolean
 *                              example: true
 *                          owned_by:
 *                              type: string
 *                              example: "Deandrey Nhevsky"
 *                          description:
 *                              type: text
 *                              example: "A single bladed axe with with the blade edge portruding from the mouth of a ..."
 *                          note:
 *                              type: text
 *                              example: "Won in a duel against the Martyred fellow's leader."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/thing/name", async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query("SELECT * FROM thing WHERE name = $1", 
            [name]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Thing not found" })
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /fam/name:
 *   get:
 *       summary: Retrieve a list of all notes specific to families specifically from the fam table
 *       parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name being searched for in fam
 *       responses:
 *          200:
 *            description: A JSON array famly-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "Atlus"
 *                          fam_id:
 *                              type: integer
 *                              description: An incrementing id that only goes up when a new family name is entered
 *                              example: "01"
 *                          status:
 *                              type: string
 *                              example: "Ruling Family"
 *                          family_members:
 *                              type: array
 *                              example: ["Genna Atlus", "Nikolai Atlus", "Mikhael Atlus"]
 *                          orgs:
 *                              type: array
 *                              example: ["City Council", "The Ahnk", "The Military Academy"]
 *                          relations:
 *                              type: array
 *                              example: ["Dalton", "Tenia", "..."]
 *                          lives_in:
 *                              type: array
 *                              example: ["Oarus Ghein"]
 *                          note:
 *                              type: text
 *                              example: "The Atlus family was one of the three founding houses of Oarus Ghein."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/fam/name", async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query("SELECT * FROM fam WHERE name = $1", 
            [name]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Family not found" })
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /org/name:
 *   get:
 *       summary: Retrieve a list of all notes specific to organizations specifically from the org table
 *       parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name being searched for in org
 *       responses:
 *          200:
 *            description: A JSON array org-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "The Ahnk"
 *                          org_id:
 *                              type: integer
 *                              description: An incrementing id that only goes up when a new org name is entered
 *                              example: "01"
 *                          type:
 *                              type: string
 *                              example: "Mage's Academy"
 *                          members:
 *                              type: array
 *                              example: ["Thomas Tunbrey","Chezex Diroley", "..."]
 *                          relations:
 *                              type: array
 *                              example: ["Military Academy", "Alchemy Guild", "..."]
 *                          found_in:
 *                              type: array
 *                              example: ["Oarus Ghein", "Oarus Khadi", "..."]
 *                          note:
 *                              type: text
 *                              example: "The Ahnk is a place of 'higher' education."
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/org/name", async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query("SELECT * FROM org WHERE name = $1", 
            [name]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Organization not found" })
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @swagger
 * /event:
 *   get:
 *       summary: Retrieve a list of all notes specific to events specifically from the event table
 *       parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name being searched for in org
 *       responses:
 *          200:
 *            description: A JSON array event-note objects
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *                              format: int64
 *                              example: 16
 *                          name:
 *                              type: string
 *                              example: "Brawl at the Brewmaster's Ball"
 *                          persons_involved:
 *                              type: array
 *                              example: ["Deandrey Atlus", "Dalton", "Piotre Pointe"]
 *                          location:
 *                              type: string
 *                              example: "House Atlus, Hall H"
 *                          is_combat:
 *                              type: boolean
 *                              example: false
 *                          loot:
 *                              type: array
 *                              example: [null]
 *                          note:
 *                              type: text
 *                              example: "A minor scuffle at the Brewmaster's Ball"
 *                          note_id:
 *                              type: string
 *                              format: uuid
 *                              description: Foreign key referencing the id column in the notes table
 *                              example: "e79ec2de-c31f-4880-9917-29b8899538fc"
 */

router.get("/event/name", async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query("SELECT * FROM event WHERE name = $1", 
            [name]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" })
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
    const { title, content } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );
        if (result.rows.length > 0){
            res.status(201).json({ note: result.rows[0] });
        } else {
            res.status(400).json({ error: "Failed to create note" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


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

router.post("/place", async (req, res) => {
    const { name, location, type, orgs, owned_by, note, note_id } = req.body;
    try {
        const result = await pool.query(             
            "INSERT INTO place (name, location, type, orgs, owned_by, note, note_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, location, type, orgs, owned_by, note, note_id]
        );
        if (result.rows.length > 0){
            res.status(201).json({ note: result.rows[0] });
        } else {
            res.status(500).json({ error: "Failed to create place note" });
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/thing", async (req, res) => {
    const { name, type, is_magic, owned_by, description, note, note_id } = req.body;
    try {
        const result = await pool.query(             
            "INSERT INTO thing (name, type, is_magic, owned_by, description, note, note_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, type, is_magic, owned_by, description, note, note_id]
        );
        if (result.rows.length > 0){
            res.status(201).json({ note: result.rows[0] });
        } else {
            res.status(500).json({ error: "Failed to create thing note" });
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/fam", async (req, res) => {
    const { name, status, family_members, orgs, relations, lives_in, note, note_id } = req.body;
    try {
        const result = await pool.query(             
            "INSERT INTO fam (name, status, family_members, orgs, relations, lives_in, note, note_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [name, status, family_members, orgs, relations, lives_in, note, note_id]
        );
        if (result.rows.length > 0){
            res.status(201).json({ note: result.rows[0] });
        } else {
            res.status(500).json({ error: "Failed to create family note" });
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/org", async (req, res) => {
    const { name, type, members, relations, found_in, note, note_id } = req.body;
    try {
        const result = await pool.query(             
            "INSERT INTO org (name, type, members, relations, found_in, note, note_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, type, members, relations, found_in, note, note_id]
        );
        if (result.rows.length > 0){
            res.status(201).json({ note: result.rows[0] });
        } else {
            res.status(500).json({ error: "Failed to create Organization note" });
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/event", async (req, res) => {
    const { name, persons_involved, location, is_combat, loot, note, note_id } = req.body;
    try {
        const result = await pool.query(             
            "INSERT INTO event (name, persons_involved, location, is_combat, loot, note, note_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, persons_involved, location, is_combat, loot, note, note_id]
        );
        if (result.rows.length > 0){
            res.status(201).json({ note: result.rows[0] });
        } else {
            res.status(500).json({ error: "Failed to create Event note" });
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

router.put("/place", async (req, res) => {
    try {
        const { name, tgtcol, newinfo } = req.body; // gather name, target column and new info
        console.log(req.body);
        const result = await pool.query(
            `UPDATE place SET ${tgtcol} = $1 WHERE name = $2 RETURNING *`, // update info in a chosen column of a row selected by its name value
            [newinfo, name]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Place not found" });
        }
        res.json({ updatedPlace: result.rows[0] }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.put("/thing", async (req, res) => {
    try {
        const { name, tgtcol, newinfo } = req.body; // gather name, target column and new info
        console.log(req.body);
        const result = await pool.query(
            `UPDATE thing SET ${tgtcol} = $1 WHERE name = $2 RETURNING *`, // update info in a chosen column of a row selected by its name value
            [newinfo, name]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Thing not found" });
        }
        res.json({ updatedItem: result.rows[0] }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.put("/fam", async (req, res) => {
    try {
        const { name, tgtcol, newinfo } = req.body; // gather name, target column and new info
        console.log(req.body);
        const result = await pool.query(
            `UPDATE fam SET ${tgtcol} = $1 WHERE name = $2 RETURNING *`, // update info in a chosen column of a row selected by its name value
            [newinfo, name]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Family not found" });
        }
        res.json({ updatedFam: result.rows[0] }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.put("/org", async (req, res) => {
    try {
        const { name, tgtcol, newinfo } = req.body; // gather name, target column and new info
        console.log(req.body);
        const result = await pool.query(
            `UPDATE org SET ${tgtcol} = $1 WHERE name = $2 RETURNING *`, // update info in a chosen column of a row selected by its name value
            [newinfo, name]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Organization not found" });
        }
        res.json({ updatedOrg: result.rows[0] }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});

router.put("/event", async (req, res) => {
    try {
        const { name, tgtcol, newinfo } = req.body; // gather name, target column and new info
        console.log(req.body);
        const result = await pool.query(
            `UPDATE event SET ${tgtcol} = $1 WHERE name = $2 RETURNING *`, // update info in a chosen column of a row selected by its name value
            [newinfo, name]//
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json({ updatedOrg: result.rows[0] }); 
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

router.delete("/place", async (req, res) => {
    try {
        const { name } = req.query;
        const result = await pool.query("DELETE FROM place WHERE name = $1",
            [name]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Place not found" });
        }
        res.status(204).json({ message: "Place removed successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/thing", async (req, res) => {
    try {
        const { name } = req.query;
        const result = await pool.query("DELETE FROM thing WHERE name = $1",
            [name]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Thing not found" });
        }
        res.status(204).json({ message: "Thing removed successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/fam", async (req, res) => {
    try {
        const { name } = req.query;
        const result = await pool.query("DELETE FROM fam WHERE name = $1",
            [name]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Family not found" });
        }
        res.status(204).json({ message: "Family removed successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/org", async (req, res) => {
    try {
        const { name } = req.query;
        const result = await pool.query("DELETE FROM org WHERE name = $1",
            [name]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Organization not found" });
        }
        res.status(204).json({ message: "Organization removed successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/event", async (req, res) => {
    try {
        const { name } = req.query;
        const result = await pool.query("DELETE FROM event WHERE name = $1",
            [name]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(204).json({ message: "Event removed successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Export the router and pool
module.exports = router;

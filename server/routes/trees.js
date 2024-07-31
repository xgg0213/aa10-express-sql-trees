// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

/**
 * BASIC PHASE 2, Step A - Instantiate SQLite and database
 *   - Database file: "DB_FILE" environment variable
 *   - Database permissions: read/write records in tables
 */
// Your code here 
// need to load the environment variables first
require('dotenv').config();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.DB_FILE, sqlite3.OPEN_READWRITE);


/**
 * BASIC PHASE 2, Step B - List of all trees in the database
 *
 * Protocol: GET
 * Path: /
 * Parameters: None
 * Response: JSON array of objects
 *   - Object properties: height-ft, tree, id
 *   - Ordered by the height_ft from tallest to shortest
 */
// Your code here 
router.get('/', (req, res) => {
    const sql = 'SELECT id, tree FROM trees ORDER BY height_ft DESC'
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            next(err)
        } else {
            res.json(rows)
        }
    })
})

/**
 * BASIC PHASE 3 - Retrieve one tree with the matching id
 *
 * Path: /:id
 * Protocol: GET
 * Parameter: id
 * Response: JSON Object
 *   - Properties: id, tree, location, height_ft, ground_circumference_ft
 */
// Your code here 
router.get('/:id', (req, res, next) => {
    const sql = 'SELECT * FROM trees WHERE id = ?';
    const params = req.params.id;
    
    db.get(sql, params, (err, row) => {
        if (err) {
            next(err)
        } else {
            res.json(row);
        }
    })
})

/**
 * INTERMEDIATE PHASE 4 - INSERT tree row into the database
 *
 * Path: /trees
 * Protocol: POST
 * Parameters: None
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here 
router.post('/', (req, res, next)=> {
    const sql = `INSERT INTO trees (tree, location, height_ft, ground_circumference_ft)
    VALUES (?, ?, ?, ?)`
    const params = [
        req.body.name,
        req.body.location,
        req.body.height,
        req.body.size
    ]

    db.run(sql, params, (err) => {
        if (err) {
            next(err)
        } else {
            res.json({
                message: "data inserted successfully"
            })
        }

    })
})

/**
 * INTERMEDIATE PHASE 5 - DELETE a tree row from the database
 *
 * Path: /trees/:id
 * Protocol: DELETE
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here 
router.delete('/:id', (req, res, next) => {
    const sql = `DELETE FROM trees WHERE id=?`;
    const params = req.params.id;

    db.run(sql, params, (err) => {
        if (err) {
            next(err)
        } else {
            res.json({
                message: "success"
            })
        }
    } )
})

/**
 * INTERMEDIATE PHASE 6 - UPDATE a tree row in the database
 *
 * Path: /trees/:id
 * Protocol: PUT
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here 
router.put('/:id', (req, res, next) => {
    const { id, name, location, height, size } = req.body;
    const paramsId = Number(req.params.id);

    const sql = `UPDATE trees
    SET tree = ?, location = ?, height_ft = ?, ground_circumference_ft = ? 
    WHERE id = ?
    `
    const params = [id, name, location, height, size]
 
    if (id !== paramsId) {
        return res.status(400).json({
            "error": "IDs do not match"
        })
    }

    db.run(sql, params, (err) => {
        if (err) {
            next(err)
        } else {
            res.json({
                "message": "success"
            })
        }
    })
})

// Export class - DO NOT MODIFY
module.exports = router;

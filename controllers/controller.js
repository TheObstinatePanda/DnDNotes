const pool = require('../models/db/db');

const get = async (table) => {
    try {
        // validate the table has a valid name
        if (!/^[a-zA-Z_]+$/.test(table)) {
            throw new Error('Invalid table Name')
        }
        const res = await pool.query(`Select * FROM ${table}`);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }    
};

const getByName = async (table, name) => {
    try {
        const res = await pool.query(`SELECT * FROM ${table} WHERE name = $1`, [name]);
        return res.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const post = async (table, data) => {
    try {
        console.log('table :', table);
        console.log('data :', data);
        const col = Object.keys(data).join(', ');
        const val = Object.values(data);
        const placeHolders = val.map((_, i) => `$${i + 1}`).join(', ');

        const query = `INSERT INTO ${table} (${col}) VALUES (${placeHolders}) RETURNING *`
        console.log('Executing query: ', query);
        console.log('With values: ', val);

        const res = await pool.query(query, val);
        return res.rows[0];  
    } catch (error) {
        console.error(error);
        throw error;
    }    
};

const put = async (table, name, data) => {
    try {
        const col = Object.keys(data).map((key, i) => `${key} = $${i+ 1}`).join(', ');
        const val = Object.values(data);

        const res = await pool.query(
            `UPDATE ${table} SET ${col} WHERE name = $${val.length + 1} RETURNING *`,
            [...val, name]
        );
        return res.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    };
    
};

const remove = async (table, name) => {
    try {
        await pool.query(`DELETE FROM ${table} WHERE name = $1`, [name]);
        return { message: 'Deleted Successfully' };
    } catch (error) {
        console.error(error);
        throw error;
    };    
};

module.exports = { get, getByName, post, put, remove };
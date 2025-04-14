const sqlite3 = require('sqlite3');
const express = require('express');
const app = express();


app.use(express.json()); // Middleware to parse JSON request bodies


// Create a new SQLite database connection
const db = new sqlite3.Database('./mydatabase.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});


// Create a table for storing passwords if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS passwords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        website TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    );
`, (err) => {
    if (err) {
        console.error('Error creating passwords table:', err.message);
    } else {
        console.log('Passwords table is ready.');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
`, (err) => {
    if (err) {
        console.error('Error creating users table:', err.message);
    } else {
        console.log('Users table is ready.');
    }
});

//define GET endpoint for retrieving all passwords

app.get('/passwords', (req, res) => {
    db.all('SELECT * FROM passwords', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
})




// Export the database connection for use in other modules
module.exports = db;
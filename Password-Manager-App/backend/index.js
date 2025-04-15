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

db.serialize(() => {
    // Create a new table for storing user data if it doesn't exist
    db.run(`PRAGMA integrity_check;` ,(err) => {
        if (err) {
            console.error('Error checking database integrity:', err.message);
        } else {
            console.log('Database integrity check passed.');
        }
    });
    
});

// Export the database connection for use in other modules
module.exports = db;
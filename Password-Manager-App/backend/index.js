const {db} = require('./database/connection.js');
const PassVault = require('./model/PassVault.js');
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

(async () => {
    try {
        await db.sync();
        console.log('Database & tables created!');

        // Seeding logic
        await PassVault.findOrCreate({
            where: { website: 'www.abc.com/login' },
            defaults: {
                username: 'ThanosTheGreat',
                password: '6v.Ly??jVtHS3',
                notes: 'Strong passwords rocks!',
            },
        });

        await PassVault.findOrCreate({
            where: { website: 'www.xyz.com/login' },
            defaults: {
                username: 'PeterParker@email.com',
                password: '4#ZyTuU4A$Ua',
                notes: 'Another one, thank you',
            },
        });

        await PassVault.findOrCreate({
            where: { website: 'https://accounts.google.com/Login' },
            defaults: {
                username: 'JohnCena',
                password: '!YoU_c2AnT_sEe_Me1',
                notes: 'google login',
            },
        });

        await PassVault.findOrCreate({
            where: { website: 'github.com/login' },
            defaults: {
                username: 'MichaelJackson',
                password: '.4BilliEJean#',
                notes: 'github login',
            },
        });

        await PassVault.findOrCreate({
            where: { website: 'www.netflix.com/login' },
            defaults: {
                username: 'BruceWayne',
                password: 'd4rk#Knight!',
                notes: 'netflix login',
            },
        });

        console.log('Entries added to PassVault.');
    } catch (error) {
        console.error('Error creating database or adding entries:', error);
    }
})();


// API endpoints
app.get('/passwords', async (req, res) => {
    try {
        const entries = await PassVault.findAll({attributes: ['password']});
        res.json(entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/usernames', async (req, res) => {
    try {
        const entries = await PassVault.findAll({ attributes: ['username'] });
        res.json(entries);
    } catch (error) {
        console.error('Error fetching usernames:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/notes', async (req, res) => {
    try {
        const entries = await PassVault.findAll({ attributes: ['notes'] });
        res.json(entries);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/password/search', async (req, res) => {
const { website } = req.query;
try {
    const entry = await PassVault.findOne({ where: { website } });
    if (entry){
        res.json(entry);
    } else {
        res.status(404).json({ error: 'Does not exist' });
    } 
} catch (error) {
        console.error('Error searching for password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/passwords/all', async (req,res) => {
    try {
        const entries = await PassVault.findAll({ attributes: ['website', 'username', 'password', 'notes'] });
        res.json(entries);
    } catch (error) {
        console.error('Error fetching all passwords:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    });

app.post("/passwords/new", async(req, res) => {
    const { website, username, password, notes } = req.body;
    try {
        const newEntry = await PassVault.create({ website, username, password, notes });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error creating new entry:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = 3000;;
app.listen(PORT, async () => {
    try {
        await db.sync();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error syncing database:', error);
    }
});

module.exports = {
    db,
    PassVault,
};
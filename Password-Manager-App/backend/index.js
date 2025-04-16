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

    } catch (error) {
        console.error('Error creating database & tables:', error);
    }


    await PassVault.create({
        website: 'www.abc.com/login',
        username: 'ThanosTheGreat',
        password: '6v.Ly??jVtHS3',
notes: 'Strong passwords rocks!',
    });
    await PassVault.create({
        website: 'www.xyz.com/login',
        username: 'PeterParker@email.com',
        password: '4#ZyTuU4A$Ua',
notes: 'Another one, thank you',
    });
    await PassVault.create({
        website:"https://accounts.googe.com/Login",
        username: 'JohnCena',
        password: '!YoU_c2AnT_sEe_Me1',
        notes: 'google login',
    });

    await PassVault.create({
        website: "github.com/login",
        username: 'MichaelJackson',
        password: ".4BilliEJean#",
        notes: 'github login',

    });
    await PassVault.create({
        website: 'www.netflix.com/login',
        username: 'BruceWayne',
        password: 'd4rk#Knight!',
        notes: 'netflix login',
    });

try {
    console.log('Entries added to PassVault.');
} catch (error) {
    console.error('Error adding entries to PassVault:', error);
}
})();


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

app.get('password/search', async (req, res) => {
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




const PORT = 3000;;
app.listen(PORT, async () => {
    try {
        await db.sync();
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error syncing database:', error);
    }
});

// Export the database connection for use in other modules
module.exports = {
    db,
    PassVault,
};
const {db} = require('./database/connection.js');
const PassVault = require('./model/PassVault.js');

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
// Export the database connection for use in other modules
module.exports = {
    db,
    PassVault,
};
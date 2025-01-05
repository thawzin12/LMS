// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // Your database host
    user: 'root',      // Your database username
    password: 'Thaw@#245', // Your database password
    database: 'userdatabase',  // Your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

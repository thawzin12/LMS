// database section
const mysql = require("mysql2");

// Replace 'your_username', 'your_password', 'your_database', and 'your_host' with your MySQL credentials
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "thawzinhtet@#",
  database: "test",
  connectionLimit: 200,
});

//Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
// Perform database operations here

//insert  into data
// connection.query('INSERT INTO distributor SET ?', data, (error, result) => {
//     if (error) {
//         console.error('Error inserting  user data', error);
//         return;
//     }
//     console.log('User data inserted succesfully', result);
//     connection.end();
// })

// Close the connection when done

// });

// connection.query('SELECT * FROM distributor', (error, results, fields) => {
//     if (error) {
//         console.error('Error executing query:', error);
//         return;
//     }
//     console.log('Query results:', results);
//     console.log('Query results:', fields);

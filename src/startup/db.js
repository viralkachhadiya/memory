import mysql from 'mysql2';
import config from 'config';
const db = config.get("db");

const connection = mysql.createConnection({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
})

// connection.((err) => {
//     if (err) {
//         process.exit(1);
//     } else {
//         console.log("Database Connected Successfully...");
//     }
// });

export default connection;
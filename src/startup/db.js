import mysql from 'mysql2';
import config from 'config';
const db = config.get("db");

const connection = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port
})

connection.connect((err) => {
    if (err) {
        process.exit(1);
    } else {
        console.log("Database Connected Successfully...");
    }
});

export default connection;
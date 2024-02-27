import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});


connection.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Database connected');
    connection.release();
});

export default connection;

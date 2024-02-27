import { connection } from "../config/common.js";

export default function createDatabase(databaseName: string): Promise<void> {
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
    return new Promise((resolve, reject) => {
        connection.query(createDatabaseQuery, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

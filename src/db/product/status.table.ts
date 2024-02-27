import { handelErrorResponse } from "../../controllers/response.controller.js";
import { connection } from "../../config/common.js";

export default function statusProductTable(databaseName: string): Promise<void> {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${databaseName}.status_list (
        id INT NOT NULL AUTO_INCREMENT,
        status_name VARCHAR(255) NOT NULL,
        created_at int NOT NULL DEFAULT 0,
        created_by int NOT NULL DEFAULT 0,
        deleted_at int NOT NULL DEFAULT 0,
        deleted_by int NOT NULL DEFAULT 0,
        updated_at int NOT NULL DEFAULT 0,
        PRIMARY KEY (id)
        ) ENGINE=INNODB;`
    return new Promise((resolve, reject) => {
        connection.query(createTableQuery, async (err, result) => {
            if (err) {
                await handelErrorResponse(err)
                await reject(err);
            }
            // Default statuses
            await insertStatus(["Active", "Inactive", "Deleted"], databaseName);
            await resolve(result);
        });
    })
}
async function insertStatus(statusNames: string[], databaseName: string): Promise<void> {
    const existingStatuses = await getStatuses(databaseName); // Assuming you have a function to fetch existing statuses

    // Filter out status names that already exist in the database
    const newStatuses = statusNames.filter(statusName => !existingStatuses.includes(statusName));

    // If all status names already exist, return without inserting
    if (newStatuses.length === 0) {
        return;
    }

    // Construct the SQL query for inserting new status names
    const values = newStatuses.map(statusName => `("${statusName}")`).join(', ');
    const insertQuery = `INSERT INTO ${databaseName}.status_list (status_name) VALUES ${values}`;

    return new Promise((resolve, reject) => {
        connection.query(insertQuery, async (err, result) => {
            if (err) {
                await handelErrorResponse(err)
                await reject(err);
            }
            await resolve(result);
        });
    });
}

async function getStatuses(databaseName: string): Promise<string[]> {
    const query = `SELECT status_name FROM ${databaseName}.status_list`;
    return new Promise((resolve, reject) => {
        connection.query(query, async (err, rows) => {
            if (err) {
                await handelErrorResponse(err)
                await reject(err);
            }
            // Extract status names from rows
            const statuses = rows.map(row => row.status_name);
            await resolve(statuses);
        });
    });
}
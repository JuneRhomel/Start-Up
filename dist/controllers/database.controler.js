import { connection } from "../config/common.js";
export function createDatabase(databaseName) {
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
    return new Promise((resolve, reject) => {
        connection.query(createDatabaseQuery, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
export function userTable(databaseName) {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${databaseName}.user (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        contact_number VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        status INT(12) NOT NULL DEFAULT 0,
        created_at int NOT NULL DEFAULT 0,
        created_by int NOT NULL DEFAULT 0,
        deleted_at int NOT NULL DEFAULT 0,
        deleted_by int NOT NULL DEFAULT 0,
        updated_at int NOT NULL DEFAULT 0,
        PRIMARY KEY (id)
        ) ENGINE=INNODB;`;
    return new Promise((resolve, reject) => {
        connection.query(createTableQuery, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
export function productTable(databaseName) {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${databaseName}.product (
        id INT NOT NULL AUTO_INCREMENT,
        product_code VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        prize DECIMAL(10,2) NOT NULL,
        status INT(12) NOT NULL DEFAULT 0,
        created_at int NOT NULL DEFAULT 0,
        created_by int NOT NULL DEFAULT 0,
        deleted_at int NOT NULL DEFAULT 0,
        deleted_by int NOT NULL DEFAULT 0,
        updated_at int NOT NULL DEFAULT 0,
        PRIMARY KEY (id)
        ) ENGINE=INNODB;`;
    return new Promise((resolve, reject) => {
        connection.query(createTableQuery, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
//# sourceMappingURL=database.controler.js.map
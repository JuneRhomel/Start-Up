import { connection } from "../config/common.js";
export default function productTable(databaseName) {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${databaseName}.product (
        id INT NOT NULL AUTO_INCREMENT,
        product_code VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        status_id INT(12) NOT NULL DEFAULT 0,
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
//# sourceMappingURL=product.table.js.map
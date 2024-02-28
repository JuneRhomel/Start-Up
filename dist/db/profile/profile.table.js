import { handelErrorResponse } from "../../controllers/response.controller.js";
import { connection } from "../../config/common.js";
export default function profileTable(databaseName) {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${databaseName}.profile_pic (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        url_image LONGTEXT,
        file_name LONGTEXT NOT NULL,
        original_name LONGTEXT NOT NULL,
        path LONGTEXT NOT NULL,
        size LONGTEXT NOT NULL,
        created_at int NOT NULL DEFAULT 0,
        created_by int NOT NULL DEFAULT 0,
        deleted_at int NOT NULL DEFAULT 0,
        deleted_by int NOT NULL DEFAULT 0,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES account.accounts(id)
        ) ENGINE=INNODB;`;
    return new Promise((resolve, reject) => {
        connection.query(createTableQuery, (err, result) => {
            if (err) {
                handelErrorResponse(err);
                reject(err);
            }
            resolve(result);
        });
    });
}
//# sourceMappingURL=profile.table.js.map
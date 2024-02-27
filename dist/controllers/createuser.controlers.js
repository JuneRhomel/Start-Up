import { connection } from "../config/common.js";
export function insertIntoAccounts(accountData) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO account.accounts SET ?`, accountData, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
export function insertDbAccount(accountId, accountCode) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO account.db_accounts SET ?`, { account_id: accountId, account_code: accountCode }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
export function insertUser(userData, DB) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${DB}.user SET ?`, userData, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
export function handleQueryError(res, message, error) {
    const response = { message: message };
    console.error(error);
    res.status(400).send(response);
}
//# sourceMappingURL=createuser.controlers.js.map
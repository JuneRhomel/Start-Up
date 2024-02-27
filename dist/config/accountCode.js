import mysql from 'mysql';
class AccountCode {
    constructor() { }
    static getInstance() {
        if (!AccountCode.instance) {
            AccountCode.instance = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_DATABASE_ACCOUNT_CODE,
                port: process.env.DB_PORT,
            });
        }
        return AccountCode.instance;
    }
}
const accountCode = AccountCode.getInstance();
export default accountCode;
//# sourceMappingURL=accountcode.js.map
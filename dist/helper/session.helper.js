import { express, connection } from "../config/common.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let users = [];
const query = `SELECT 
                account.accounts.id,
                account.accounts.email,
                account.accounts.password,
                account.accounts.account_code,
                CONCAT('store_', account.db_accounts.id) AS db_code
                FROM 
                account.accounts
                LEFT JOIN 
                account.db_accounts 
                ON 
                account.accounts.account_code = account.db_accounts.account_code
                WHERE 
                account.accounts.deleted_at = 0;
                `;
connection.query(query, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    users = result;
});
export const sessions = {};
/**
 * Retrieves a session using the provided session ID.
 *
 * @param {string} sessionId - The ID of the session to retrieve
 * @return {Object | null} The retrieved session if it's valid, otherwise null
 */
export function getSession(sessionId) {
    const session = sessions[sessionId];
    return session && session.valid ? session : null;
}
/**
 * Invalidates a session by setting its validity to false.
 *
 * @param {string} sessionId - The ID of the session to invalidate.
 * @return {any} The invalidated session.
 */
export function invalidateSession(sessionId) {
    const session = sessions[sessionId];
    if (session) {
        sessions[sessionId].valid = false;
    }
    return sessions[sessionId];
}
/**
 * Creates a session with the given email, name, dbCode, and id.
 *
 * @param {string} email - The email of the user
 * @param {string} name - The name of the user
 * @param {string} dbCode - The database code
 * @param {Number} id - The id of the session
 * @return {Object} The created session
 */
export function createSession(email, name, dbCode, id) {
    const sessionId = String(Object.keys(sessions).length + 1);
    const session = { id, sessionId, email, dbCode, valid: true, name };
    sessions[sessionId] = session;
    return session;
}
/**
 * Retrieves a user by their email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @return {User | undefined} The user object if found, otherwise undefined.
 */
export function getUser(email) {
    return users.find((user) => user.email === email);
}
//# sourceMappingURL=session.helper.js.map
import { AccountTabedata } from "../model/User.model.js";
import { connection } from "../config/common.js";
import { Response } from 'express';
import { handelErrorResponse } from "./response.controller.js";


/**
 * Insert account data into the accounts table.
 *
 * @param {AccountTabedata} accountData - the account data to be inserted
 * @return {Promise<any>} a Promise that resolves with the result of the insertion
 */
export function insertIntoAccounts(accountData: AccountTabedata): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO account.accounts SET ?`, accountData, async (err, result) => {
            if (err) {
                await handelErrorResponse(err)
                await reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


/**
 * Inserts a new account into the database.
 *
 * @param {number} accountId - the ID of the account
 * @param {string} accountCode - the code of the account
 * @return {Promise<any>} a promise resolving to the result of the database insertion
 */
export function insertDbAccount(accountId: number, accountCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO account.db_accounts SET ?`, { account_id: accountId, account_code: accountCode }, async (err, result) => {
            if (err) {
                await handelErrorResponse(err)
                await reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Inserts user data into the specified database.
 *
 * @param {any} userData - the user data to be inserted
 * @param {any} DB - the database to insert the user data into
 * @return {Promise<any>} a Promise that resolves with the result of the insertion
 */
export function insertUser(userData: any, DB): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${DB}.user SET ?`, userData, async (err, result) => {
            if (err) {
                await handelErrorResponse(err)
                await reject(err);
            }
            resolve(result);
        })
    })
}


/**
 * Handles a query error by sending an error message in the response.
 *
 * @param {Response} res - The response object to send the error message.
 * @param {string} message - The error message to send.
 * @param {any} error - The error object that caused the query error.
 * @return {void} This function does not return anything.
 */
export function handleQueryError(res: Response, message: string, error: any): void {
    const response = { message: message };
    console.error(error);
    res.status(400).send(response);
}
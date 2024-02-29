import { connection, } from "../../config/common.js";
import { handelErrorResponse } from "../response.controller.js";
import { formatData } from "../../helper/function.helper.js";
/**
 * Retrieves Profile data from the database and formats it.
 *
 * @param {string} dbCode - The database code
 * @param {number} tokenId - The identification number
 * @param {Response} res - The response object
 * @return {Promise<Response>} The formatted product data
 */
export function getProfileHandler(tokenId, dbCode, res) {
    return new Promise(async (resolve, reject) => {
        const sql = `
        SELECT  id,url_image
        FROM ${dbCode}.profile_pic
        WHERE deleted_at = 0 AND user_id = ${tokenId};
        `;
        await connection.query(sql, async (err, result) => {
            if (err) {
                handelErrorResponse(res, err);
                reject(err);
            }
            const formatedData = await formatData(result);
            await resolve(formatedData);
        });
    });
}
/**
 * A function that handles the retrieval of the user's profile information.
 *
 * @param {number} tokenId - The identification number
 * @param {string} dbCode - The database code
 * @param {Response} res - The response object
 * @return {Promise<Response>} A promise that resolves with the formatted profile data
 */
export function getMyProfileHandler(tokenId, dbCode, res) {
    return new Promise(async (resolve, reject) => {
        const sql = `
        SELECT  id,url_image
        FROM ${dbCode}.profile_pic
        WHERE deleted_at = 0 AND user_id = ${tokenId} AND used = 1;
        `;
        await connection.query(sql, async (err, result) => {
            if (err) {
                handelErrorResponse(res, err);
                reject(err);
            }
            const formatedData = await formatData(result);
            await resolve(formatedData);
        });
    });
}
//# sourceMappingURL=getprofile.controller.js.map
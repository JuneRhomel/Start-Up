import { connection, } from "../../config/common.js";
import { handelErrorResponse } from "../response.controller.js";
import { formatData } from "../../helper/function.helper.js";
/**
 * Retrieves Profile data from the database and formats it.
 *
 * @param {string} dbCode - the database code
 * @param {number} tokenId - the identification number
 * @param {Response} res - the response object
 * @return {Promise<Response>} the formatted product data
 */
export function getProfileHandler(tokenId, dbCode, res) {
    return new Promise(async (resolve, reject) => {
        const sql = `
        SELECT  *
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
//# sourceMappingURL=getprofile.controller.js.map
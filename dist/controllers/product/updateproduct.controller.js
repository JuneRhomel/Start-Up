import { connection, } from "../../config/common.js";
import { handelErrorResponse, handelSuccessResponse } from "../response.controller.js";
/**
 * Update a product handler function.
 *
 * @param {Product} data - the product data to be updated
 * @param {any} id - the id of the product to be updated
 * @param {string} dbCode - the database code
 * @param {Response} res - the response object
 * @param {number} tokenId - the token id for User ID
 * @return {Promise<Response>} a Promise that resolves to the updated response
 */
export function updateProductHandler(data, id, dbCode, res, tokenId) {
    return new Promise(async (resolve, reject) => {
        data.updated_at = new Date().getTime();
        data.created_by = tokenId;
        const updateFields = Object.entries(data).filter(([key, value]) => value !== undefined);
        const sql = `
            UPDATE ${dbCode}.product
            SET ${updateFields.map(([key]) => `${key} = ?`).join(', ')}
            WHERE id = ?`;
        const params = [...updateFields.map(([, value]) => value), id];
        await connection.query(sql, params, async (err, result) => {
            if (err) {
                await handelErrorResponse(res, err);
                await reject(err);
            }
        });
        await handelSuccessResponse(res, "Product updated successfully");
        await resolve(res);
    });
}
//# sourceMappingURL=updateproduct.controller.js.map
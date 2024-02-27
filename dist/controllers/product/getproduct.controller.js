import { connection, } from "../../config/common.js";
import { handelErrorResponse } from "../response.controller.js";
import { formatData } from "../../helper/function.helper.js";
/**
 * Retrieves product data from the database and formats it.
 *
 * @param {string} dbCode - the database code
 * @param {Response} res - the response object
 * @return {Promise<Response>} the formatted product data
 */
export function getProductHandler(dbCode, res) {
    return new Promise(async (resolve, reject) => {
        const sql = `
        SELECT product.id, product.product_name, product.price, status_list.status_name as status 
        FROM ${dbCode}.product
        LEFT JOIN ${dbCode}.status_list ON product.status_id = status_list.id
        WHERE product.deleted_at = 0;
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
 * Get product information by ID from the database.
 *
 * @param {string} dbCode - the database code
 * @param {number} id - the product ID
 * @param {Response} res - the response object
 * @return {Promise<Response>} a promise that resolves with the product information
 */
export function getProductHandlerById(dbCode, id, res) {
    return new Promise(async (resolve, reject) => {
        const sql = `
        SELECT product.id, product.product_name, product.price, status_list.status_name as status 
        FROM ${dbCode}.product
        LEFT JOIN ${dbCode}.status_list ON product.status_id = status_list.id AND product.deleted_at = 0
        WHERE product.id = ${id}
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
//# sourceMappingURL=getproduct.controller.js.map
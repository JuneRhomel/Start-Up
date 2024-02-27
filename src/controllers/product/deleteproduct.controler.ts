
import { connection, } from "../../config/common.js";
import { Response } from 'express';
import { handelErrorResponse, handelSuccessResponse } from "../response.controller.js";
import { decrypt, formatData } from "../../helper/function.helper.js";


/**
 * A function to handle the deletion of a product.
 *
 * @param {any} productID - the ID of the product to be deleted
 * @param {any} tokenID - identification number
 * @param {string} dbCode - the database code
 * @param {Response} res - the response object
 * @return {Response} the updated response object
 */
export function deleteProductHandler(productID, tokenID, dbCode: string, res: Response): Response {
    return new Promise(async (resolve, reject) => {
        const sql = `
        UPDATE ${dbCode}.product
        SET deleted_at = ${new Date().getTime()}, deleted_by = ${tokenID}
        WHERE id = ${decrypt(productID)}
        `
        await connection.query(sql, async (err, result) => {
            if (err) {
                await handelErrorResponse(res, err)
                await reject(err)
            }
        })
        await handelSuccessResponse(res, "Product deleted successfully")
        await resolve(true)
    })
}
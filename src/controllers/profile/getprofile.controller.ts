
import { connection, } from "../../config/common.js";
import { Response } from 'express';
import { handelErrorResponse } from "../response.controller.js";
import { formatData } from "../../helper/function.helper.js";
import { Product } from "../../model/product.model.js";

/**
 * Retrieves Profile data from the database and formats it.
 *
 * @param {string} dbCode - the database code
 * @param {number} tokenId - the identification number
 * @param {Response} res - the response object
 * @return {Promise<Response>} the formatted product data
 */
export function getProfileHandler(tokenId: number, dbCode: string, res: Response): Response {
    return new Promise(async (resolve, reject) => {
        const sql = `
        SELECT  id,url_image
        FROM ${dbCode}.profile_pic
        WHERE deleted_at = 0 AND user_id = ${tokenId};
        `;
        await connection.query(sql, async (err, result) => {
            if (err) {
                handelErrorResponse(res, err)
                reject(err)
            }
            const formatedData: Product[] = await formatData(result)
            await resolve(formatedData)
        })

    })
}
import { AccountTabedata } from "../../model/User.model.js";
import { checkRequiredFields, connection, hashData, } from "../../config/common.js";
import { Request, Response } from 'express';
import { handelErrorResponse, handelSuccessResponse, handleMissingFieldResponse } from "../response.controller.js";
import { ProductUploadModel } from "../../model/product.model.js";

/**
 * Create product handler function.
 *
 * @param {ProductUploadModel} details - details of the product
 * @param {number} tokenId - identification number
 * @param {string} dbCode - code for the database
 * @param {Response} res - response object
 * @return {Promise<Response>} response object wrapped in a promise
 */
export function createProductHandler(details: ProductUploadModel, tokenId: number, dbCode: string, res: Response): Response {
    return new Promise(async (resolve, reject) => {
        const data = details
        const required = ["product_name", 'prize', 'status']
        const requiredFields = await checkRequiredFields(data, required, res)
        if (requiredFields.length > 0) {
            await handleMissingFieldResponse(res, requiredFields)
            reject(requiredFields)
        }
        data.created_by = tokenId
        data.created_at = new Date().getTime();
        connection.query(`INSERT INTO ${dbCode}.product SET ?`, data, async (err, result) => {
            if (err) {
                handelErrorResponse(res, err)
                reject(err)
            }
            await handelSuccessResponse(res, "Product created successfully")
        })
        await resolve(res)
    })
}
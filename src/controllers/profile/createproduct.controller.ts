import { checkRequiredFields, connection } from "../../config/common.js";
import { Response } from 'express';
import { handelErrorResponse, handelSuccessResponse, handleMissingFieldResponse } from "../response.controller.js";
import { ProfileUploadModel } from "../../model/profile.model.js";

/**
 * Upload Profile handler function.
 *
 * @param {ProfileUploadModel} details - details of the product
 * @param {number} tokenId - identification number
 * @param {string} dbCode - code for the database
 * @param {Response} res - response object
 * @return {Promise<Response>} response object wrapped in a promise
 */
export function createProfileHandler(details: ProfileUploadModel, tokenId: number, dbCode: string, res: Response): Response {
    return new Promise(async (resolve, reject) => {
        const data = details
        const required = ["user_id", "path", "original_name", "size", "url_image", 'file_name']
        const requiredFields = await checkRequiredFields(data, required, res)
        if (requiredFields.length > 0) {
            await handleMissingFieldResponse(res, requiredFields)
            reject(requiredFields)
        }
        data.created_by = tokenId
        data.created_at = new Date().getTime();
        connection.query(`INSERT INTO ${dbCode}.profile_pic SET ?`, data, async (err, result) => {
            if (err) {
                handelErrorResponse(res, err)
                reject(err)
            }
            await handelSuccessResponse(res, "Profile picture has been uploaded")
        })
        await resolve(res)
    })
}
import { checkRequiredFields, connection } from "../../config/common.js";
import { handelSuccessResponse, handleMissingFieldResponse } from "../response.controller.js";
/**
 * Upload Profile handler function.
 *
 * @param {ProfileUploadModel} details - details of the product
 * @param {number} tokenId - identification number
 * @param {string} dbCode - code for the database
 * @param {Response} res - response object
 * @return {Promise<Response>} response object wrapped in a promise
 */
export function createProfileHandler(details, tokenId, dbCode, res) {
    return new Promise(async (resolve, reject) => {
        const data = details;
        const required = ["user_id", "path", "original_name", "size", "url_image", 'file_name'];
        const requiredFields = await checkRequiredFields(data, required, res);
        if (requiredFields.length > 0) {
            await handleMissingFieldResponse(res, requiredFields);
            reject(requiredFields);
        }
        data.created_by = tokenId;
        data.created_at = new Date().getTime();
        connection.query(`INSERT INTO ${dbCode}.profile_pic SET ?`, data, async (err, result) => {
            if (err) {
                throw Error("Error creating profile picture");
                reject(err);
            }
            await handelSuccessResponse(res, "Profile picture has been uploaded");
        });
        await resolve(res);
    });
}
//# sourceMappingURL=createproduct.controller.js.map
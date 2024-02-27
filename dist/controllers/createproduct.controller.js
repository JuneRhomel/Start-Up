import { checkRequiredFields, connection } from "../config/common.js";
import { handelErrorResponse, handelSuccessResponse, handleMissingFieldResponse } from "./status.controller.js";
export function createProductHandler(details, tokenId, dbCode, res) {
    return new Promise(async (resolve, reject) => {
        const data = details;
        const required = ["product_name", 'prize', 'status'];
        const requiredFields = await checkRequiredFields(data, required, res);
        if (requiredFields.length > 0) {
            await handleMissingFieldResponse(res, requiredFields);
            reject(requiredFields);
        }
        data.created_by = tokenId;
        data.created_at = new Date().getTime();
        connection.query(`INSERT INTO ${dbCode}.product SET ?`, data, async (err, result) => {
            if (err) {
                handelErrorResponse(res, err);
                reject(err);
            }
            await handelSuccessResponse(res, "Product created successfully");
        });
        await resolve(res);
    });
}
//# sourceMappingURL=createproduct.controller.js.map
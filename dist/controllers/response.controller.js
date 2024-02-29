/**
 * Handles an error response by sending a message with the specified response status.
 *
 * @param {Response} res - the response object
 * @param {string} [message] - an optional error message
 * @return {void}
 */
export function handelErrorResponse(res, message) {
    const response = { message: message || "Something went wrong. Please try again" };
    res.status(400).send(response);
}
/**
 * Handles the response for missing fields by sending a 400 status code with a message indicating the missing fields.
 *
 * @param {Response} res - the response object
 * @param {string[]} message - an array of missing fields
 * @return {void}
 */
export function handleMissingFieldResponse(res, message) {
    const response = { message: "Missing required fields: " + message.join(", ") };
    throw new Error(response.message);
}
/**
 * Sends a success response with the given message.
 *
 * @param {Response} res - the response object
 * @param {string} message - the message to be included in the response
 * @return {void}
 */
export function handelSuccessResponse(res, message) {
    const response = { message: message };
    res.status(200).send(response);
}
/**
 * Handles unauthorized response by sending a 401 status along with a message object.
 *
 * @param {Response} res - the response object
 * @return {void}
 */
export function hadelUnauthorizedResponse(res) {
    const response = { message: "unauthorized" };
    res.status(401).send(response);
}
/**
 * Handle the forbidden response by setting the status to 403 and sending a response object with a message property set to "forbidden".
 *
 * @param {Response} res - the response object
 * @return {void}
 */
export function handelForbiddenResponse(res) {
    const response = { message: "forbidden" };
    res.status(403).send(response);
}
/**
 * A function that handles the response data.
 *
 * @param {Response} res - the response object
 * @param {any} data - the data to be handled
 * @return {void}
 */
export function handelDataResponse(res, data) {
    const response = data;
    res.status(200).send(response);
}
//# sourceMappingURL=response.controller.js.map
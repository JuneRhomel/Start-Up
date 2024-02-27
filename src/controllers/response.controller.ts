import { Request, Response } from 'express';

/**
 * Handles an error response by sending a message with the specified response status.
 *
 * @param {Response} res - the response object
 * @param {string} [message] - an optional error message
 * @return {void} 
 */
export function handelErrorResponse(res: Response, message?: string): void {
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
export function handleMissingFieldResponse(res: Response, message: string[]): void {
    const response = { message: "Missing required fields: " + message.join(", ") };
    res.status(400).send(response);
}

/**
 * Sends a success response with the given message.
 *
 * @param {Response} res - the response object
 * @param {string} message - the message to be included in the response
 * @return {void} 
 */
export function handelSuccessResponse(res: Response, message: string): void {
    const response = { message: message };
    res.status(200).send(response);
}

/**
 * Handles unauthorized response by sending a 401 status along with a message object.
 *
 * @param {Response} res - the response object
 * @return {void} 
 */
export function hadelUnauthorizedResponse(res: Response): void {
    const response = { message: "unauthorized" };
    res.status(401).send(response);
}

/**
 * Handle the forbidden response by setting the status to 403 and sending a response object with a message property set to "forbidden".
 *
 * @param {Response} res - the response object
 * @return {void} 
 */
export function handelForbiddenResponse(res: Response): void {
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
export function handelDataResponse(res: Response, data: any): void {
    const response = data;
    res.status(200).send(response);
}
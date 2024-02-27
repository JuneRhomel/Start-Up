import { getSession } from "../helper/session.helper.js";
import { NextFunction, Request, Response } from "express";
/**
 * Ensures that a user is required for the request. If user is not present, it sends a 403 status code with "Unauthorized" message.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function to be called
 * @return {void} - does not return a value
 */
export function requireUser(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (!req.user) {
        return res.status(403).send("Unauthorized");
    }
    const session = getSession(req.user.sessionId);

    return next(session);
}
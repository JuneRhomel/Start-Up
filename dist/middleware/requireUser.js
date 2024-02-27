import { getSession } from "../helper/session.helper.js";
/**
 * Ensures that a user is required for the request. If user is not present, it sends a 403 status code with "Unauthorized" message.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function to be called
 * @return {void} - does not return a value
 */
export function requireUser(req, res, next) {
    // @ts-ignore
    if (!req.user) {
        return res.status(403).send("Unauthorized");
    }
    const session = getSession(req.user.sessionId);
    return next(session);
}
//# sourceMappingURL=requireUser.js.map
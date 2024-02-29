import { signJWT } from "../utlits/jwt.utils.js"; // Assuming the correct path for jwt.utils.js
import { hashData } from "../config/common.js";
import { getUser, createSession, invalidateSession } from "../helper/session.helper.js";
/**
 * Create a session handler for user authentication and session management.
 *
 * @param {Request} req - the incoming request object
 * @param {Response} res - the response object to send back
 * @return {Response} the response with the created session and access tokens set in cookies
 */
export function createSessionHandler(req, res) {
    const email = req.body.email;
    const password = hashData(req.body.password);
    const user = getUser(email);
    if (!user || user.password !== password) {
        return res.status(401).send("Invalid email or password");
    }
    const session = createSession(email, user.name, user.db_code, user.id, user.account_code);
    // Create access token
    const accessToken = signJWT({ email: user.email, sessionId: session.sessionId }, "5s");
    const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");
    // Set access token in cookie
    res.cookie("accessToken", accessToken, {
        maxAge: 300000, // 5 minutes
        httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
    });
    // Send user back
    return res.send(session);
}
/**
 * Returns the user from the request in the response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Response} the response object with the user data sent
 */
export function getSessionHandler(req, res) {
    // @ts-ignore
    return res.send(req.user);
}
/**
 * Delete the session and invalidate the access and refresh tokens.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Response} the response object with the invalidated session
 */
export function deleteSessionHandler(req, res) {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
    });
    // @ts-ignore
    const session = invalidateSession(req.user.sessionId);
    return res.send(session);
}
//# sourceMappingURL=session.controller.js.map
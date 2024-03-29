import { getSession } from "../helper/session.helper.js";
import { signJWT, verifyJWT } from "../utlits/jwt.utils.js";
/**
 * Deserialize user from request and handle access tokens.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @return {void}
 */
function deserializeUser(req, res, next) {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken) {
        return next();
    }
    const { payload, expired } = verifyJWT(accessToken);
    // For a valid access token
    if (payload) {
        // @ts-ignore
        req.user = payload;
        return next();
    }
    // expired but valid access token
    const { payload: refresh } = expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
    if (!refresh) {
        return next();
    }
    // @ts-ignore
    const session = getSession(refresh.sessionId);
    if (!session) {
        return next();
    }
    const newAccessToken = signJWT(session, "5s");
    res.cookie("accessToken", newAccessToken, {
        maxAge: 300000, // 5 minutes
        httpOnly: true,
    });
    // @ts-ignore
    req.user = verifyJWT(newAccessToken).payload;
    return next();
}
export default deserializeUser;
//# sourceMappingURL=deserializeUser.js.map
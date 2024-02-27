import { Request, Response } from "express";
import { signJWT, verifyJWT } from "../utlits/jwt.utils.js"; // Assuming the correct path for jwt.utils.js
import { hashData } from "../config/common.js";
import { getUser, createSession, invalidateSession } from "../helper/session.helper.js";


/**
 * Create a session handler for user authentication and session management.
 *
 * @param {Request} req - the incoming request object
 * @param {Response} res - the response object to send back
 * @return {Response} the response with the created session and access tokens set in cookies
 */
export function createSessionHandler(req: Request, res: Response): Response {
  const email: string = req.body.email;
  const password: string = hashData(req.body.password);

  const user: any | null = getUser(email);

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid email or password");
  }

  const session: any = createSession(email, user.account_code, user.db_code, user.id);

  // Create access token
  const accessToken: string = signJWT(
    { email: user.email, sessionId: session.sessionId },
    "5s"
  );

  const refreshToken: string = signJWT({ sessionId: session.sessionId }, "1y");

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
export function getSessionHandler(req: Request, res: Response): Response {
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
export function deleteSessionHandler(req: Request, res: Response): Response {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  // @ts-ignore
  const session: Session | null = invalidateSession(req.user.sessionId);

  return res.send(session);
}

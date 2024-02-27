import fs from 'fs';
import jwt from 'jsonwebtoken';
// Read the private key from private.pem
const privateKey = fs.readFileSync('private.pem', 'utf8');
// Read the public key from public.pem
const publicKey = fs.readFileSync('public.pem', 'utf8');
/**
 * Signs a JSON Web Token with the provided payload and expiration.
 *
 * @param {object} payload - The payload to be included in the JWT
 * @param {string | number} expiresIn - The expiration time for the JWT
 * @return {string} The signed JSON Web Token
 */
export function signJWT(payload, expiresIn) {
    return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
}
/**
 * Verifies the JWT token and returns the decoded payload and expiration status.
 *
 * @param {string} token - The JWT token to be verified
 * @return {{ payload: any, expired: boolean }} Object containing the decoded payload and expiration status
 */
export function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
//# sourceMappingURL=jwt.utils.js.map
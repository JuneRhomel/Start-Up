export function handelErrorResponse(res, error) {
    const response = { message: "Something went wrong. Please try again" };
    console.error(error);
    res.status(400).send(response);
}
export function handleMissingFieldResponse(res, message) {
    const response = { message: message };
    res.status(400).send(response);
}
export function handelSuccessResponse(res, message) {
    const response = { message: message };
    res.status(200).send(response);
}
export function hadelUnauthorizedResponse(res) {
    const response = { message: "unauthorized" };
    res.status(401).send(response);
}
export function handelForbiddenResponse(res) {
    const response = { message: "forbidden" };
    res.status(403).send(response);
}
//# sourceMappingURL=status.controlers.js.map
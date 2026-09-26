import { sendError } from "../utils/response.js";

export function notFoundHandler(req, res) {
  return sendError(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && "body" in error) {
    return sendError(res, 400, "Request body contains invalid JSON.");
  }

  console.error(error);
  return sendError(res, 500, "An unexpected server error occurred.");
}
import { sendError } from "../utils/response.js";

// Demonstration only. A real app needs user accounts, secure key storage, and authorization rules.
export function requireDemoApiKey(req, res, next) {
  const expectedKey = process.env.DEMO_API_KEY;
  if (!expectedKey) {
    return sendError(res, 503, "Demo API key authentication is not configured.");
  }

  if (req.get("x-api-key") !== expectedKey) {
    return sendError(res, 401, "A valid API key is required.");
  }

  next();
}
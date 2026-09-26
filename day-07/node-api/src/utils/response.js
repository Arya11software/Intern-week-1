export function sendError(res, status, message) {
  return res.status(status).json({ success: false, message });
}

export function sendSuccess(res, status, data) {
  return res.status(status).json(data);
}
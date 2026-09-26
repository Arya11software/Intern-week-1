import { employeeService } from "../services/employeeService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const employeeController = {
  getAll(req, res) {
    return sendSuccess(res, 200, employeeService.getAll());
  },
  getById(req, res) {
    const employee = employeeService.getById(req.employeeId);
    if (!employee) return sendError(res, 404, "Employee not found");
    return sendSuccess(res, 200, employee);
  },
  create(req, res) {
    const employee = employeeService.create(req.employeeData);
    return sendSuccess(res, 201, employee);
  },
  update(req, res) {
    const employee = employeeService.update(req.employeeId, req.employeeData);
    if (!employee) return sendError(res, 404, "Employee not found");
    return sendSuccess(res, 200, employee);
  },
  delete(req, res) {
    const deleted = employeeService.delete(req.employeeId);
    if (!deleted) return sendError(res, 404, "Employee not found");
    return res.status(200).json({ success: true, message: "Employee deleted successfully." });
  },
};
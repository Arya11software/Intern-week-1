import { sendError } from "../utils/response.js";

export function validateEmployee(req, res, next) {
  const body = req.body;
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return sendError(res, 400, "Request body must be a JSON object.");
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const department = typeof body.department === "string" ? body.department.trim() : "";
  const salary = body.salary;

  if (!name) return sendError(res, 400, "Name is required.");
  if (!department) return sendError(res, 400, "Department is required.");
  if (salary === undefined || salary === null || salary === "") {
    return sendError(res, 400, "Salary is required.");
  }
  if (typeof salary !== "number" || !Number.isFinite(salary)) {
    return sendError(res, 400, "Salary must be a number.");
  }
  if (salary < 0) return sendError(res, 400, "Salary cannot be negative.");

  req.employeeData = { name, department, salary };
  next();
}

export function validateEmployeeId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return sendError(res, 400, "Employee ID must be a positive integer.");
  }

  req.employeeId = id;
  next();
}
import { employeeModel } from "../models/employeeModel.js";

export const employeeService = {
  getAll() {
    return employeeModel.getAll();
  },
  getById(id) {
    return employeeModel.getById(id);
  },
  create(employee) {
    return employeeModel.create(employee);
  },
  update(id, employee) {
    return employeeModel.update(id, employee);
  },
  delete(id) {
    return employeeModel.delete(id);
  },
};
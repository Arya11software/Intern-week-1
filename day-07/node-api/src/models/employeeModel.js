import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const apiDirectory = path.resolve(currentDirectory, "../..");
const configuredPath = process.env.DATABASE_PATH || "./database/employees.db";
const databasePath = path.isAbsolute(configuredPath)
  ? configuredPath
  : path.resolve(apiDirectory, configuredPath);

mkdirSync(path.dirname(databasePath), { recursive: true });

const database = new DatabaseSync(databasePath);
database.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    salary REAL NOT NULL CHECK (salary >= 0)
  )
`);

const employeeCount = database.prepare("SELECT COUNT(*) AS count FROM employees").get().count;
if (employeeCount === 0) {
  const insertEmployee = database.prepare(
    "INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)",
  );
  const seedEmployees = [
    ["Rahul", "IT", 400000],
    ["Priya", "HR", 300000],
    ["Amit", "Finance", 350000],
    ["Neha", "IT", 450000],
  ];

  database.exec("BEGIN");
  try {
    for (const employee of seedEmployees) {
      insertEmployee.run(...employee);
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

const selectAll = database.prepare(
  "SELECT id, name, department, salary FROM employees ORDER BY id",
);
const selectById = database.prepare(
  "SELECT id, name, department, salary FROM employees WHERE id = ?",
);
const insert = database.prepare(
  "INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)",
);
const update = database.prepare(
  "UPDATE employees SET name = ?, department = ?, salary = ? WHERE id = ?",
);
const remove = database.prepare("DELETE FROM employees WHERE id = ?");

export const employeeModel = {
  getAll() {
    return selectAll.all();
  },
  getById(id) {
    return selectById.get(id) ?? null;
  },
  create(employee) {
    const result = insert.run(employee.name, employee.department, employee.salary);
    return this.getById(Number(result.lastInsertRowid));
  },
  update(id, employee) {
    const result = update.run(employee.name, employee.department, employee.salary, id);
    return result.changes === 0 ? null : this.getById(id);
  },
  delete(id) {
    return remove.run(id).changes > 0;
  },
};

export function closeDatabase() {
  database.close();
}
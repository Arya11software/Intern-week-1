require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const PORT = process.env.PORT || 5000;


// ==========================================
// Middleware
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// Request Logger Middleware
// ==========================================

app.use((req, res, next) => {

    const startTime = Date.now();

    res.on("finish", () => {

        const duration =
            Date.now() - startTime;

        console.log(
            `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
        );

    });

    next();
});


// ==========================================
// Request Validation
// ==========================================

function validateEmployee(req, res, next) {

    const {
        name,
        department,
        salary
    } = req.body;


    if (
        typeof name !== "string" ||
        name.trim() === ""
    ) {

        return res.status(400).json({
            message:
                "Name is required and must be text."
        });

    }


    if (
        typeof department !== "string" ||
        department.trim() === ""
    ) {

        return res.status(400).json({
            message:
                "Department is required and must be text."
        });

    }


    const numericSalary =
        Number(salary);


    if (
        !Number.isFinite(numericSalary) ||
        numericSalary < 0
    ) {

        return res.status(400).json({
            message:
                "Salary must be a valid non-negative number."
        });

    }


    next();
}


// ==========================================
// Database
// ==========================================

const db =
    new Database("employees.db");


// ==========================================
// Create Employees Table
// ==========================================

db.prepare(`
    CREATE TABLE IF NOT EXISTS employees (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        department TEXT NOT NULL,

        salary REAL NOT NULL

    )
`).run();

// ==========================================
// Insert Day 2 Employee Data
// ==========================================

const employeeCount =
    db.prepare(
        "SELECT COUNT(*) AS count FROM employees"
    ).get();

if (employeeCount.count === 0) {

    const insert =
        db.prepare(`
            INSERT INTO employees
            (name, department, salary)
            VALUES (?, ?, ?)
        `);

    insert.run(
        "Rahul",
        "IT",
        40000
    );

    insert.run(
        "Priya",
        "HR",
        30000
    );

    insert.run(
        "Amit",
        "IT",
        35000
    );
}


// ==========================================
// GET - All Employees
// ==========================================

app.get(
    "/api/employees",
    (req, res) => {

        try {

            const employees =
                db.prepare(
                    "SELECT * FROM employees ORDER BY id"
                ).all();


            res.json(employees);

        } catch (error) {

            console.error(
                "GET Error:",
                error
            );


            res.status(500).json({
                message:
                    "Failed to fetch employees."
            });

        }
    }
);


// ==========================================
// GET - Single Employee
// ==========================================

app.get(
    "/api/employees/:id",
    (req, res) => {

        try {

            const id =
                Number(req.params.id);


            if (!Number.isInteger(id)) {

                return res.status(400).json({
                    message:
                        "Employee ID must be a number."
                });

            }


            const employee =
                db.prepare(
                    "SELECT * FROM employees WHERE id = ?"
                ).get(id);


            if (!employee) {

                return res.status(404).json({
                    message:
                        "Employee not found."
                });

            }


            res.json(employee);

        } catch (error) {

            console.error(
                "GET Employee Error:",
                error
            );


            res.status(500).json({
                message:
                    "Failed to fetch employee."
            });

        }
    }
);


// ==========================================
// POST - Create Employee
// ==========================================

app.post(
    "/api/employees",
    validateEmployee,
    (req, res) => {

        try {

            const {
                name,
                department,
                salary
            } = req.body;


            const numericSalary =
                Number(salary);


            const result =
                db.prepare(`
                    INSERT INTO employees
                    (name, department, salary)
                    VALUES (?, ?, ?)
                `).run(
                    name.trim(),
                    department.trim(),
                    numericSalary
                );


            const newEmployee =
                db.prepare(
                    "SELECT * FROM employees WHERE id = ?"
                ).get(
                    result.lastInsertRowid
                );


            res.status(201).json(
                newEmployee
            );

        } catch (error) {

            console.error(
                "POST Error:",
                error
            );


            res.status(500).json({
                message:
                    "Failed to create employee."
            });

        }
    }
);


// ==========================================
// PUT - Update Employee
// ==========================================

app.put(
    "/api/employees/:id",
    validateEmployee,
    (req, res) => {

        try {

            const id =
                Number(req.params.id);


            if (!Number.isInteger(id)) {

                return res.status(400).json({
                    message:
                        "Employee ID must be a number."
                });

            }


            const {
                name,
                department,
                salary
            } = req.body;


            const existingEmployee =
                db.prepare(
                    "SELECT * FROM employees WHERE id = ?"
                ).get(id);


            if (!existingEmployee) {

                return res.status(404).json({
                    message:
                        "Employee not found."
                });

            }


            const numericSalary =
                Number(salary);


            db.prepare(`
                UPDATE employees

                SET
                    name = ?,
                    department = ?,
                    salary = ?

                WHERE id = ?
            `).run(
                name.trim(),
                department.trim(),
                numericSalary,
                id
            );


            const updatedEmployee =
                db.prepare(
                    "SELECT * FROM employees WHERE id = ?"
                ).get(id);


            res.json(
                updatedEmployee
            );

        } catch (error) {

            console.error(
                "PUT Error:",
                error
            );


            res.status(500).json({
                message:
                    "Failed to update employee."
            });

        }
    }
);


// ==========================================
// DELETE - Delete Employee
// ==========================================

app.delete(
    "/api/employees/:id",
    (req, res) => {

        try {

            const id =
                Number(req.params.id);


            if (!Number.isInteger(id)) {

                return res.status(400).json({
                    message:
                        "Employee ID must be a number."
                });

            }


            const employee =
                db.prepare(
                    "SELECT * FROM employees WHERE id = ?"
                ).get(id);


            if (!employee) {

                return res.status(404).json({
                    message:
                        "Employee not found."
                });

            }


            db.prepare(
                "DELETE FROM employees WHERE id = ?"
            ).run(id);


            res.json({
                message:
                    "Employee deleted successfully."
            });

        } catch (error) {

            console.error(
                "DELETE Error:",
                error
            );


            res.status(500).json({
                message:
                    "Failed to delete employee."
            });

        }
    }
);


// ==========================================
// Health Check
// ==========================================

app.get(
    "/",
    (req, res) => {

        res.json({
            message:
                "Employee API is running",

            database:
                "SQLite",

            status:
                "connected"
        });

    }
);


// ==========================================
// Global Error Handler
// ==========================================

app.use(
    (error, req, res, next) => {

        console.error(
            "Server Error:",
            error
        );


        res.status(500).json({
            message:
                "Internal server error."
        });

    }
);


// ==========================================
// Start Server
// ==========================================

app.listen(
    PORT,
    () => {

        console.log(
            `Server running at http://localhost:${PORT}`
        );

        console.log(
            "SQLite database connected."
        );

    }
);
// ==========================================
// Employee Dashboard - Real REST API
// ==========================================

// ==========================================
// API URL
// ==========================================

const API_URL =
    "http://localhost:5000/api/employees";


// ==========================================
// Employee Data
// ==========================================

let employees = [];


// ==========================================
// DOM Elements
// ==========================================

const employeeList =
    document.getElementById("employeeList");

const searchInput =
    document.getElementById("searchInput");

const departmentFilter =
    document.getElementById("departmentFilter");

const sortOption =
    document.getElementById("sortOption");

const addEmployeeButton =
    document.getElementById("addEmployeeButton");


// ==========================================
// Details Modal
// ==========================================

const employeeModal =
    document.getElementById("employeeModal");

const employeeDetails =
    document.getElementById("employeeDetails");

const closeModal =
    document.getElementById("closeModal");


// ==========================================
// Employee Form Modal
// ==========================================

const formModal =
    document.getElementById("formModal");

const closeFormModal =
    document.getElementById("closeFormModal");

const employeeForm =
    document.getElementById("employeeForm");

const formTitle =
    document.getElementById("formTitle");

const employeeName =
    document.getElementById("employeeName");

const employeeDepartment =
    document.getElementById("employeeDepartment");

const employeeSalary =
    document.getElementById("employeeSalary");


// Employee currently being edited

let editingEmployeeId = null;


// ==========================================
// GET - Fetch All Employees
// ==========================================

async function fetchEmployees() {

    try {

        employeeList.innerHTML =
            "<p>Loading employees...</p>";


        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }


        employees =
            await response.json();


        updateEmployees();

    } catch (error) {

        console.error(
            "GET Error:",
            error
        );


        employeeList.innerHTML =
            `
            <p>
                Failed to load employees.
                Make sure the backend is running.
            </p>
            `;
    }
}


// ==========================================
// Display Employees
// ==========================================

function displayEmployees(employeeData) {

    employeeList.innerHTML = "";


    if (employeeData.length === 0) {

        employeeList.innerHTML =
            "<p>No employees found.</p>";

        return;
    }


    employeeData.forEach(employee => {

        const card =
            document.createElement("div");


        card.className =
            "employee-card";


        card.innerHTML = `

            <h3>
                ${employee.name}
            </h3>

            <p>
                <strong>ID:</strong>
                ${employee.id}
            </p>

            <p>
                <strong>Department:</strong>
                ${employee.department}
            </p>

            <p>
                <strong>Salary:</strong>
                ₹${Number(employee.salary).toLocaleString("en-IN")}
            </p>

            <button
                onclick="viewEmployee(${employee.id})"
            >
                Details
            </button>

            <button
                onclick="editEmployee(${employee.id})"
            >
                Edit
            </button>

            <button
                onclick="deleteEmployee(${employee.id})"
            >
                Delete
            </button>

        `;


        employeeList.appendChild(card);

    });
}


// ==========================================
// Search / Filter / Sort
// ==========================================

function updateEmployees() {

    let result =
        [...employees];


    // ======================================
    // Search
    // ======================================

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchText !== "") {

        result =
            result.filter(employee =>

                employee.name
                    .toLowerCase()
                    .includes(searchText)

            );

    }


    // ======================================
    // Department Filter
    // ======================================

    const department =
        departmentFilter.value;


    if (department !== "all") {

        result =
            result.filter(employee =>

                employee.department ===
                department

            );

    }


    // ======================================
    // Sorting
    // ======================================

    const sort =
        sortOption.value;


    if (sort === "salary-high") {

        result.sort(
            (a, b) =>
                Number(b.salary) -
                Number(a.salary)
        );

    }


    if (sort === "salary-low") {

        result.sort(
            (a, b) =>
                Number(a.salary) -
                Number(b.salary)
        );

    }


    if (sort === "name") {

        result.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    displayEmployees(result);
}


// ==========================================
// GET - Single Employee
// ==========================================

async function viewEmployee(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }


        const employee =
            await response.json();


        employeeDetails.innerHTML = `

            <div class="employee-detail">

                <strong>ID:</strong>

                ${employee.id}

            </div>


            <div class="employee-detail">

                <strong>Name:</strong>

                ${employee.name}

            </div>


            <div class="employee-detail">

                <strong>Department:</strong>

                ${employee.department}

            </div>


            <div class="employee-detail">

                <strong>Salary:</strong>

                ₹${Number(employee.salary)
                    .toLocaleString("en-IN")}

            </div>

        `;


        employeeModal.style.display =
            "flex";

    } catch (error) {

        console.error(
            "GET Employee Error:",
            error
        );


        alert(
            "Failed to load employee details."
        );
    }
}


// ==========================================
// Open Add Employee Form
// ==========================================

function openAddEmployeeForm() {

    editingEmployeeId =
        null;


    formTitle.textContent =
        "Add Employee";


    employeeForm.reset();


    formModal.style.display =
        "flex";
}


// ==========================================
// Open Edit Employee Form
// ==========================================

function editEmployee(id) {

    const employee =
        employees.find(
            employee =>
                employee.id === id
        );


    if (!employee) {

        alert(
            "Employee not found."
        );

        return;
    }


    editingEmployeeId =
        id;


    formTitle.textContent =
        "Edit Employee";


    employeeName.value =
        employee.name;


    employeeDepartment.value =
        employee.department;


    employeeSalary.value =
        employee.salary;


    formModal.style.display =
        "flex";
}


// ==========================================
// POST - Create Employee
// ==========================================

async function createEmployee(employeeData) {

    try {

        const response =
            await fetch(
                API_URL,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            employeeData
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }


        const createdEmployee =
            await response.json();


        console.log(
            "Employee created:",
            createdEmployee
        );


        return createdEmployee;

    } catch (error) {

        console.error(
            "POST Error:",
            error
        );


        return null;
    }
}


// ==========================================
// PUT - Update Employee
// ==========================================

async function updateEmployeeAPI(
    id,
    employeeData
) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            employeeData
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }


        const updatedEmployee =
            await response.json();


        console.log(
            "Employee updated:",
            updatedEmployee
        );


        return updatedEmployee;

    } catch (error) {

        console.error(
            "PUT Error:",
            error
        );


        return null;
    }
}


// ==========================================
// DELETE - Delete Employee
// ==========================================

async function deleteEmployeeAPI(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }


        console.log(
            "Employee deleted:",
            id
        );


        return true;

    } catch (error) {

        console.error(
            "DELETE Error:",
            error
        );


        return false;
    }
}


// ==========================================
// Save Employee
// ==========================================

async function saveEmployee(event) {

    event.preventDefault();


    const name =
        employeeName.value.trim();

    const department =
        employeeDepartment.value;

    const salary =
        Number(employeeSalary.value);


    // ======================================
    // Validation
    // ======================================

    if (!name) {

        alert(
            "Please enter employee name."
        );

        return;
    }


    if (!department) {

        alert(
            "Please select a department."
        );

        return;
    }


    if (
        !Number.isFinite(salary) ||
        salary < 0
    ) {

        alert(
            "Please enter a valid salary."
        );

        return;
    }


    const employeeData = {

        name:
            name,

        department:
            department,

        salary:
            salary

    };


    // ======================================
    // UPDATE Existing Employee
    // ======================================

    if (editingEmployeeId !== null) {

        const updatedEmployee =
            await updateEmployeeAPI(
                editingEmployeeId,
                employeeData
            );


        if (!updatedEmployee) {

            alert(
                "Failed to update employee."
            );

            return;
        }

    }


    // ======================================
    // CREATE New Employee
    // ======================================

    else {

        const createdEmployee =
            await createEmployee(
                employeeData
            );


        if (!createdEmployee) {

            alert(
                "Failed to create employee."
            );

            return;
        }

    }


    // ======================================
    // Close Form
    // ======================================

    formModal.style.display =
        "none";


    employeeForm.reset();


    editingEmployeeId =
        null;


    // ======================================
    // Reload Data From Backend
    // ======================================

    await fetchEmployees();
}


// ==========================================
// DELETE Employee
// ==========================================

async function deleteEmployee(id) {

    const employee =
        employees.find(
            employee =>
                employee.id === id
        );


    if (!employee) {

        alert(
            "Employee not found."
        );

        return;
    }


    const confirmed =
        confirm(
            `Delete ${employee.name}?`
        );


    if (!confirmed) {

        return;
    }


    const deleted =
        await deleteEmployeeAPI(id);


    if (!deleted) {

        alert(
            "Failed to delete employee."
        );

        return;
    }


    await fetchEmployees();
}


// ==========================================
// Close Details Modal
// ==========================================

closeModal.addEventListener(
    "click",
    () => {

        employeeModal.style.display =
            "none";

    }
);


// ==========================================
// Close Form Modal
// ==========================================

closeFormModal.addEventListener(
    "click",
    () => {

        formModal.style.display =
            "none";

    }
);


// ==========================================
// Close Details Modal
// ==========================================

employeeModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            employeeModal
        ) {

            employeeModal.style.display =
                "none";

        }

    }
);


// ==========================================
// Close Form Modal
// ==========================================

formModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            formModal
        ) {

            formModal.style.display =
                "none";

        }

    }
);


// ==========================================
// Event Listeners
// ==========================================

searchInput.addEventListener(
    "input",
    updateEmployees
);


departmentFilter.addEventListener(
    "change",
    updateEmployees
);


sortOption.addEventListener(
    "change",
    updateEmployees
);


addEmployeeButton.addEventListener(
    "click",
    openAddEmployeeForm
);


employeeForm.addEventListener(
    "submit",
    saveEmployee
);


// ==========================================
// Start Application
// ==========================================

fetchEmployees();
const STORAGE_KEY = "day5-employee-directory";
const EMPLOYEES_URL = "./data/employees.json";

const employeeList = document.querySelector("#employee-list");
const searchInput = document.querySelector("#search-input");
const departmentFilter = document.querySelector("#department-filter");
const sortControl = document.querySelector("#sort-control");
const statusMessage = document.querySelector("#status-message");
const employeeDialog = document.querySelector("#employee-dialog");
const employeeForm = document.querySelector("#employee-form");
const detailsDialog = document.querySelector("#details-dialog");
const detailsContent = document.querySelector("#details-content");
const formError = document.querySelector("#form-error");

let employees = [];
let editingEmployeeId = null;
let storageWarning = "";

function showMessage(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

function formatSalary(salary) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(salary);
}

function calculateStatistics() {
  const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
  const averageSalary = employees.length ? totalSalary / employees.length : 0;
  const departmentCount = new Set(employees.map((employee) => employee.department)).size;

  document.querySelector("#total-employees").textContent = employees.length;
  document.querySelector("#average-salary").textContent = formatSalary(averageSalary);
  document.querySelector("#department-count").textContent = departmentCount;
}

function updateDepartmentOptions() {
  const selectedDepartment = departmentFilter.value;
  const departments = [...new Set(employees.map((employee) => employee.department))]
    .sort((first, second) => first.localeCompare(second));

  departmentFilter.replaceChildren(new Option("All departments", "all"));
  for (const department of departments) {
    departmentFilter.add(new Option(department, department));
  }
  departmentFilter.value = departments.includes(selectedDepartment) ? selectedDepartment : "all";
}

function getVisibleEmployees() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedDepartment = departmentFilter.value;
  const [sortBy, direction] = sortControl.value.split("-");

  return employees
    .filter((employee) => {
      const matchesQuery = `${employee.name} ${employee.email}`.toLowerCase().includes(query);
      const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
      return matchesQuery && matchesDepartment;
    })
    .sort((first, second) => {
      const comparison = sortBy === "salary"
        ? first.salary - second.salary
        : first.name.localeCompare(second.name);
      return direction === "desc" ? -comparison : comparison;
    });
}

function createEmployeeRow(employee) {
  const row = document.createElement("tr");
  const identityCell = document.createElement("td");
  const identity = document.createElement("div");
  identity.className = "employee-cell";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = employee.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  const identityText = document.createElement("div");
  const name = document.createElement("span");
  name.className = "employee-name";
  name.textContent = employee.name;
  const email = document.createElement("span");
  email.className = "employee-email";
  email.textContent = employee.email;
  identityText.append(name, email);
  identity.append(avatar, identityText);
  identityCell.append(identity);

  const departmentCell = document.createElement("td");
  const departmentTag = document.createElement("span");
  departmentTag.className = "department-tag";
  departmentTag.textContent = employee.department;
  departmentCell.append(departmentTag);

  const salaryCell = document.createElement("td");
  salaryCell.className = "salary-cell";
  salaryCell.textContent = formatSalary(employee.salary);

  row.append(
    identityCell,
    departmentCell,
    createTextCell(employee.position),
    salaryCell,
    createTextCell(employee.location),
    createActionsCell(employee.id),
  );
  return row;
}

function createTextCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

function createActionsCell(employeeId) {
  const cell = document.createElement("td");
  const actions = document.createElement("div");
  actions.className = "actions";

  const actionItems = [
    ["Details", () => showEmployeeDetails(employeeId), ""],
    ["Edit", () => editEmployee(employeeId), ""],
    ["Delete", () => deleteEmployee(employeeId), "delete-action"],
  ];
  for (const [label, action, className] of actionItems) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `text-action ${className}`.trim();
    button.textContent = label;
    button.addEventListener("click", action);
    actions.append(button);
  }
  cell.append(actions);
  return cell;
}

function renderEmployees() {
  const visibleEmployees = getVisibleEmployees();
  employeeList.replaceChildren();
  document.querySelector("#result-count").textContent =
    `${visibleEmployees.length} ${visibleEmployees.length === 1 ? "employee" : "employees"}`;

  if (!visibleEmployees.length) {
    const row = document.createElement("tr");
    const message = document.createElement("td");
    message.className = "empty-state";
    message.colSpan = 6;
    message.textContent = "No employees match these filters.";
    row.append(message);
    employeeList.append(row);
    return;
  }

  employeeList.append(...visibleEmployees.map(createEmployeeRow));
}

function saveEmployees() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return true;
  } catch {
    return false;
  }
}

function refreshDashboard(message) {
  updateDepartmentOptions();
  calculateStatistics();
  renderEmployees();
  if (message) showMessage(message);
}

async function loadEmployees() {
  try {
    const savedEmployees = localStorage.getItem(STORAGE_KEY);
    if (savedEmployees !== null) {
      const parsedEmployees = JSON.parse(savedEmployees);
      if (!Array.isArray(parsedEmployees)) throw new Error("Saved employee data is not a list.");
      employees = parsedEmployees;
      refreshDashboard("Loaded your saved employee data from this browser.");
      return;
    }
  } catch (error) {
    storageWarning = `Saved browser data could not be read. Loading the starter data instead: ${error.message}`;
    showMessage(storageWarning, true);
  }

  try {
    const response = await fetch(EMPLOYEES_URL);
    if (!response.ok) throw new Error(`Employee data request returned HTTP ${response.status}.`);
    const loadedEmployees = await response.json();
    if (!Array.isArray(loadedEmployees)) throw new Error("Employee data must be a JSON array.");
    employees = loadedEmployees;
    const wasSaved = saveEmployees();
    const message = wasSaved
      ? "Loaded the starter employees. Changes are saved in this browser."
      : "Loaded the starter employees. Changes will only last for this session because browser storage is unavailable.";
    refreshDashboard([storageWarning, message].filter(Boolean).join(" "));
  } catch (error) {
    employeeList.replaceChildren();
    const row = document.createElement("tr");
    const message = document.createElement("td");
    message.className = "empty-state";
    message.colSpan = 6;
    message.textContent = "Employee data could not be loaded. Run this page from a local web server and check data/employees.json.";
    row.append(message);
    employeeList.append(row);
    showMessage(`Could not load employees: ${error.message}`, true);
  }
}

function showEmployeeDetails(employeeId) {
  const employee = employees.find((item) => item.id === employeeId);
  if (!employee) {
    showMessage("That employee could not be found. The list has been refreshed.", true);
    refreshDashboard();
    return;
  }

  const details = [
    ["Name", employee.name],
    ["Email", employee.email],
    ["Department", employee.department],
    ["Position", employee.position],
    ["Salary", formatSalary(employee.salary)],
    ["Location", employee.location],
  ];
  detailsContent.replaceChildren(...details.map(([label, value]) => {
    const item = document.createElement("div");
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value;
    item.append(term, description);
    return item;
  }));
  detailsDialog.showModal();
}

function openAddEmployeeForm() {
  editingEmployeeId = null;
  employeeForm.reset();
  formError.textContent = "";
  document.querySelector("#form-title").textContent = "Add employee";
  employeeDialog.showModal();
}

function editEmployee(employeeId) {
  const employee = employees.find((item) => item.id === employeeId);
  if (!employee) {
    showMessage("That employee could not be found. The list has been refreshed.", true);
    refreshDashboard();
    return;
  }

  editingEmployeeId = employeeId;
  for (const field of ["name", "email", "department", "position", "salary", "location"]) {
    employeeForm.elements[field].value = employee[field];
  }
  formError.textContent = "";
  document.querySelector("#form-title").textContent = "Edit employee";
  employeeDialog.showModal();
}

function validateEmployee(employee) {
  if (Object.values(employee).some((value) => value === "")) return "Please complete every field.";
  if (!employeeForm.elements.email.validity.valid) return "Enter a valid email address.";
  if (!Number.isFinite(employee.salary) || employee.salary <= 0) return "Salary must be a number greater than zero.";
  return "";
}

function saveEmployee(event) {
  event.preventDefault();
  const formData = new FormData(employeeForm);
  const employee = {
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    department: formData.get("department").trim(),
    position: formData.get("position").trim(),
    salary: Number(formData.get("salary")),
    location: formData.get("location").trim(),
  };
  const validationMessage = validateEmployee(employee);
  if (validationMessage) {
    formError.textContent = validationMessage;
    return;
  }

  if (editingEmployeeId === null) {
    const nextId = employees.reduce((largestId, item) => Math.max(largestId, item.id), 0) + 1;
    employees.push({ id: nextId, ...employee });
  } else {
    const employeeIndex = employees.findIndex((item) => item.id === editingEmployeeId);
    if (employeeIndex === -1) {
      formError.textContent = "This employee no longer exists. Close the form and refresh the list.";
      return;
    }
    employees[employeeIndex] = { id: editingEmployeeId, ...employee };
  }

  const wasSaved = saveEmployees();
  employeeDialog.close();
  refreshDashboard(wasSaved ? "Employee saved." : "Employee updated for this session only.");
}

function deleteEmployee(employeeId) {
  const employee = employees.find((item) => item.id === employeeId);
  if (!employee) {
    showMessage("That employee could not be found. The list has been refreshed.", true);
    refreshDashboard();
    return;
  }
  if (!window.confirm(`Delete ${employee.name} from the directory?`)) return;

  employees = employees.filter((item) => item.id !== employeeId);
  const wasSaved = saveEmployees();
  refreshDashboard(wasSaved ? `${employee.name} was deleted.` : `${employee.name} was deleted for this session only.`);
}

searchInput.addEventListener("input", renderEmployees);
departmentFilter.addEventListener("change", renderEmployees);
sortControl.addEventListener("change", renderEmployees);
document.querySelector("#add-employee-button").addEventListener("click", openAddEmployeeForm);
employeeForm.addEventListener("submit", saveEmployee);
document.querySelectorAll("[data-close-form]").forEach((button) => {
  button.addEventListener("click", () => employeeDialog.close());
});
document.querySelectorAll("[data-close-details]").forEach((button) => {
  button.addEventListener("click", () => detailsDialog.close());
});

loadEmployees();
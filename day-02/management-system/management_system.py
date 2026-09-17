import csv
import os


FILE_NAME = "..\csv-analysis\employees.csv"
FIELDNAMES = ["id", "name", "department", "salary"]


# Load employees from CSV file
def load_employees():
    if not os.path.exists(FILE_NAME):
        return []

    employees = []

    try:
        with open(FILE_NAME, "r", newline="") as file:
            reader = csv.DictReader(file)

            for row in reader:
                row["salary"] = float(row["salary"])
                employees.append(row)

        return employees

    except ValueError:
        print("Error: Invalid salary value in CSV file.")
        return []

    except Exception as error:
        print("Error loading employees:", error)
        return []


# Save employees to CSV file
def save_employees():
    try:
        with open(FILE_NAME, "w", newline="") as file:
            writer = csv.DictWriter(file, fieldnames=FIELDNAMES)

            writer.writeheader()
            writer.writerows(employees)

    except Exception as error:
        print("Error saving employees:", error)


# Add employee
def add_employee():
    try:
        employee_id = input("Enter employee ID: ")

        # Check duplicate ID
        for employee in employees:
            if employee["id"] == employee_id:
                print("Employee ID already exists.")
                return

        name = input("Enter employee name: ")
        department = input("Enter department: ")
        salary = float(input("Enter salary: "))

        if salary < 0:
            print("Salary cannot be negative.")
            return

        employee = {
            "id": employee_id,
            "name": name,
            "department": department,
            "salary": salary
        }

        employees.append(employee)
        save_employees()

        print("Employee added successfully.")

    except ValueError:
        print("Error: Salary must be a valid number.")


# Update employee
def update_employee():
    employee_id = input("Enter employee ID to update: ")

    for employee in employees:
        if employee["id"] == employee_id:

            try:
                name = input("Enter new name: ")
                department = input("Enter new department: ")
                salary = float(input("Enter new salary: "))

                if salary < 0:
                    print("Salary cannot be negative.")
                    return

                employee["name"] = name
                employee["department"] = department
                employee["salary"] = salary

                save_employees()

                print("Employee updated successfully.")
                return

            except ValueError:
                print("Error: Salary must be a valid number.")
                return

    print("Employee not found.")


# Delete employee
def delete_employee():
    employee_id = input("Enter employee ID to delete: ")

    for employee in employees:
        if employee["id"] == employee_id:

            confirmation = input(
                "Are you sure you want to delete this employee? (y/n): "
            )

            if confirmation.lower() == "y":
                employees.remove(employee)
                save_employees()
                print("Employee deleted successfully.")
            else:
                print("Deletion cancelled.")

            return

    print("Employee not found.")


# Search employee
def search_employee():
    search_value = input(
        "Enter employee ID or name to search: "
    ).lower()

    found = False

    for employee in employees:
        if (
            employee["id"].lower() == search_value
            or employee["name"].lower() == search_value
        ):
            print("\nEmployee Found")
            print("ID:", employee["id"])
            print("Name:", employee["name"])
            print("Department:", employee["department"])
            print("Salary:", employee["salary"])

            found = True

    if not found:
        print("Employee not found.")


# List employees
def list_employees():
    if not employees:
        print("No employees found.")
        return

    print("\n========== Employee List ==========")

    for employee in employees:
        print(
            f"ID: {employee['id']} | "
            f"Name: {employee['name']} | "
            f"Department: {employee['department']} | "
            f"Salary: {employee['salary']}"
        )


# Filter by department
def filter_by_department():
    department = input("Enter department: ").lower()

    found = False

    print("\nEmployees in", department)

    for employee in employees:
        if employee["department"].lower() == department:
            print(
                f"ID: {employee['id']} | "
                f"Name: {employee['name']} | "
                f"Salary: {employee['salary']}"
            )
            found = True

    if not found:
        print("No employees found in this department.")


# Sort employees
def sort_employees():
    if not employees:
        print("No employees found.")
        return

    print("\n1. Sort by Name")
    print("2. Sort by Salary")

    choice = input("Enter choice: ")

    if choice == "1":
        sorted_employees = sorted(
            employees,
            key=lambda employee: employee["name"].lower()
        )

    elif choice == "2":
        sorted_employees = sorted(
            employees,
            key=lambda employee: employee["salary"]
        )

    else:
        print("Invalid choice.")
        return

    print("\n========== Sorted Employees ==========")

    for employee in sorted_employees:
        print(
            f"ID: {employee['id']} | "
            f"Name: {employee['name']} | "
            f"Department: {employee['department']} | "
            f"Salary: {employee['salary']}"
        )


# Statistics
def statistics():
    if not employees:
        print("No employees found.")
        return

    total_salary = sum(
        employee["salary"] for employee in employees
    )

    average_salary = total_salary / len(employees)

    highest = max(
        employees,
        key=lambda employee: employee["salary"]
    )

    lowest = min(
        employees,
        key=lambda employee: employee["salary"]
    )

    print("\n========== Statistics ==========")
    print("Total Employees:", len(employees))
    print("Total Salary:", total_salary)
    print("Average Salary:", round(average_salary, 2))

    print("\nHighest Salary:")
    print("Name:", highest["name"])
    print("Salary:", highest["salary"])

    print("\nLowest Salary:")
    print("Name:", lowest["name"])
    print("Salary:", lowest["salary"])


# Load employees when program starts
employees = load_employees()


# Main menu
while True:

    print("\n======================================")
    print("      EMPLOYEE MANAGEMENT SYSTEM")
    print("======================================")

    print("1. Add Employee")
    print("2. Update Employee")
    print("3. Delete Employee")
    print("4. Search Employee")
    print("5. List Employees")
    print("6. Filter by Department")
    print("7. Sort Employees")
    print("8. Statistics")
    print("9. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        add_employee()

    elif choice == "2":
        update_employee()

    elif choice == "3":
        delete_employee()

    elif choice == "4":
        search_employee()

    elif choice == "5":
        list_employees()

    elif choice == "6":
        filter_by_department()

    elif choice == "7":
        sort_employees()

    elif choice == "8":
        statistics()

    elif choice == "9":
        print("Exiting Employee Management System.")
        break

    else:
        print("Invalid choice. Please enter a number from 1 to 9.")
# Store all employees
employees = []


# Add a new employee
def add_employee():
    employee_id = input("Enter employee ID: ")
    name = input("Enter employee name: ")
    department = input("Enter department: ")
    salary = float(input("Enter salary: "))

    employee = {
        "id": employee_id,
        "name": name,
        "department": department,
        "salary": salary
    }

    employees.append(employee)
    print("Employee added successfully.")


# Update an existing employee
def update_employee():
    employee_id = input("Enter employee ID to update: ")

    for employee in employees:
        if employee["id"] == employee_id:
            employee["name"] = input("Enter new name: ")
            employee["department"] = input("Enter new department: ")
            employee["salary"] = float(input("Enter new salary: "))

            print("Employee updated successfully.")
            return

    print("Employee not found.")


# Delete an employee
def delete_employee():
    employee_id = input("Enter employee ID to delete: ")

    for employee in employees:
        if employee["id"] == employee_id:
            employees.remove(employee)
            print("Employee deleted successfully.")
            return

    print("Employee not found.")


# Search for an employee
def search_employee():
    employee_id = input("Enter employee ID to search: ")

    for employee in employees:
        if employee["id"] == employee_id:
            print("\nEmployee Found")
            print("ID:", employee["id"])
            print("Name:", employee["name"])
            print("Department:", employee["department"])
            print("Salary:", employee["salary"])
            return

    print("Employee not found.")


# Display all employees
def list_employees():
    if not employees:
        print("No employees found.")
        return

    print("\nEmployee List")

    for employee in employees:
        print(
            "ID:", employee["id"],
            "| Name:", employee["name"],
            "| Department:", employee["department"],
            "| Salary:", employee["salary"]
        )


# Find employee with highest salary
def highest_salary():
    if not employees:
        print("No employees found.")
        return

    highest = employees[0]

    for employee in employees:
        if employee["salary"] > highest["salary"]:
            highest = employee

    print("\nHighest Salary Employee")
    print("ID:", highest["id"])
    print("Name:", highest["name"])
    print("Department:", highest["department"])
    print("Salary:", highest["salary"])


# Calculate average salary
def average_salary():
    if not employees:
        print("No employees found.")
        return

    total_salary = 0

    for employee in employees:
        total_salary += employee["salary"]

    average = total_salary / len(employees)

    print("Average Salary:", average)


# Filter employees by department
def department_filter():
    department = input("Enter department: ")

    found = False

    print("\nEmployees in", department)

    for employee in employees:
        if employee["department"].lower() == department.lower():
            print(
                "ID:", employee["id"],
                "| Name:", employee["name"],
                "| Salary:", employee["salary"]
            )
            found = True

    if not found:
        print("No employees found in this department.")


# Main menu
while True:
    print("\n===== Employee Management System =====")
    print("1. Add Employee")
    print("2. Update Employee")
    print("3. Delete Employee")
    print("4. Search Employee")
    print("5. List Employees")
    print("6. Highest Salary")
    print("7. Average Salary")
    print("8. Department Filter")
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
        highest_salary()

    elif choice == "7":
        average_salary()

    elif choice == "8":
        department_filter()

    elif choice == "9":
        print("Exiting Employee Management System.")
        break

    else:
        print("Invalid choice. Please try again.")
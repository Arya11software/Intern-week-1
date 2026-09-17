# Create a class
class Employee:

    # Constructor
    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary

    # Method
    def display_info(self):
        print("Name:", self.name)
        print("Department:", self.department)
        print("Salary:", self.salary)


# Create objects
employee1 = Employee("Arya", "IT", 50000)
employee2 = Employee("Rahul", "HR", 45000)

# Display employee information
print("Employee 1")
employee1.display_info()

print("\nEmployee 2")
employee2.display_info()
# Employee class
class Employee:

    def __init__(self, name, salary):
        self.name = name

        # Private variable
        self.__salary = salary

    # Getter method
    def get_salary(self):
        return self.__salary

    # Setter method
    def set_salary(self, salary):
        if salary > 0:
            self.__salary = salary
        else:
            print("Salary must be greater than 0")


# Create an employee object
employee = Employee("Arya", 50000)

# Access salary using getter
print("Employee:", employee.name)
print("Salary:", employee.get_salary())

# Update salary using setter
employee.set_salary(60000)

print("Updated salary:", employee.get_salary())

# Try to set an invalid salary
employee.set_salary(-1000)
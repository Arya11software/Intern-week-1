# Parent class
class Employee:

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display_info(self):
        print("Name:", self.name)
        print("Salary:", self.salary)


# Child class
class Manager(Employee):

    def __init__(self, name, salary, team_size):
        # Call the parent class constructor
        super().__init__(name, salary)

        self.team_size = team_size

    def display_manager_info(self):
        self.display_info()
        print("Team Size:", self.team_size)


# Create an Employee object
employee = Employee("Rahul", 40000)

print("Employee")
employee.display_info()


# Create a Manager object
manager = Manager("Arya", 70000, 5)

print("\nManager")
manager.display_manager_info()
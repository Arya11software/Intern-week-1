# Function without parameters
def greet():
    print("Welcome to Python!")


# Function with parameters
def greet_user(name):
    print("Hello,", name)


# Function that returns a value
def add_numbers(a, b):
    return a + b


# Function for checking even or odd
def check_even_odd(number):
    if number % 2 == 0:
        return "Even"
    else:
        return "Odd"


# Calling the functions
greet()

greet_user("Arya")

result = add_numbers(10, 20)
print("Sum:", result)

number = int(input("Enter a number: "))
print("The number is:", check_even_odd(number))
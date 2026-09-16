# Ask the user for two numbers
try:
    number1 = float(input("Enter first number: "))
    number2 = float(input("Enter second number: "))

    # Perform division
    result = number1 / number2

    print("Result:", result)

except ValueError:
    print("Error: Please enter valid numbers.")

except ZeroDivisionError:
    print("Error: Cannot divide by zero.")

except Exception as error:
    print("Unexpected error:", error)

finally:
    print("Program execution completed.")
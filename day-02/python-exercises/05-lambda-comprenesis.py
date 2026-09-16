# Lambda function
# A lambda is a small anonymous function

square = lambda number: number * number

print("Square of 5:", square(5))


# Lambda with two parameters
add = lambda a, b: a + b

print("Sum:", add(10, 20))


# List comprehension
numbers = [1, 2, 3, 4, 5]

squares = [number * number for number in numbers]

print("Original numbers:", numbers)
print("Squares:", squares)


# List comprehension with a condition
even_numbers = [number for number in numbers if number % 2 == 0]

print("Even numbers:", even_numbers)
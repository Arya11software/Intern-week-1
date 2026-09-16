# Generate a list of numbers to give as an input 
numbers = [10, 25, 7, 42, 18]

# Initialize the largest number as the first number in the list
largest = numbers[0]

# Check every number in the list
for number in numbers:
    if number > largest:
        largest = number

# Display the largest number
print("Largest number:", largest)
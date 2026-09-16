# Generate a list of numbers to give as an input 
numbers = [10, 25, 7, 42, 18]

# Assume the first two numbers
largest = numbers[0]
second_largest = numbers[1]

# Make sure largest contains the bigger value
if second_largest > largest:
    largest, second_largest = second_largest, largest

# Check the remaining numbers
for number in numbers[2:]:
    if number > largest:
        second_largest = largest
        largest = number
    elif number > second_largest:
        second_largest = number

print("Largest number:", largest)
print("Second largest number:", second_largest)
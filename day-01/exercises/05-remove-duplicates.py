# List containing duplicate numbers
numbers = [10, 20, 10, 30, 20, 40, 30]

# Create an empty list for unique numbers
unique_numbers = []

# Check each number
for number in numbers:
    if number not in unique_numbers:
        unique_numbers.append(number)

# Display the result
print("Original list:", numbers)
print("List without duplicates:", unique_numbers)
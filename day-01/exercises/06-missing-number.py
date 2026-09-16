# List of numbers from 1 to n with one number missing
numbers = [1, 2, 3, 5, 6]

# Find n
n = len(numbers) + 1

# Calculate the expected sum from 1 to n
expected_sum = n * (n + 1) // 2

# Calculate the actual sum of the numbers
actual_sum = sum(numbers)

# The difference is the missing number
missing_number = expected_sum - actual_sum

print("Missing number:", missing_number)
# List of numbers
numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

# Start with the first number
current_sum = numbers[0]
max_sum = numbers[0]

# Check the remaining numbers
for number in numbers[1:]:
    current_sum = max(number, current_sum + number)

    if current_sum > max_sum:
        max_sum = current_sum

print("Maximum subarray sum:", max_sum)
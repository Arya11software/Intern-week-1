# List of numbers
numbers = [64, 34, 25, 12, 22, 11, 90]

# Get the length of the list
n = len(numbers)

# Repeat the comparison process
for i in range(n):
    for j in range(0, n - i - 1):

        # Swap if the current number is greater
        # than the next number
        if numbers[j] > numbers[j + 1]:
            numbers[j], numbers[j + 1] = numbers[j + 1], numbers[j]

print("Sorted list:", numbers)
# List containing one duplicate number
numbers = [1, 3, 4, 2, 2]

# Create an empty set to keep track of numbers we have seen
seen = set()

# Find the duplicate
for number in numbers:
    if number in seen:
        duplicate = number
        break

    seen.add(number)

print("Duplicate number:", duplicate)
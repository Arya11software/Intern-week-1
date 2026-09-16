# Two lists
list1 = [1, 2, 3, 4, 5]
list2 = [3, 4, 5, 6, 7]

# Store common elements
common = []

# Check each element of the first list
for number in list1:
    if number in list2 and number not in common:
        common.append(number)

print("Common elements:", common)
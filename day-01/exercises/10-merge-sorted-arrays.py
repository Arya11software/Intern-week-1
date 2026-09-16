# Two sorted lists
list1 = [1, 3, 5, 7]
list2 = [2, 4, 6, 8]

# Create an empty list for the result
merged = []

# Pointers for both lists
i = 0
j = 0

# Compare elements from both lists
while i < len(list1) and j < len(list2):
    if list1[i] < list2[j]:
        merged.append(list1[i])
        i += 1
    else:
        merged.append(list2[j])
        j += 1

# Add remaining elements from list1
while i < len(list1):
    merged.append(list1[i])
    i += 1

# Add remaining elements from list2
while j < len(list2):
    merged.append(list2[j])
    j += 1

print("Merged array:", merged)

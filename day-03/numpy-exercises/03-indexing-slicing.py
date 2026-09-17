import numpy as np

# Create a NumPy array
numbers = np.array([10, 20, 30, 40, 50])

# Access the first element using index 0
print("First element:", numbers[0])

# Access the third element using index 2
# NumPy uses zero-based indexing
print("Third element:", numbers[2])

# Get the first three elements
# Start from index 0 and stop before index 3
print("First three elements:", numbers[:3])

# Get the last two elements
# -2 means the second-last element
print("Last two elements:", numbers[-2:])
import pandas as pd

# Create a dictionary containing employee information
data = {
    "name": ["Rahul", "Priya", "Amit", "Neha"],
    "department": ["IT", "HR", "IT", "Finance"],
    "salary": [400000, 300000, 250000, 450000]
}

# Convert the dictionary into a Pandas DataFrame
df = pd.DataFrame(data)

# Display the complete DataFrame
print("Employee Data:")
print(df)

# Display the first two rows
print("\nFirst two rows:")
print(df.head(2))

# Display the column names
print("\nColumn names:")
print(df.columns)

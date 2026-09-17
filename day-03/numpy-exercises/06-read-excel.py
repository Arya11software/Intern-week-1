import pandas as pd

# Read the Excel dataset
# Replace the path with the actual location of your provided .xlsx file
df = pd.read_excel("..\dataset/facility_hygiene_ml_dataset.xlsx")

# Display the complete dataset
print("Facility Hygiene Data:")
print(df)

# Display the first 5 rows
print("\nFirst 5 rows:")
print(df.head())

# Display the number of rows and columns
print("\nDataset Shape:")
print(df.shape)

# Display the column names
print("\nColumn Names:")
print(df.columns)
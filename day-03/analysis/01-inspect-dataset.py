import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Display the first 5 records
print("First 5 rows:")
print(df.head())

# Display the last 5 records
print("\nLast 5 rows:")
print(df.tail())

# Display the number of rows and columns
print("\nDataset shape:")
print(df.shape)

# Display all column names
print("\nColumn names:")
print(df.columns.tolist())

# Display information about columns and data types
print("\nDataset information:")
df.info()

# Count missing values in each column
print("\nMissing values:")
print(df.isnull().sum())

# Count duplicate rows
print("\nDuplicate rows:")
print(df.duplicated().sum())

# Display statistical summary of numerical columns
print("\nStatistical summary:")
print(df.describe())

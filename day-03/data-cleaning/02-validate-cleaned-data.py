import pandas as pd

# Read the cleaned dataset
df = pd.read_excel("cleaned_facility_hygiene_dataset.xlsx")

# Display the number of rows and columns
print("Dataset shape:")
print(df.shape)

# Check for missing values
print("\nMissing values:")
print(df.isnull().sum())

# Check for duplicate rows
print("\nDuplicate rows:")
print(df.duplicated().sum())

# Check the data types of all columns
print("\nData types:")
print(df.dtypes)

# Display the first 5 cleaned records
print("\nFirst 5 cleaned records:")
print(df.head())
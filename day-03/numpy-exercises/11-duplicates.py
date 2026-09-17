import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Check whether each row is a duplicate
duplicate_rows = df[df.duplicated()]

print("Duplicate rows:")
print(duplicate_rows)

# Count the total number of duplicate rows
print("\nNumber of duplicate rows:", df.duplicated().sum())

# Create a copy of the dataset
cleaned_df = df.copy()

# Remove duplicate rows
cleaned_df = cleaned_df.drop_duplicates()

# Compare the number of rows before and after removing duplicates
print("\nRows before removing duplicates:", len(df))
print("Rows after removing duplicates:", len(cleaned_df))
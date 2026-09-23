import pandas as pd

# Load the provided facility hygiene dataset
df = pd.read_excel(
    "../dataset/facility_hygiene_ml_dataset.xlsx"
)

# Display basic information
print("=" * 60)
print("DAY 4 - DATASET INSPECTION")
print("=" * 60)

print("\nDataset Shape:")
print(df.shape)

print("\nColumn Names:")
print(df.columns.tolist())

print("\nFirst 5 Records:")
print(df.head())

print("\nData Types:")
print(df.dtypes)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nDuplicate Rows:")
print(df.duplicated().sum())

print("\nUnique Values:")
for column in df.columns:
    print(f"\n{column}:")
    print(df[column].unique())
import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Display the original number of rows
print("Original rows:", len(df))

# Remove completely duplicate rows
df = df.drop_duplicates()

print("Rows after removing duplicates:", len(df))

# Fill missing numerical values with the column median
# Median is less affected by extreme values than the mean
df["cleanliness_score"] = df["cleanliness_score"].fillna(
    df["cleanliness_score"].median()
)

# Fill missing categorical values with the most frequent value
df["waste_level"] = df["waste_level"].fillna(
    df["waste_level"].mode()[0]
)

df["water_availability"] = df["water_availability"].fillna(
    df["water_availability"].mode()[0]
)

# Convert inspection_date to datetime format
df["inspection_date"] = pd.to_datetime(
    df["inspection_date"],
    errors="coerce"
)

# Check remaining missing values
print("\nMissing values after cleaning:")
print(df.isnull().sum())

# Save the cleaned dataset
output_file = "cleaned_facility_hygiene_dataset.xlsx"

df.to_excel(output_file, index=False)

print("\nCleaned dataset saved as:", output_file)

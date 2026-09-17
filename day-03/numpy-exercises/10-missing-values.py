import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Count missing values in every column
print("Missing values in each column:")
print(df.isnull().sum())

# Display rows that contain at least one missing value
print("\nRows containing missing values:")
print(df[df.isnull().any(axis=1)])

# Create a copy so the original DataFrame is not changed
cleaned_df = df.copy()

# Fill missing cleanliness scores with the column average
cleaned_df["cleanliness_score"] = cleaned_df["cleanliness_score"].fillna(
    cleaned_df["cleanliness_score"].mean()
)

# Fill missing waste levels with the most frequent value
cleaned_df["waste_level"] = cleaned_df["waste_level"].fillna(
    cleaned_df["waste_level"].mode()[0]
)

# Fill missing water availability with the most frequent value
cleaned_df["water_availability"] = cleaned_df["water_availability"].fillna(
    cleaned_df["water_availability"].mode()[0]
)

# Check missing values again after cleaning
print("\nMissing values after cleaning:")
print(cleaned_df.isnull().sum())
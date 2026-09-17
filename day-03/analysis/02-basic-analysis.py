import pandas as pd

# Read the cleaned dataset
df = pd.read_excel("../data-cleaning/cleaned_facility_hygiene_dataset.xlsx")

# Display basic information
print("Dataset shape:")
print(df.shape)

# Calculate average cleanliness score
average_cleanliness = df["cleanliness_score"].mean()

print("\nAverage cleanliness score:")
print(average_cleanliness)

# Calculate average odor score
average_odor = df["odor_score"].mean()

print("\nAverage odor score:")
print(average_odor)

# Calculate total complaints
total_complaints = df["complaints"].sum()

print("\nTotal complaints:")
print(total_complaints)

# Find the facility type with the highest average cleanliness
cleanliness_by_type = (
    df.groupby("facility_type")["cleanliness_score"]
    .mean()
    .sort_values(ascending=False)
)

print("\nAverage cleanliness by facility type:")
print(cleanliness_by_type)

# Find the facility type with the highest average complaints
complaints_by_type = (
    df.groupby("facility_type")["complaints"]
    .mean()
    .sort_values(ascending=False)
)

print("\nAverage complaints by facility type:")
print(complaints_by_type)

# Display the numerical correlation matrix
print("\nCorrelation matrix:")
print(df.select_dtypes(include="number").corr())
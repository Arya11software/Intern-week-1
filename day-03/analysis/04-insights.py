import pandas as pd

# Read the cleaned dataset
df = pd.read_excel(
    "../data-cleaning/cleaned_facility_hygiene_dataset.xlsx"
)

# --------------------------------------------------
# 1. Cleanliness by facility type
# --------------------------------------------------

cleanliness_by_type = (
    df.groupby("facility_type")["cleanliness_score"]
    .mean()
    .sort_values(ascending=False)
)

print("Average Cleanliness Score by Facility Type:")
print(cleanliness_by_type)


# --------------------------------------------------
# 2. Complaints by facility type
# --------------------------------------------------

complaints_by_type = (
    df.groupby("facility_type")["complaints"]
    .mean()
    .sort_values(ascending=False)
)

print("\nAverage Complaints by Facility Type:")
print(complaints_by_type)


# --------------------------------------------------
# 3. Hygiene risk distribution
# --------------------------------------------------

risk_distribution = df["hygiene_risk"].value_counts()

print("\nHygiene Risk Distribution:")
print(risk_distribution)


# --------------------------------------------------
# 4. Water availability distribution
# --------------------------------------------------

water_distribution = df["water_availability"].value_counts()

print("\nWater Availability:")
print(water_distribution)


# --------------------------------------------------
# 5. Correlation between footfall and complaints
# --------------------------------------------------

footfall_complaints_correlation = df[
    ["footfall", "complaints"]
].corr().iloc[0, 1]

print("\nFootfall vs Complaints Correlation:")
print(footfall_complaints_correlation)


# --------------------------------------------------
# 6. Average hours since cleaning
# --------------------------------------------------

average_hours = df["hours_since_cleaning"].mean()

print("\nAverage Hours Since Cleaning:")
print(average_hours)
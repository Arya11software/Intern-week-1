import pandas as pd

# --------------------------------------------------
# Load the cleaned dataset
# --------------------------------------------------

df = pd.read_excel(
    "../data-cleaning/cleaned_facility_hygiene_dataset.xlsx"
)

print("=" * 60)
print("FACILITY HYGIENE DATA ANALYSIS")
print("=" * 60)


# --------------------------------------------------
# 1. Dataset Overview
# --------------------------------------------------

print("\n1. DATASET OVERVIEW")

print("Number of records:", len(df))
print("Number of columns:", len(df.columns))

print("\nColumns:")
print(df.columns.tolist())


# --------------------------------------------------
# 2. Basic Statistics
# --------------------------------------------------

print("\n2. BASIC STATISTICS")

print("\nNumerical statistics:")
print(df.describe())


# --------------------------------------------------
# 3. Average Hygiene Scores
# --------------------------------------------------

print("\n3. AVERAGE HYGIENE SCORES")

print(
    "Average cleanliness score:",
    df["cleanliness_score"].mean()
)

print(
    "Average odor score:",
    df["odor_score"].mean()
)

print(
    "Average hours since cleaning:",
    df["hours_since_cleaning"].mean()
)


# --------------------------------------------------
# 4. Complaints
# --------------------------------------------------

print("\n4. COMPLAINT ANALYSIS")

print("Total complaints:", df["complaints"].sum())
print("Average complaints:", df["complaints"].mean())
print("Maximum complaints:", df["complaints"].max())


# --------------------------------------------------
# 5. Facility Type Analysis
# --------------------------------------------------

print("\n5. FACILITY TYPE ANALYSIS")

facility_analysis = df.groupby("facility_type").agg(
    average_cleanliness=("cleanliness_score", "mean"),
    average_odor=("odor_score", "mean"),
    average_complaints=("complaints", "mean"),
    total_complaints=("complaints", "sum")
)

print(facility_analysis)


# --------------------------------------------------
# 6. Hygiene Risk Distribution
# --------------------------------------------------

print("\n6. HYGIENE RISK DISTRIBUTION")

risk_distribution = df["hygiene_risk"].value_counts()

print(risk_distribution)


# --------------------------------------------------
# 7. Water Availability
# --------------------------------------------------

print("\n7. WATER AVAILABILITY")

water_distribution = df["water_availability"].value_counts()

print(water_distribution)


# --------------------------------------------------
# 8. Footfall and Complaints Relationship
# --------------------------------------------------

print("\n8. FOOTFALL VS COMPLAINTS")

correlation = df[
    ["footfall", "complaints"]
].corr().iloc[0, 1]

print("Correlation:", correlation)


# --------------------------------------------------
# 9. Missing Values Check
# --------------------------------------------------

print("\n9. MISSING VALUES")

print(df.isnull().sum())


# --------------------------------------------------
# 10. Duplicate Check
# --------------------------------------------------

print("\n10. DUPLICATES")

print("Duplicate rows:", df.duplicated().sum())


print("\n" + "=" * 60)
print("ANALYSIS COMPLETED")
print("=" * 60)
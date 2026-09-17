import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Create a new column that combines location and facility type
df["facility_info"] = df["location"] + " - " + df["facility_type"]

# Create a new column that calculates the total hygiene-related
# activity using complaints and footfall
df["activity_score"] = df["complaints"] + df["footfall"]

# Convert inspection_date into Pandas datetime format
df["inspection_date"] = pd.to_datetime(df["inspection_date"])

# Extract the year from the inspection date
df["inspection_year"] = df["inspection_date"].dt.year

# Display selected columns
print("Transformed Data:")
print(
    df[
        [
            "facility_id",
            "facility_info",
            "activity_score",
            "inspection_date",
            "inspection_year"
        ]
    ].head()
)
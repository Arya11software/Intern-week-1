import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Group the facilities by facility type
# Then calculate the average cleanliness score for each type
average_cleanliness = df.groupby("facility_type")["cleanliness_score"].mean()

print("Average cleanliness score by facility type:")
print(average_cleanliness)

# Group the facilities by location
# Then calculate the average number of complaints
average_complaints = df.groupby("location")["complaints"].mean()

print("\nAverage complaints by location:")
print(average_complaints)

# Group by facility type and calculate multiple statistics
facility_summary = df.groupby("facility_type").agg(
    average_cleanliness=("cleanliness_score", "mean"),
    average_odor=("odor_score", "mean"),
    total_complaints=("complaints", "sum")
)

print("\nFacility Type Summary:")
print(facility_summary)
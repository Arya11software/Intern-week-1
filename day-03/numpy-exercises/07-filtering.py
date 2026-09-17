import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Display facilities where cleanliness score is greater than 7
high_cleanliness = df[df["cleanliness_score"] > 7]

print("Facilities with cleanliness score above 7:")
print(high_cleanliness)

# Display facilities where complaints are greater than 5
high_complaints = df[df["complaints"] > 5]

print("\nFacilities with more than 5 complaints:")
print(high_complaints)

# Display facilities where water is available
water_available = df[df["water_availability"] == "Available"]

print("\nFacilities with water available:")
print(water_available)
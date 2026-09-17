import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Sort facilities by cleanliness score from lowest to highest
sorted_cleanliness = df.sort_values("cleanliness_score")

print("Facilities sorted by cleanliness score:")
print(sorted_cleanliness[["facility_id", "cleanliness_score"]])

# Sort facilities by complaints from highest to lowest
sorted_complaints = df.sort_values("complaints", ascending=False)

print("\nFacilities sorted by complaints:")
print(sorted_complaints[["facility_id", "complaints"]])
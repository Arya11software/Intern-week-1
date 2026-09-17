import pandas as pd

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Display basic information about the dataset
print("Dataset Information:")
print(df.info())

# Display statistical summary of numerical columns
print("\nStatistical Summary:")
print(df.describe())

# Calculate the average cleanliness score
print("\nAverage Cleanliness Score:")
print(df["cleanliness_score"].mean())

# Calculate the average odor score
print("\nAverage Odor Score:")
print(df["odor_score"].mean())

# Find the highest number of complaints
print("\nHighest Number of Complaints:")
print(df["complaints"].max())

# Find the lowest number of complaints
print("\nLowest Number of Complaints:")
print(df["complaints"].min())
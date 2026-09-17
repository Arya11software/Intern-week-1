import pandas as pd
import matplotlib.pyplot as plt

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Remove missing cleanliness scores before creating the histogram
cleanliness_scores = df["cleanliness_score"].dropna()

# Create the histogram
plt.hist(cleanliness_scores, bins=10)

# Add a title
plt.title("Distribution of Cleanliness Scores")

# Label the X-axis
plt.xlabel("Cleanliness Score")

# Label the Y-axis
plt.ylabel("Number of Facilities")

# Prevent labels from being cut off
plt.tight_layout()

# Display the histogram
plt.show()
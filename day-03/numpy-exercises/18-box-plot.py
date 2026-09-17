import pandas as pd
import matplotlib.pyplot as plt

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Remove missing cleanliness scores
cleanliness_scores = df["cleanliness_score"].dropna()

# Create a box plot
plt.boxplot(cleanliness_scores)

# Add a title
plt.title("Distribution of Cleanliness Scores")

# Label the Y-axis
plt.ylabel("Cleanliness Score")

# Prevent labels from being cut off
plt.tight_layout()

# Display the box plot
plt.show()
import pandas as pd
import matplotlib.pyplot as plt

# Read the cleaned dataset
df = pd.read_excel(
    "../data-cleaning/cleaned_facility_hygiene_dataset.xlsx"
)

# Remove missing cleanliness scores
cleanliness_scores = df["cleanliness_score"].dropna()

# Create the histogram
plt.hist(
    cleanliness_scores,
    bins=10
)

# Add chart title
plt.title("Distribution of Cleanliness Scores")

# Label the X-axis
plt.xlabel("Cleanliness Score")

# Label the Y-axis
plt.ylabel("Number of Records")

# Adjust spacing
plt.tight_layout()

# Save the visualization
plt.savefig(
    "03-cleanliness-distribution.png",
    dpi=300
)

# Display the visualization
plt.show()
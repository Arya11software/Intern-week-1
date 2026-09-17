import pandas as pd
import matplotlib.pyplot as plt

# Read the cleaned dataset
df = pd.read_excel(
    "../data-cleaning/cleaned_facility_hygiene_dataset.xlsx"
)

# Calculate the average cleanliness score for each facility type
cleanliness_by_type = (
    df.groupby("facility_type")["cleanliness_score"]
    .mean()
    .sort_values(ascending=False)
)

# Create the bar chart
plt.bar(
    cleanliness_by_type.index,
    cleanliness_by_type.values
)

# Add chart title
plt.title("Average Cleanliness Score by Facility Type")

# Label the X-axis
plt.xlabel("Facility Type")

# Label the Y-axis
plt.ylabel("Average Cleanliness Score")

# Rotate category labels for readability
plt.xticks(rotation=45)

# Adjust spacing
plt.tight_layout()

# Save the visualization
plt.savefig("01-cleanliness-by-facility-type.png", dpi=300)

# Display the visualization
plt.show()

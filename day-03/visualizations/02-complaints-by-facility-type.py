import pandas as pd
import matplotlib.pyplot as plt

# Read the cleaned dataset
df = pd.read_excel(
    "../data-cleaning/cleaned_facility_hygiene_dataset.xlsx"
)

# Calculate the average number of complaints for each facility type
complaints_by_type = (
    df.groupby("facility_type")["complaints"]
    .mean()
    .sort_values(ascending=False)
)

# Create the bar chart
plt.bar(
    complaints_by_type.index,
    complaints_by_type.values
)

# Add chart title
plt.title("Average Complaints by Facility Type")

# Label the X-axis
plt.xlabel("Facility Type")

# Label the Y-axis
plt.ylabel("Average Complaints")

# Rotate category labels for readability
plt.xticks(rotation=45)

# Adjust spacing
plt.tight_layout()

# Save the visualization
plt.savefig(
    "02-complaints-by-facility-type.png",
    dpi=300
)

# Display the visualization
plt.show()

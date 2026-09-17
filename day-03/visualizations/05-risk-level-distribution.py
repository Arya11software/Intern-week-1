import pandas as pd
import matplotlib.pyplot as plt

# Read the cleaned dataset
df = pd.read_excel(
    "../data-cleaning/cleaned_facility_hygiene_dataset.xlsx"
)

# Count the number of records for each hygiene risk category
risk_counts = df["hygiene_risk"].value_counts()

# Create a bar chart
plt.bar(
    risk_counts.index,
    risk_counts.values
)

# Add chart title
plt.title("Distribution of Hygiene Risk Levels")

# Label the X-axis
plt.xlabel("Hygiene Risk Level")

# Label the Y-axis
plt.ylabel("Number of Records")

# Rotate labels if needed
plt.xticks(rotation=45)

# Adjust spacing
plt.tight_layout()

# Save the visualization
plt.savefig(
    "05-risk-level-distribution.png",
    dpi=300
)

# Display the visualization
plt.show()
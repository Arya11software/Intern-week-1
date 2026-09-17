import pandas as pd
import matplotlib.pyplot as plt

# Read the cleaned dataset
df = pd.read_excel(
    "../data-cleaning/cleaned_facility_hygiene_dataset.xlsx"
)

# Remove records where footfall or complaints is missing
scatter_data = df.dropna(
    subset=["footfall", "complaints"]
)

# Create the scatter plot
plt.scatter(
    scatter_data["footfall"],
    scatter_data["complaints"]
)

# Add chart title
plt.title("Footfall vs Complaints")

# Label the X-axis
plt.xlabel("Footfall")

# Label the Y-axis
plt.ylabel("Complaints")

# Adjust spacing
plt.tight_layout()

# Save the visualization
plt.savefig(
    "04-footfall-vs-complaints.png",
    dpi=300
)

# Display the visualization
plt.show()

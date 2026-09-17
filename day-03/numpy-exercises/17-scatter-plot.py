import pandas as pd
import matplotlib.pyplot as plt

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Remove rows where either footfall or complaints is missing
scatter_data = df.dropna(subset=["footfall", "complaints"])

# Create the scatter plot
plt.scatter(
    scatter_data["footfall"],
    scatter_data["complaints"]
)

# Add a title
plt.title("Footfall vs Complaints")

# Label the X-axis
plt.xlabel("Footfall")

# Label the Y-axis
plt.ylabel("Complaints")

# Prevent labels from being cut off
plt.tight_layout()

# Display the scatter plot
plt.show()

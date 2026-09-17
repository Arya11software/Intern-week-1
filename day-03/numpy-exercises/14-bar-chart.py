import pandas as pd
import matplotlib.pyplot as plt

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Calculate the average cleanliness score for each facility type
average_cleanliness = df.groupby("facility_type")["cleanliness_score"].mean()

# Create a bar chart
plt.bar(
    average_cleanliness.index,
    average_cleanliness.values
)

# Add a title to the chart
plt.title("Average Cleanliness Score by Facility Type")

# Label the X-axis
plt.xlabel("Facility Type")

# Label the Y-axis
plt.ylabel("Average Cleanliness Score")

# Rotate X-axis labels so they are easier to read
plt.xticks(rotation=45)

# Adjust the layout so labels do not get cut off
plt.tight_layout()

# Display the chart
plt.show()

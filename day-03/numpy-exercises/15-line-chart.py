import pandas as pd
import matplotlib.pyplot as plt

# Read the provided Excel dataset
df = pd.read_excel("../dataset/facility_hygiene_ml_dataset.xlsx")

# Convert inspection_date into datetime format
df["inspection_date"] = pd.to_datetime(df["inspection_date"])

# Group records by inspection date
# Calculate the average cleanliness score for each date
daily_cleanliness = (
    df.groupby("inspection_date")["cleanliness_score"]
    .mean()
    .sort_index()
)

# Create the line chart
plt.plot(
    daily_cleanliness.index,
    daily_cleanliness.values
)

# Add a title
plt.title("Average Cleanliness Score Over Time")

# Label the X-axis
plt.xlabel("Inspection Date")

# Label the Y-axis
plt.ylabel("Average Cleanliness Score")

# Rotate date labels for better readability
plt.xticks(rotation=45)

# Prevent labels from being cut off
plt.tight_layout()

# Display the chart
plt.show()
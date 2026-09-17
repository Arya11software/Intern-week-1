import pandas as pd

# Read the cleaned dataset
df = pd.read_excel("../data-cleaning/cleaned_facility_hygiene_dataset.xlsx")


# Function to find outliers using the IQR method
def find_outliers(column):

    # Calculate the first quartile (25th percentile)
    q1 = df[column].quantile(0.25)

    # Calculate the third quartile (75th percentile)
    q3 = df[column].quantile(0.75)

    # Calculate the Interquartile Range
    iqr = q3 - q1

    # Calculate lower and upper boundaries
    lower_limit = q1 - 1.5 * iqr
    upper_limit = q3 + 1.5 * iqr

    # Select values outside the boundaries
    outliers = df[
        (df[column] < lower_limit) |
        (df[column] > upper_limit)
    ]

    print(f"\nColumn: {column}")
    print("Q1:", q1)
    print("Q3:", q3)
    print("IQR:", iqr)
    print("Lower limit:", lower_limit)
    print("Upper limit:", upper_limit)
    print("Number of outliers:", len(outliers))

    return outliers


# Numerical columns to analyze
columns = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "footfall",
    "complaints",
    "hours_since_cleaning"
]

# Analyze each numerical column
for column in columns:
    find_outliers(column)
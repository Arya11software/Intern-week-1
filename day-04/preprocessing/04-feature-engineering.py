import pandas as pd
from sklearn.model_selection import train_test_split


# --------------------------------------------------
# 1. Load the processed dataset
# --------------------------------------------------

df = pd.read_csv(
    "../dataset/processed_facility_hygiene.csv"
)


# --------------------------------------------------
# 2. Define features and target
# --------------------------------------------------

features = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "complaints",
    "footfall",
    "hours_since_cleaning"
]

target = "hygiene_risk"


# --------------------------------------------------
# 3. Create X and y
# --------------------------------------------------

X = df[features]
y = df[target]


# --------------------------------------------------
# 4. Feature Engineering
# --------------------------------------------------

# Create a combined cleanliness-related feature.
# Higher values indicate more time has passed since
# cleaning relative to the cleanliness score.

X = X.copy()

X["cleaning_pressure"] = (
    X["hours_since_cleaning"] *
    (1 + X["complaints"])
)


# --------------------------------------------------
# 5. Display the engineered features
# --------------------------------------------------

print("=" * 60)
print("FEATURE ENGINEERING")
print("=" * 60)

print("\nFeatures after engineering:")
print(X.head())

print("\nFeature columns:")
print(X.columns.tolist())


# --------------------------------------------------
# 6. Split into training and temporary data
# --------------------------------------------------

X_train, X_temp, y_train, y_temp = train_test_split(
    X,
    y,
    test_size=0.30,
    random_state=42,
    stratify=y
)


# --------------------------------------------------
# 7. Split temporary data into validation and test
# --------------------------------------------------

X_validation, X_test, y_validation, y_test = train_test_split(
    X_temp,
    y_temp,
    test_size=0.50,
    random_state=42,
    stratify=y_temp
)


# --------------------------------------------------
# 8. Display dataset sizes
# --------------------------------------------------

print("\nDataset sizes:")

print("Total records:", len(X))

print("Training records:", len(X_train))
print("Validation records:", len(X_validation))
print("Testing records:", len(X_test))


# --------------------------------------------------
# 9. Display feature dimensions
# --------------------------------------------------

print("\nFeature dimensions:")

print("Training:", X_train.shape)
print("Validation:", X_validation.shape)
print("Testing:", X_test.shape)
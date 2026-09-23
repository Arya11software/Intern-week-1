import pandas as pd


# --------------------------------------------------
# 1. Load the dataset
# --------------------------------------------------

df = pd.read_excel(
    "../dataset/facility_hygiene_ml_dataset.xlsx"
)


# --------------------------------------------------
# 2. Select the features required by the assignment
# --------------------------------------------------

features = [
    "cleanliness_score",
    "odor_score",
    "waste_level",
    "complaints",
    "footfall",
    "hours_since_cleaning"
]


# --------------------------------------------------
# 3. Select the target
# --------------------------------------------------

target = "hygiene_risk"


# --------------------------------------------------
# 4. Create feature and target datasets
# --------------------------------------------------

X = df[features].copy()
y = df[target].copy()


# --------------------------------------------------
# 5. Display the information
# --------------------------------------------------

print("=" * 60)
print("FEATURES AND TARGET")
print("=" * 60)

print("\nFeatures (X):")
print(X.head())

print("\nTarget (y):")
print(y.head())

print("\nFeature columns:")
print(X.columns.tolist())

print("\nTarget column:")
print(y.name)

print("\nTarget values:")
print(y.value_counts(dropna=False))
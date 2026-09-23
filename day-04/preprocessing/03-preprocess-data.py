import pandas as pd
from sklearn.preprocessing import LabelEncoder


# --------------------------------------------------
# 1. Load the dataset
# --------------------------------------------------

df = pd.read_excel(
    "../dataset/facility_hygiene_ml_dataset.xlsx"
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
# 3. Create a copy containing required columns
# --------------------------------------------------

data = df[features + [target]].copy()


# --------------------------------------------------
# 4. Display missing values before cleaning
# --------------------------------------------------

print("Missing values before preprocessing:")
print(data.isnull().sum())


# --------------------------------------------------
# 5. Handle numerical missing values
# --------------------------------------------------

numerical_columns = [
    "cleanliness_score",
    "odor_score",
    "complaints",
    "footfall",
    "hours_since_cleaning"
]

for column in numerical_columns:
    data[column] = data[column].fillna(
        data[column].median()
    )


# --------------------------------------------------
# 6. Handle categorical missing values
# --------------------------------------------------

data["waste_level"] = data["waste_level"].fillna(
    data["waste_level"].mode()[0]
)

data[target] = data[target].fillna(
    data[target].mode()[0]
)


# --------------------------------------------------
# 7. Encode waste_level
# --------------------------------------------------

waste_encoder = LabelEncoder()

data["waste_level"] = waste_encoder.fit_transform(
    data["waste_level"]
)


# --------------------------------------------------
# 8. Encode hygiene_risk
# --------------------------------------------------

risk_encoder = LabelEncoder()

data[target] = risk_encoder.fit_transform(
    data[target]
)


# --------------------------------------------------
# 9. Display preprocessing results
# --------------------------------------------------

print("\nMissing values after preprocessing:")
print(data.isnull().sum())

print("\nProcessed dataset:")
print(data.head())

print("\nWaste level mapping:")
for value, encoded_value in zip(
    waste_encoder.classes_,
    waste_encoder.transform(waste_encoder.classes_)
):
    print(value, "->", encoded_value)

print("\nHygiene risk mapping:")
for value, encoded_value in zip(
    risk_encoder.classes_,
    risk_encoder.transform(risk_encoder.classes_)
):
    print(value, "->", encoded_value)


# --------------------------------------------------
# 10. Save processed dataset
# --------------------------------------------------

data.to_csv(
    "../dataset/processed_facility_hygiene.csv",
    index=False
)

print("\nProcessed dataset saved successfully.")
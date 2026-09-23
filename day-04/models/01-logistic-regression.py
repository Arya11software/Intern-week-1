import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


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

X = df[features].copy()
y = df[target]


# --------------------------------------------------
# 4. Feature engineering
# --------------------------------------------------

X["cleaning_pressure"] = (
    X["hours_since_cleaning"] *
    (1 + X["complaints"])
)


# --------------------------------------------------
# 5. Split the dataset
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# --------------------------------------------------
# 6. Create the Logistic Regression model
# --------------------------------------------------

model = LogisticRegression(
    max_iter=1000
)


# --------------------------------------------------
# 7. Train the model
# --------------------------------------------------

model.fit(
    X_train,
    y_train
)


# --------------------------------------------------
# 8. Make predictions
# --------------------------------------------------

y_pred = model.predict(X_test)


# --------------------------------------------------
# 9. Evaluate the model
# --------------------------------------------------

accuracy = accuracy_score(
    y_test,
    y_pred
)


# --------------------------------------------------
# 10. Display results
# --------------------------------------------------

print("=" * 60)
print("LOGISTIC REGRESSION")
print("=" * 60)

print("\nTraining records:", len(X_train))
print("Testing records:", len(X_test))

print("\nAccuracy:", round(accuracy, 4))

print("\nActual values:")
print(y_test.values)

print("\nPredicted values:")
print(y_pred)
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier


# --------------------------------------------------
# 1. Load processed dataset
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
# 5. Split dataset
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# --------------------------------------------------
# 6. Create models
# --------------------------------------------------

logistic_model = LogisticRegression(
    max_iter=1000
)

decision_tree_model = DecisionTreeClassifier(
    max_depth=5,
    random_state=42
)


# --------------------------------------------------
# 7. Train models
# --------------------------------------------------

logistic_model.fit(
    X_train,
    y_train
)

decision_tree_model.fit(
    X_train,
    y_train
)


# --------------------------------------------------
# 8. Generate predictions
# --------------------------------------------------

logistic_predictions = logistic_model.predict(
    X_test
)

tree_predictions = decision_tree_model.predict(
    X_test
)


# --------------------------------------------------
# 9. Create prediction DataFrame
# --------------------------------------------------

predictions = pd.DataFrame({
    "actual_hygiene_risk": y_test.values,
    "logistic_regression_prediction": logistic_predictions,
    "decision_tree_prediction": tree_predictions
})


# --------------------------------------------------
# 10. Save predictions
# --------------------------------------------------

predictions.to_csv(
    "../predictions/model_predictions.csv",
    index=False
)


# --------------------------------------------------
# 11. Display results
# --------------------------------------------------

print("=" * 60)
print("MODEL PREDICTIONS")
print("=" * 60)

print("\nPredictions:")
print(predictions)

print("\nPredictions saved to:")
print("../predictions/model_predictions.csv")
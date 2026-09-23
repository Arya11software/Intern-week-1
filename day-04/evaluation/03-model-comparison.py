import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)


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
# 3. Create features and target
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
# 6. Create models
# --------------------------------------------------

models = {
    "Logistic Regression": LogisticRegression(
        max_iter=1000
    ),

    "Decision Tree": DecisionTreeClassifier(
        max_depth=5,
        random_state=42
    )
}


# --------------------------------------------------
# 7. Store comparison results
# --------------------------------------------------

results = []


# --------------------------------------------------
# 8. Train and evaluate each model
# --------------------------------------------------

for name, model in models.items():

    # Train model
    model.fit(X_train, y_train)

    # Generate predictions
    predictions = model.predict(X_test)

    # Calculate metrics
    accuracy = accuracy_score(
        y_test,
        predictions
    )

    precision = precision_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    recall = recall_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    # Add results
    results.append({
        "Model": name,
        "Accuracy": accuracy,
        "Precision": precision,
        "Recall": recall,
        "F1 Score": f1
    })


# --------------------------------------------------
# 9. Create comparison table
# --------------------------------------------------

comparison = pd.DataFrame(results)


# --------------------------------------------------
# 10. Display comparison
# --------------------------------------------------

print("=" * 70)
print("MODEL COMPARISON")
print("=" * 70)

print(
    comparison.to_string(
        index=False,
        float_format=lambda value: f"{value:.4f}"
    )
)


# --------------------------------------------------
# 11. Save comparison
# --------------------------------------------------

comparison.to_csv(
    "model_comparison.csv",
    index=False
)

print("\nComparison saved to:")
print("evaluation/model_comparison.csv")
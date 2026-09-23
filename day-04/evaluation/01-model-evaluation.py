import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
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
# 7. Train Logistic Regression
# --------------------------------------------------

logistic_model.fit(
    X_train,
    y_train
)

logistic_predictions = logistic_model.predict(
    X_test
)


# --------------------------------------------------
# 8. Train Decision Tree
# --------------------------------------------------

decision_tree_model.fit(
    X_train,
    y_train
)

tree_predictions = decision_tree_model.predict(
    X_test
)


# --------------------------------------------------
# 9. Evaluation function
# --------------------------------------------------

def evaluate_model(name, actual, predictions):

    print("\n" + "=" * 60)
    print(name)
    print("=" * 60)

    accuracy = accuracy_score(
        actual,
        predictions
    )

    precision = precision_score(
        actual,
        predictions,
        average="weighted",
        zero_division=0
    )

    recall = recall_score(
        actual,
        predictions,
        average="weighted",
        zero_division=0
    )

    f1 = f1_score(
        actual,
        predictions,
        average="weighted",
        zero_division=0
    )

    matrix = confusion_matrix(
        actual,
        predictions
    )

    print("\nAccuracy:", round(accuracy, 4))
    print("Precision:", round(precision, 4))
    print("Recall:", round(recall, 4))
    print("F1 Score:", round(f1, 4))

    print("\nConfusion Matrix:")
    print(matrix)


# --------------------------------------------------
# 10. Evaluate both models
# --------------------------------------------------

evaluate_model(
    "LOGISTIC REGRESSION",
    y_test,
    logistic_predictions
)

evaluate_model(
    "DECISION TREE",
    y_test,
    tree_predictions
)
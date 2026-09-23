# Assignment 4 - Machine Learning for Facility Hygiene Risk

## Objective

Build a machine learning system that predicts facility hygiene risk using operational and hygiene-related features.

## Dataset

The project uses the provided facility hygiene dataset.

### Input Features

- cleanliness_score
- odor_score
- waste_level
- complaints
- footfall
- hours_since_cleaning

### Target

- hygiene_risk

## Project Workflow

           Raw Dataset
                |
                v
         Dataset Inspection
                |
                v
         Data Preprocessing
                |
                v
       Missing Value Handling
                |
                v
        Categorical Encoding
                |
                v
        Feature Engineering
                |
                v
         Train/Test Split
                |
     +----------------------+
     |                      |
     v                      v

Logistic Regression Decision Tree
| |
+----------+-----------+
|
v
Model Evaluation
|
v
Prediction Results

## Preprocessing

The dataset was processed using:

Pandas
Missing value handling
Label encoding for categorical values
Feature selection
Feature Engineering

An additional feature called cleaning_pressure was created using:

hours_since_cleaning × (1 + complaints)
Machine Learning Models

## Two classification algorithms were implemented:

1. Logistic Regression

Used as a linear classification model for predicting hygiene risk.

2. Decision Tree

Used as a tree-based classification model.

The tree depth was limited to reduce the possibility of overfitting.

## Model Evaluation

The models are evaluated using:

Accuracy
Precision
Recall
F1 Score
Confusion Matrix

## The comparison results are stored in:

evaluation/model_comparison.csv
Prediction Output

## Model predictions are stored in:

predictions/model_predictions.csv
Folder Structure
day-04/
│
├── dataset/
│ ├── facility_hygiene_ml_dataset.xlsx
│ └── processed_facility_hygiene.csv
│
├── preprocessing/
│ ├── 01-inspect-dataset.py
│ ├── 02-prepare-data.py
│ ├── 03-preprocess-data.py
│ └── 04-feature-engineering.py
│
├── models/
│ ├── 01-logistic-regression.py
│ └── 02-decision-tree.py
│
├── evaluation/
│ ├── 01-model-evaluation.py
│ ├── 02-save-predictions.py
│ ├── 03-model-comparison.py
│ └── model_comparison.csv
│
├── predictions/
│ └── model_predictions.csv
│
└── README.md

## Technologies Used

Python
Pandas
NumPy
Scikit-learn
OpenPyXL
How to Run

## Activate the virtual environment:

.\.venv\Scripts\Activate.ps1

## Install dependencies:

pip install -r ..\requirements.txt

## Run dataset preprocessing:

cd preprocessing
python 03-preprocess-data.py

## Run Logistic Regression:

cd ..\models
python 01-logistic-regression.py

## Run Decision Tree:

python 02-decision-tree.py

## Run model evaluation:

cd ..\evaluation
python 01-model-evaluation.py

## Generate predictions:

python 02-save-predictions.py

## Generate model comparison:

python 03-model-comparison.py

Save with **Ctrl + S** and close Notepad.

### Verify

Run:

```powershell
Get-Item .\README.md | Select-Object Name,Length

The file should have a size greater than 0.

Then:

git status
```

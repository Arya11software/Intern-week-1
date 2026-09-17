# Day 3 — Data Analysis & Python for AI/ML

## Project Overview

This project focuses on data analysis and visualization using Python.

The provided Facility Hygiene dataset was inspected, cleaned, analyzed, and visualized using NumPy, Pandas, and Matplotlib.

---

## Dataset

The project uses the provided:

`facility_hygiene_ml_dataset.xlsx`

The dataset contains facility hygiene inspection records.

Important fields include:

- facility_id
- location
- facility_type
- cleanliness_score
- odor_score
- waste_level
- water_availability
- footfall
- complaints
- inspection_date
- hours_since_cleaning
- hygiene_risk

---

## Technologies Used

- Python
- NumPy
- Pandas
- Matplotlib
- OpenPyXL

---

## Project Structure

```text
day-03/
├── dataset/
│   └── facility_hygiene_ml_dataset.xlsx
│
├── data-cleaning/
│   ├── 01-clean-dataset.py
│   ├── 02-validate-cleaned-data.py
│   └── cleaned_facility_hygiene_dataset.xlsx
│
├── analysis/
│   ├── 01-inspect-dataset.py
│   ├── 02-basic-analysis.py
│   ├── 03-outlier-analysis.py
│   ├── 04-insights.py
│   └── 05-final-analysis.py
│
├── numpy-exercises/
│   ├── 01-arrays.py
│   ├── 02-shape-dimensions.py
│   ├── 03-indexing-slicing.py
│   ├── 04-mathematical-operations.py
│   ├── 05-pandas-dataframe.py
│   ├── 06-read-excel.py
│   ├── 07-filtering.py
│   ├── 08-sorting.py
│   ├── 09-grouping-aggregation.py
│   ├── 10-missing-values.py
│   ├── 11-duplicates.py
│   ├── 12-data-transformation.py
│   ├── 13-statistics.py
│   ├── 14-bar-chart.py
│   ├── 15-line-chart.py
│   ├── 16-histogram.py
│   ├── 17-scatter-plot.py
│   └── 18-box-plot.py
│
├── visualizations/
│   ├── 01-cleanliness-by-facility-type.py
│   ├── 01-cleanliness-by-facility-type.png
│   ├── 02-complaints-by-facility-type.py
│   ├── 02-complaints-by-facility-type.png
│   ├── 03-cleanliness-distribution.py
│   ├── 03-cleanliness-distribution.png
│   ├── 04-footfall-vs-complaints.py
│   ├── 04-footfall-vs-complaints.png
│   ├── 05-risk-level-distribution.py
│   └── 05-risk-level-distribution.png
│
└── README.md
```

# Data Cleaning

The dataset was checked for:

Missing values
Duplicate records
Data types
Date formatting
Numerical data

Missing numerical values were handled using the median, while categorical missing values were handled using the mode.

Duplicate records were removed.

The original dataset was preserved and a separate cleaned dataset was generated.

# Data Analysis

The analysis includes:

Dataset statistics
Average cleanliness score
Average odor score
Complaint statistics
Facility-type comparison
Hygiene risk distribution
Water availability distribution
Footfall and complaints correlation
Outlier analysis

# Visualizations

The following visualizations were created:

Average Cleanliness Score by Facility Type
Average Complaints by Facility Type
Distribution of Cleanliness Scores
Footfall vs Complaints
Distribution of Hygiene Risk Levels

# Key Insights

Add the actual findings obtained from 04-insights.py here.

## Insight 1

Write the actual finding based on the facility-type cleanliness results.

## Insight 2

Write the actual finding based on the complaint analysis.

## Insight 3

Write the actual finding based on the hygiene-risk distribution.

# How to Run

Activate the virtual environment:

.venv\Scripts\activate

Install dependencies:

pip install numpy pandas matplotlib openpyxl

Run the analysis:

python analysis/05-final-analysis.py

Run individual visualization scripts from the visualizations directory.

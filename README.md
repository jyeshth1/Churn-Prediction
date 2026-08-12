# ChurnSight

**ChurnSight** is a customer churn prediction tool designed to help businesses identify customers who are at risk of leaving. The tool uses customer-related data and a machine learning model to generate churn predictions and support data-driven retention decisions.

## 🚀 Features

* Customer churn prediction
* Machine learning-based risk classification
* Customer data input and preprocessing
* Churn probability/risk assessment
* Simple and user-friendly interface
* Visual insights for understanding churn risk
* Helps identify customers who may require retention efforts

## 🛠️ Tech Stack

* **Python**
* **Pandas** — Data processing
* **NumPy** — Numerical operations
* **Scikit-learn** — Machine learning
* **Streamlit** — Web application interface
* **Matplotlib / Seaborn** — Data visualization

## 📁 Project Structure

```text
ChurnSight/
│
├── app.py                  # Main Streamlit application
├── model/                  # Trained ML model files
├── data/                   # Dataset(s)
├── notebooks/              # Model development and experiments
├── assets/                 # Images and other application assets
├── requirements.txt        # Python dependencies
├── README.md               # Project documentation
└── .gitignore              # Files ignored by Git
```

## 🔄 Workflow

The ChurnSight workflow follows these steps:

```text
Customer Data
      ↓
Data Preprocessing
      ↓
Feature Engineering
      ↓
Trained ML Model
      ↓
Churn Prediction
      ↓
Risk / Probability
      ↓
Business Retention Action
```

### 1. Customer Data

Customer information is provided to the application, such as:

* Customer demographics
* Account information
* Subscription details
* Usage behavior
* Contract information
* Payment information

### 2. Data Preprocessing

The input data is cleaned and transformed into the format expected by the machine learning model.

Typical preprocessing includes:

* Handling missing values
* Encoding categorical variables
* Scaling numerical features
* Selecting relevant features

### 3. Prediction

The processed customer information is passed to the trained machine learning model.

The model predicts whether the customer is likely to churn and can provide a churn probability or risk score.

### 4. Result

ChurnSight presents the prediction through the application interface.

Example:

```text
Customer: CUST001

Churn Risk: HIGH
Churn Probability: 82%

Recommendation:
Consider contacting the customer with a retention offer.
```

### 5. Business Action

The prediction can be used to prioritize retention activities.

```text
HIGH RISK    → Immediate retention action
MEDIUM RISK  → Monitor and engage
LOW RISK     → Continue normal engagement
```

## 💻 How to Run ChurnSight Locally

### Prerequisites

Make sure you have installed:

* Python 3.9+
* Git
* pip

### Clone the Repository

```bash
git clone https://github.com/jyeshth1/Churn-Predictionight.git
cd Churn-Prediction
```

### Create a Virtual Environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Application

URL: https://churnsight.onrender.com

Open that address in your browser to access ChurnSight.

## 🌐 How to Access the Deployed Version

If ChurnSight is deployed on Streamlit Cloud:

1. Open the deployed ChurnSight URL.
2. Wait for the application to load.
3. Enter or upload the required customer information.
4. Submit the information.
5. View the predicted churn risk and probability.
6. Use the result to identify customers who may need retention attention.

### Deployment Workflow

```text
GitHub Repository
       ↓
Streamlit Cloud
       ↓
Install requirements.txt
       ↓
Run app.py
       ↓
Public ChurnSight URL
       ↓
User accesses prediction tool
```

## 📊 Example Use Case

A telecom company wants to identify customers who are likely to cancel their subscriptions.

The company provides customer information to ChurnSight.

```text
Customer Information
        ↓
ChurnSight
        ↓
Machine Learning Model
        ↓
Churn Probability
        ↓
High-Risk Customer Identified
        ↓
Retention Campaign
```

This allows the business to focus retention resources on customers with a higher likelihood of churn.

## 🔐 Data & Privacy

Do not upload sensitive or personally identifiable customer information to a public deployment unless appropriate security, privacy, and data-processing controls are in place.

For demonstrations and development, use anonymized or synthetic customer data.

## 📌 Future Improvements

* Real-time customer predictions
* Customer segmentation
* Automated retention recommendations
* Model performance dashboard
* Feature importance visualization
* Batch prediction through CSV upload
* Model monitoring
* Automated model retraining
* Integration with CRM systems

## 🤝 Contributing

Contributions are welcome.

```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

Then create a pull request on GitHub.

## 📄 License

This project can be released under the **MIT License** or another license appropriate for your project.

---

## ⭐ ChurnSight

**ChurnSight — Predict churn. Identify risk. Retain customers.**



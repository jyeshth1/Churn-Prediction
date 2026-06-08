from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import numpy as np
import os
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Load model artifacts
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, 'models', 'Random_Forest_churn.pkl'))
scaler = joblib.load(os.path.join(BASE_DIR, 'models', 'scaler.pkl'))
columns = joblib.load(os.path.join(BASE_DIR, 'models', 'columns.pkl'))

# Encoding maps derived from LabelEncoder alphabetical sorting
# MultipleLines: No=0, No phone service=1, Yes=2
# InternetService: DSL=0, Fiber optic=1, No=2
# OnlineSecurity/OnlineBackup/DeviceProtection/TechSupport/StreamingTV/StreamingMovies:
#   No=0, No internet service=1, Yes=2
# Contract: Month-to-month=0, One year=1, Two year=2
# PaymentMethod: Bank transfer (automatic)=0, Credit card (automatic)=1, Electronic check=2, Mailed check=3

ENCODING = {
    'gender': {'Male': 1, 'Female': 0},
    'Partner': {'Yes': 1, 'No': 0},
    'Dependents': {'Yes': 1, 'No': 0},
    'PhoneService': {'Yes': 1, 'No': 0},
    'PaperlessBilling': {'Yes': 1, 'No': 0},
    'MultipleLines': {'No': 0, 'No phone service': 1, 'Yes': 2},
    'InternetService': {'DSL': 0, 'Fiber optic': 1, 'No': 2},
    'OnlineSecurity': {'No': 0, 'No internet service': 1, 'Yes': 2},
    'OnlineBackup': {'No': 0, 'No internet service': 1, 'Yes': 2},
    'DeviceProtection': {'No': 0, 'No internet service': 1, 'Yes': 2},
    'TechSupport': {'No': 0, 'No internet service': 1, 'Yes': 2},
    'StreamingTV': {'No': 0, 'No internet service': 1, 'Yes': 2},
    'StreamingMovies': {'No': 0, 'No internet service': 1, 'Yes': 2},
    'Contract': {'Month-to-month': 0, 'One year': 1, 'Two year': 2},
    'PaymentMethod': {
        'Bank transfer (automatic)': 0,
        'Credit card (automatic)': 1,
        'Electronic check': 2,
        'Mailed check': 3
    }
}

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/style.css')
# def serve_css():
#     return send_from_directory('.', 'style.css')

# @app.route('/script.js')
# def serve_js():
#     return send_from_directory('.', 'script.js')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Build feature vector in column order
        features = []
        for col in columns:
            val = data.get(col)
            if col in ENCODING:
                features.append(ENCODING[col][val])
            else:
                features.append(float(val))
        
        X = np.array(features).reshape(1, -1)
        X_scaled = scaler.transform(X)
        
        prediction = model.predict(X_scaled)[0]
        probability = model.predict_proba(X_scaled)[0]
        
        churn_prob = float(probability[1])
        
        return jsonify({
            'prediction': int(prediction),
            'churn_probability': round(churn_prob * 100, 1),
            'stay_probability': round((1 - churn_prob) * 100, 1),
            'risk_level': 'High' if churn_prob > 0.65 else ('Medium' if churn_prob > 0.35 else 'Low')
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)

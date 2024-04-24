from flask import Flask, render_template, request, send_file, Response
import firebase_admin
from firebase_admin import credentials, firestore
import csv
from io import StringIO

# Initialize Flask app
app = Flask(__name__)

# Firebase credentials
cred = credentials.Certificate('serviceAccount.json')
firebase_admin.initialize_app(cred)

# Initialize Firestore database
db = firestore.client()

# Route to export data to CSV
@app.route('/Jobs')
def Jobs():
    try:
        # Get Firestore collection data
        collection_ref = db.collection('iamvirad09@gmail.com')
        docs = collection_ref.stream()

        # Prepare CSV data
        csv_data = StringIO()
        csv_writer = csv.writer(csv_data)
        csv_writer.writerow(['companyName', 'date', 'jobTitle', 'Status'])  # CSV header
        for doc in docs:
            data = doc.to_dict()
            csv_writer.writerow([data.get('companyName', ''), data.get('date', ''), data.get('jobTitle', ''), data.get('status', '')])

        # Return CSV file
        csv_data.seek(0)
        return Response(csv_data, mimetype='text/csv')

    except Exception as e:
        return str(e)
# Route for the HTML page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

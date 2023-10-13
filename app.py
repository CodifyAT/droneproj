from flask import Flask, request, jsonify,render_template
import json
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    if request.method == 'POST':
        data = request.get_json()
        # Process the data (e.g., save to a database, perform calculations)
        # In this example, we'll just echo the data back
        print(data)
        return data
if __name__ == '__main__':
    app.run()

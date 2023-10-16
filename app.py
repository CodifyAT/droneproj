from flask import Flask, render_template, request,jsonify
import time
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("main.html")

@app.route("/startMission")
def startmission():
    return render_template("Test.html")
@app.route("/", methods=["POST"])
def process_data():
    if request.method == 'POST':
        from RunCommand import command
        data = request.get_json()
        command(str(data[0]['lat']), str(data[0]['lng']))
        time.sleep(8)
    #altitude = request.form.get("altitude")
    #airspeed = request.form.get("airspeed")
    #groundspeed = request.form.get("groundspeed")
        from Test import fly
        fly(data,20, float(20.0), float(3.0))
        return list(data)
if __name__ == "__main__":
    app.run()

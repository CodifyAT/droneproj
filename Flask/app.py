from flask import Flask, render_template, request
from RunCommand import command
from Test import fly
import time
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("hello.html")

@app.route("/", methods=["POST"])
def submit():
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")
    command(latitude, longitude)
    time.sleep(8)
    altitude = request.form.get("altitude")
    airspeed = request.form.get("airspeed")
    groundspeed = request.form.get("groundspeed")
    lat1 = latitude
    lon1 = longitude
    lat2 = request.form.get("lat2")
    lon2 = request.form.get("lon2")
    lat3 = request.form.get("lat3")
    lon3 = request.form.get("lon3")
    fly(float(altitude), float(airspeed), float(groundspeed), float(lat1), float(lon1), float(lat2), float(lon2), float(lat3), float(lon3))
    return render_template('hello.html')

if __name__ == "__main__":
    app.run()

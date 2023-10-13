from __future__ import print_function
import time
from dronekit import connect, VehicleMode, LocationGlobalRelative
def fly(data,altitude,groundspeed,airspeed):
    connection_string = 'udp:127.0.0.1:14550'
    print('Connecting to vehicle on: %s' % connection_string)
    vehicle = connect(connection_string, wait_ready=True)
    def arm_and_takeoff(altitide):
        print("Basic pre-arm checks")
        while not vehicle.is_armable:
            print(" Waiting for vehicle to initialise...")
            time.sleep(1)
        print("Arming motors")
        vehicle.mode = VehicleMode("GUIDED")
        vehicle.armed = True
        while not vehicle.armed:
            print(" Waiting for arming...")
            time.sleep(1)
        print("Taking off!")
        vehicle.simple_takeoff(altitude)
        while True:
            print(" Altitude: ", vehicle.location.global_relative_frame.alt)
            if vehicle.location.global_relative_frame.alt >= altitude * 0.95:
                print("Reached target altitude")
                break
            time.sleep(1)
    arm_and_takeoff(altitude)
    print("Set default/target airspeed to 3")
    vehicle.airspeed = airspeed
    for i in range(1,len(data)):
        print("Going towards point for 30 seconds ...")
        point1 = LocationGlobalRelative(float(data[i]['lat']),float(data[i]['lng']),20)
        vehicle.simple_goto(point1,groundspeed=groundspeed)
        time.sleep(30)
    print("Returning to Launch")
    vehicle.mode = VehicleMode("RTL")
    print("Close vehicle object")
    vehicle.close()

from __future__ import print_function
import time
from dronekit import connect, VehicleMode, LocationGlobalRelative
def fly(altitude, airspeed, groundspeed, lat1, lon1, lat2, lon2, lat3, lon3):
    connection_string = 'udp:127.0.0.1:14550'
    print('Connecting to vehicle on: %s' % connection_string)
    vehicle = connect(connection_string, wait_ready=True)
    def arm_and_takeoff(aTargetAltitude):
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
        vehicle.simple_takeoff(aTargetAltitude)
        while True:
            print(" Altitude: ", vehicle.location.global_relative_frame.alt)
            if vehicle.location.global_relative_frame.alt >= aTargetAltitude * 0.95:
                print("Reached target altitude")
                break
            time.sleep(1)


    arm_and_takeoff(altitude)
    print("Set default/target airspeed to 3")
    vehicle.airspeed = airspeed

    print("Going towards first point for 30 seconds ...")
    point1 = LocationGlobalRelative(lat1, lon1, 20)
    vehicle.simple_goto(point1)
    time.sleep(30)

    print("Going towards second point for 30 seconds (groundspeed set to 10 m/s) ...")
    point2 = LocationGlobalRelative(lat2, lon2, 20)
    vehicle.simple_goto(point2, groundspeed = groundspeed)
    time.sleep(30)

    print("Going towards third point for 30 seconds (groundspeed set to 10 m/s) ...")
    point3 = LocationGlobalRelative(lat3, lon3, 20)
    vehicle.simple_goto(point3, groundspeed = groundspeed)
    time.sleep(30)

    print("Returning to Launch")
    vehicle.mode = VehicleMode("RTL")
    print("Close vehicle object")
    vehicle.close()

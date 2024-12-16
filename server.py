from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
import random

app = FastAPI()

class SensorData(BaseModel):
    lidar: Dict[str, float]
    camera: Dict[str, str]
    accelerometer: Dict[str, float]
    gps: Dict[str, float]
    gyroscope: Dict[str, float]
    inertia: Dict[str, float]
    temperature: float

class SensorSimulator:
    def __init__(self):
        self.sensors = {
            'lidar': self.simulate_lidar,
            'camera': self.simulate_camera,
            'accelerometer': self.simulate_accelerometer,
            'gps': self.simulate_gps,
            'gyroscope': self.simulate_gyroscope,
            'inertia': self.simulate_inertia,
            'temperature': self.simulate_temperature
        }

    def simulate_lidar(self) -> Dict[str, float]:
        return {"distance": random.uniform(0.0, 100.0)}

    def simulate_camera(self) -> Dict[str, str]:
        return {"timestamp": "2023-01-01T00:00:00Z", "image": "base64encodedstring"}

    def simulate_accelerometer(self) -> Dict[str, float]:
        return {
            "x": random.uniform(-10.0, 10.0),
            "y": random.uniform(-10.0, 10.0),
            "z": random.uniform(-10.0, 10.0)
        }

    def simulate_gps(self) -> Dict[str, float]:
        return {
            "latitude": random.uniform(-90.0, 90.0),
            "longitude": random.uniform(-180.0, 180.0)
        }

    def simulate_gyroscope(self) -> Dict[str, float]:
        return {
            "roll": random.uniform(-180.0, 180.0),
            "pitch": random.uniform(-180.0, 180.0),
            "yaw": random.uniform(-180.0, 180.0)
        }

    def simulate_inertia(self) -> Dict[str, float]:
        return {"force": random.uniform(0.0, 100.0)}

    def simulate_temperature(self) -> float:
        return random.uniform(-40.0, 100.0)

    def generate_sensor_data(self) -> SensorData:
        return SensorData(
            lidar=self.simulate_lidar(),
            camera=self.simulate_camera(),
            accelerometer=self.simulate_accelerometer(),
            gps=self.simulate_gps(),
            gyroscope=self.simulate_gyroscope(),
            inertia=self.simulate_inertia(),
            temperature=self.simulate_temperature()
        )

sensor_simulator = SensorSimulator()

@app.get("/")
def read_root():
    return {"message": "Dummy webserver for sensor data"}

@app.get("/api/gps")
def get_gps_data():
    return sensor_simulator.simulate_gps()

@app.get("/api/temperature")
def get_temperature_data():
    return sensor_simulator.simulate_temperature()

@app.get("/api/battery")
def get_battery_data():
    return sensor_simulator.simulate_battery()

@app.get("/api/camera")
def get_camera_data():
    return sensor_simulator.simulate_camera()

@app.get("/api/lidar")
def get_lidar_data():
    return sensor_simulator.simulate_lidar()

@app.get("/api/accelerometer")
def get_accelerometer_data():
    return sensor_simulator.simulate_accelerometer()
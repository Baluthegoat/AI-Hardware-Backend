const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

const dummyServerUrl = 'ws://127.0.0.1:8765';
const ws = new WebSocket(dummyServerUrl);

let latestData = {};

ws.on('open', () => {
  console.log('Connected to the dummy server WebSocket');
});

ws.on('message', async (data) => {
  console.log('Raw WebSocket Data:', data.toString());
  try {
    const parsedData = JSON.parse(data.toString());
    console.log('Parsed Data:', parsedData);
    latestData = parsedData;
    await saveData(parsedData);
  } catch (error) {
    console.error('Error parsing WebSocket data:', error.message);
  }
});

async function saveData(parsedData) {
  try {
    let vehicle = await prisma.vehicle.findFirst({
      where: { name: "Autonomous Vehicle" },
    });

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: { name: "Autonomous Vehicle", description: "Test vehicle" },
      });
    }

    console.log('Vehicle ID:', vehicle.id);

    const vehicleState = await prisma.vehicleState.create({
      data: {
        vehicleId: vehicle.id,
        speed: parsedData.speed || 0,
        latitude: parsedData.gps?.latitude || 0,
        longitude: parsedData.gps?.longitude || 0,
      },
    });

    console.log('Saved Vehicle State:', vehicleState);

    if (parsedData.sensor) {
      let sensor = await prisma.sensor.findFirst({
        where: { type: parsedData.sensor.type },
      });

      if (!sensor) {
        sensor = await prisma.sensor.create({
          data: {
            type: parsedData.sensor.type,
            description: parsedData.sensor.description || "No description",
          },
        });
      }

      console.log('Sensor ID:', sensor.id);

      const sensorData = await prisma.sensorData.create({
        data: {
          sensorId: sensor.id,
          value: parsedData.sensor.value || 0,
        },
      });

      console.log('Saved Sensor Data:', sensorData);
    }

    if (parsedData.battery_level !== undefined) {
      const batteryEvent = await prisma.batteryEvent.create({
        data: {
          vehicleId: vehicle.id,
          eventType: "BATTERY_UPDATE",
          percentage: parsedData.battery_level || 0,
        },
      });

      console.log('Saved Battery Event:', batteryEvent);
    }

    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error.message);
  }
}

app.get('/api/data', (req, res) => {
  if (Object.keys(latestData).length === 0) {
    return res.status(500).json({ error: 'No data received from the dummy server yet' });
  }

  res.json({
    temperature: latestData.temperature || "Unknown",
    speed: latestData.speed || "Unknown",
    gps: latestData.gps || { latitude: 0, longitude: 0 },
    battery: {
      percentage: latestData.battery_level || "Unknown",
      health: "Good",
    },
    camera: latestData.video_frame || "No video available",
  });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

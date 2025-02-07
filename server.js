const express = require('express');          // Import express framework for building web applications
const WebSocket = require('ws');             // Import WebSocket for handling WebSocket connections
const cors = require('cors');                // Import CORS to allow cross-origin requests
const { PrismaClient } = require('@prisma/client');  // Import Prisma Client for interacting with the database

const app = express();
const port = 3001;                           // Set the port for the Express server
const prisma = new PrismaClient();            // Create an instance of PrismaClient for database operations

app.use(express.json());                      // Middleware to parse JSON request bodies
app.use(cors());                              // Enable CORS for all incoming requests

const dummyServerUrl = 'ws://127.0.0.1:8765'; // WebSocket server URL (dummy server)
const ws = new WebSocket(dummyServerUrl);     // Create a WebSocket connection to the dummy server

let latestData = {};                          // Variable to store the latest data received from the WebSocket

// WebSocket event: When the connection opens
ws.on('open', () => {
  console.log('Connected to the dummy server WebSocket');
});

// WebSocket event: When a message is received
ws.on('message', async (data) => {
  console.log('Raw WebSocket Data:', data.toString());
  try {
    const parsedData = JSON.parse(data.toString());  // Parse the received data
    console.log('Parsed Data:', parsedData);
    latestData = parsedData;                         // Store the latest data
    await saveData(parsedData);                      // Save the data to the database
  } catch (error) {
    console.error('Error parsing WebSocket data:', error.message);
  }
});

// Function to save parsed data to the database
async function saveData(parsedData) {
  try {
    // Check if a vehicle record exists; if not, create one
    let vehicle = await prisma.vehicle.findFirst({
      where: { name: "Autonomous Vehicle" },
    });

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: { name: "Autonomous Vehicle", description: "Test vehicle" },
      });
    }

    console.log('Vehicle ID:', vehicle.id);

    // Save vehicle state data (e.g., speed, latitude, longitude)
    const vehicleState = await prisma.vehicleState.create({
      data: {
        vehicleId: vehicle.id,
        speed: parsedData.speed || 0,
        latitude: parsedData.gps?.latitude || 0,
        longitude: parsedData.gps?.longitude || 0,
      },
    });

    console.log('Saved Vehicle State:', vehicleState);

    // Check if sensor data exists; if not, create a new sensor record
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

      // Save sensor data (e.g., value)
      const sensorData = await prisma.sensorData.create({
        data: {
          sensorId: sensor.id,
          value: parsedData.sensor.value || 0,
        },
      });

      console.log('Saved Sensor Data:', sensorData);
    }

    // Save battery event data if battery_level is present
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

// API endpoint to get the latest data
app.get('/api/data', (req, res) => {
  if (Object.keys(latestData).length === 0) {  // Check if there is any data received
    return res.status(500).json({ error: 'No data received from the dummy server yet' });
  }

  // Respond with the latest data
  res.json({
    temperature: latestData.temperature || "Unknown",
    speed: latestData.speed || "Unknown",
    gps: latestData.gps || { latitude: 0, longitude: 0 },
    battery: {
      percentage: latestData.battery_level || "Unknown",
      health: "Good",                        // Hardcoded battery health status
    },
    camera: latestData.video_frame || "No video available",
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

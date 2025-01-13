const express = require('express');
const WebSocket = require('ws');  // WebSocket library for handling WebSocket connections
const cors = require('cors');  // cors for handling CORS issues

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// The dummy server's WebSocket address
const dummyServerUrl = 'ws://127.0.0.1:8765';  // WebSocket server address

// Create a WebSocket client to connect to the dummy server
const ws = new WebSocket(dummyServerUrl);

// Array to hold the latest data
let latestData = {};

// When the WebSocket client connects, set up a listener for incoming messages
ws.on('open', () => {
  console.log('Connected to the dummy server WebSocket');
});

// Listen for messages from the dummy server
ws.on('message', (data) => {
  try {
    // Parse incoming JSON data
    const parsedData = JSON.parse(data);
    latestData = parsedData;  // Store the latest data
    console.log('Data from dummy server:', parsedData);  // Log the received data
  } catch (error) {
    console.error('Error parsing data from dummy server:', error.message);
  }
});

// Endpoint for frontend to fetch the latest data from the dummy server
app.get('/api/data', (req, res) => {
  if (Object.keys(latestData).length === 0) {
    return res.status(500).json({ error: 'No data received from the dummy server yet' });
  }

  // Sending the latest data to the frontend
  res.json({
    temperature: latestData.temperature || "Unknown",  // Provide default value if not available
    speed: latestData.speed || "Unknown",  // Provide default value if not available
    gps: latestData.gps || { latitude: 0, longitude: 0 },  // Default coordinates if not available
    battery: {
      percentage: latestData.battery_level || "Unknown",  // Update to match the backend key
      health: "Good" // Static health or you can modify based on the data
    },
    camera: latestData.video_frame || "No video available"  // Return base64-encoded video frame if available
  });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

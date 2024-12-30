const express = require('express');
const axios = require('axios'); // axios for making HTTP requests
const cors = require('cors');  // cors for handling CORS issues

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// The dummy server's local address
const dummyServerUrl = 'http://127.0.0.1:5000';

// Endpoint for frontend to fetch data from the dummy server
app.get('/api/data', async (req, res) => {
  try {
    // Fetching data from the dummy server at /sensor_data
    const response = await axios.get(`${dummyServerUrl}/sensor_data`);
    const dummyServerData = response.data;

    console.log("Data from dummy server:", dummyServerData); // Log the dummy server response


    // Example response from the dummy server:
    // { temperature: 25.5, speed: 60, gps: { latitude: 40.7128, longitude: -74.0060 }, battery: { percentage: 85, health: "Good" }, camera: { status: "Streaming", feed: "http://path/to/feed" } }

    res.json({
      temperature: dummyServerData.temperature || "Unknown",  // Provide default value if not available
      speed: dummyServerData.speed || "Unknown",  // Provide default value if not available
      gps: dummyServerData.gps || { latitude: 0, longitude: 0 },  // Default coordinates if not available
      battery: {
        percentage: response.data.battery_level || "Unknown",  // Update to match the backend key
        health: "Good" // You can keep this static or update as per your requirements
      },
      camera: dummyServerData.camera || { status: "Streaming", feed: "http://path/to/feed" }  // Default camera data
    });
  } catch (error) {
    console.error('Error fetching data from dummy server:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from dummy server' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});


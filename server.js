// import express from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// // API endpoint for GPS data
// app.get('/api/gps', async (req, res) => {
//   try {
//     const gpsData = await prisma.gPSData.findMany({
//       orderBy: { Timestamp: 'desc' },
//       take: 1 // Fetch the latest record
//     });
//     if (!gpsData.length) {
//       return res.status(404).json({ message: 'No GPS data found' });
//     }
//     // Assuming speed, location, and direction are derived from Latitude, Longitude, and possibly Altitude
//     const { Latitude, Longitude, Altitude } = gpsData[0];
//     const speed = calculateSpeed(Latitude, Longitude, gpsData); // Implement this function
//     const direction = calculateDirection(Latitude, Longitude, gpsData); // Implement this function
//     res.json({ speed, location: { Latitude, Longitude, Altitude }, direction });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching GPS data', error: error.message });
//   }
// });

// // API endpoint for temperature data
// app.get('/api/temperature', async (req, res) => {
//   try {
//     const envData = await prisma.environmentalData.findFirst({
//       orderBy: { Timestamp: 'desc' }
//     });
//     if (!envData) {
//       return res.status(404).json({ message: 'No temperature data found' });
//     }
//     res.json({ internal: envData.Temperature, external: envData.Temperature }); // Placeholder for external temp
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching temperature data', error: error.message });
//   }
// });

// // API endpoint for battery status
// app.get('/api/battery', async (req, res) => {
//   try {
//     // Assuming battery data is stored in a separate table or as part of another model
//     const batteryData = await prisma.batteryData.findFirst({
//       orderBy: { Timestamp: 'desc' }
//     });
//     if (!batteryData) {
//       return res.status(404).json({ message: 'No battery data found' });
//     }
//     res.json({ percentage: batteryData.Percentage, health: batteryData.Health });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching battery data', error: error.message });
//   }
// });

// // API endpoint for camera feed status
// app.get('/api/camera', async (req, res) => {
//   try {
//     const cameraData = await prisma.camera.findFirst({
//       orderBy: { Timestamp: 'desc' }
//     });
//     if (!cameraData) {
//       return res.status(404).json({ message: 'No camera data found' });
//     }
//     res.json({ status: 'live feed', filePath: cameraData.FilePath }); // Adjust based on your needs
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching camera data', error: error.message });
//   }
// });

// // API endpoint for LiDAR data (placeholder)
// app.get('/api/lidar', async (req, res) => {
//   try {
//     const lidarData = await prisma.lidarData.findFirst({
//       orderBy: { Timestamp: 'desc' }
//     });
//     if (!lidarData) {
//       return res.status(404).json({ message: 'No LiDAR data found' });
//     }
//     res.json({ points: lidarData.LidarPoints }); // This should be processed further for real use
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching LiDAR data', error: error.message });
//   }
// });

// // API endpoint for accelerometer data
// app.get('/api/accelerometer', async (req, res) => {
//   try {
//     const imuData = await prisma.iMUData.findFirst({
//       orderBy: { Timestamp: 'desc' }
//     });
//     if (!imuData) {
//       return res.status(404).json({ message: 'No accelerometer data found' });
//     }
//     res.json({
//       x: imuData.AccelerationX,
//       y: imuData.AccelerationY,
//       z: imuData.AccelerationZ
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching accelerometer data', error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan'); // Logging middleware

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors()); // Enable CORS for all routes
// app.use(bodyParser.json());
// app.use(morgan('combined')); // Log HTTP requests

// // Mock data for demonstration purposes
// const mockData = {
//   gps: { speed: 50, location: { lat: 40.7128, lng: -74.0060 }, direction: 'North' },
//   temperature: { internal: 22, external: 15 },
//   battery: { percentage: 80, health: 'Good' },
//   camera: { status: 'Streaming', feed: 'placeholderImageURL' },
//   lidar: { points: 'placeholderPointCloudData' },
//   accelerometer: { x: 0.5, y: -0.3, z: 0.1 },
// };

// // API Endpoint for GPS data
// app.get('/api/gps', (req, res) => {
//   try {
//     res.json(mockData.gps);
//   } catch (error) {
//     console.error('Error fetching GPS data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // API Endpoint for Temperature data
// app.get('/api/temperature', (req, res) => {
//   try {
//     res.json(mockData.temperature);
//   } catch (error) {
//     console.error('Error fetching temperature data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // API Endpoint for Battery status
// app.get('/api/battery', (req, res) => {
//   try {
//     res.json(mockData.battery);
//   } catch (error) {
//     console.error('Error fetching battery data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // API Endpoint for Camera feed status
// app.get('/api/camera', (req, res) => {
//   try {
//     res.json(mockData.camera);
//   } catch (error) {
//     console.error('Error fetching camera data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // API Endpoint for LiDAR data
// app.get('/api/lidar', (req, res) => {
//   try {
//     res.json({ points: mockData.lidar.points }); // Placeholder for now
//   } catch (error) {
//     console.error('Error fetching LiDAR data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // API Endpoint for Accelerometer data
// app.get('/api/accelerometer', (req, res) => {
//   try {
//     res.json(mockData.accelerometer);
//   } catch (error) {
//     console.error('Error fetching accelerometer data:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Middleware for handling 404 errors (Invalid Endpoints)
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Endpoint not found' });
// });

// // Middleware for handling other server errors
// app.use((err, req, res, next) => {
//   console.error('Unexpected server error:', err.message);
//   res.status(500).json({ error: 'Something went wrong' });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Backend server running on port ${port}`);
// });

// module.exports = app; // For testing

const express = require('express');
const axios = require('axios'); // npm install axios for making HTTP requests
const app = express();
const port = 3000;

app.use(express.json());

// The dummy server's local address
const dummyServerUrl = 'http://127.0.0.1:5000';

// Endpoint for frontend to fetch data from the dummy server
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(`${dummyServerUrl}/data`);
    const dummyServerData = response.data;
    
    // Assuming dummy server provides:
    // { temperature: 25.5, speed: 60, gps: { latitude: 40.7128, longitude: -74.0060 } }
    res.json({
      temperature: dummyServerData.temperature,
      speed: dummyServerData.speed,
      gps: {
        latitude: dummyServerData.gps.latitude,
        longitude: dummyServerData.gps.longitude
      }
    });
  } catch (error) {
    console.error('Error fetching data from dummy server:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from dummy server' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

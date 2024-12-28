// fileName : server.js 
// Example using the http module
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the response headers
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Write the response content
    res.write('<h1>Hello, Node.js HTTP Server!</h1>');
    res.end();
});

// API Endpoint for Battery status
app.get('/api/battery', (req, res) => {
  try {
    res.json(mockData.battery);
  } catch (error) {
    console.error('Error fetching battery data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint for Camera feed status
app.get('/api/camera', (req, res) => {
  try {
    res.json(mockData.camera);
  } catch (error) {
    console.error('Error fetching camera data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint for LiDAR data
app.get('/api/lidar', (req, res) => {
  try {
    res.json({ points: mockData.lidar.points }); // Placeholder for now
  } catch (error) {
    console.error('Error fetching LiDAR data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Endpoint for Accelerometer data
app.get('/api/accelerometer', (req, res) => {
  try {
    res.json(mockData.accelerometer);
  } catch (error) {
    console.error('Error fetching accelerometer data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Middleware for handling 404 errors (Invalid Endpoints)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Middleware for handling other server errors
app.use((err, req, res, next) => {
  console.error('Unexpected server error:', err.message);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

module.exports = app; // For testing

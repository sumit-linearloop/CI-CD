// index.js
const express = require('express');
const promClient = require('prom-client'); // Import Prometheus client

const app = express();
const port = process.env.PORT || 3000;

// Create a Registry to register metrics
const register = new promClient.Registry();

// Enable default metrics collection (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register });

// Expose the /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello, DevOps Khandla Sumit !');
});

// Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

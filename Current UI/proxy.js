const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Define an async function to handle the proxy logic
async function handleProxy(req, res) {
    // Import 'node-fetch' dynamically
    const { default: fetch } = await import('node-fetch');

    const userEmail = req.body.UserUID;

    try {
        // Make a request to the backend API
        const response = await fetch('https://rjtdvr2b-3000.inc1.devtunnels.ms/fetchData', {
            method: 'POST',
            body: JSON.stringify({ "UserUID": userEmail }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse the response as JSON
        const data = await response.json();

        // Send the retrieved data to the client
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

// Define the route to fetch data
app.post('/fetchData', (req, res) => {
    // Call the async function
    handleProxy(req, res);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

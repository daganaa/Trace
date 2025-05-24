const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Retell } = require('retell-sdk');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Retell client
const client = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Add your frontend URLs
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// Create phone call endpoint
app.post('/api/calls/create', async (req, res) => {
  try {
    const { from_number, to_number, agent_id } = req.body;
    
    // Validate required fields
    if (!from_number || !to_number || !agent_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: from_number, to_number, agent_id'
      });
    }

    console.log('Creating call with:', { from_number, to_number, agent_id });
    
    const phoneCallResponse = await client.call.createPhoneCall({
      from_number,
      to_number,
      agent_id
    });

    console.log('Call created successfully:', phoneCallResponse);
    res.json({
      success: true,
      data: phoneCallResponse
    });
  } catch (error) {
    console.error('Error creating phone call:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create phone call'
    });
  }
});

// Get phone call endpoint
app.get('/api/calls/:call_id', async (req, res) => {
  try {
    const { call_id } = req.params;
    
    if (!call_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing call_id parameter'
      });
    }

    console.log('Retrieving call:', call_id);
    
    const callResponse = await client.call.retrieve({ call_id });

    console.log('Call retrieved successfully:', callResponse);
    res.json({
      success: true,
      data: callResponse
    });
  } catch (error) {
    console.error('Error retrieving phone call:', error);
    
    // Handle specific 404 errors
    if (error.message && error.message.includes('404')) {
      return res.status(404).json({
        success: false,
        error: 'Call not found. Please check the call ID.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve phone call'
    });
  }
});

// List all calls endpoint (optional, for debugging)
app.get('/api/calls', async (req, res) => {
  try {
    const callsResponse = await client.call.list();
    
    console.log('Calls listed successfully');
    res.json({
      success: true,
      data: callsResponse
    });
  } catch (error) {
    console.error('Error listing calls:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to list calls'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
});
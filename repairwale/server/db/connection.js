const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log('[DATABASE] Using existing connection');
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.warn('[DATABASE] ⚠️  MONGODB_URI not set - Running without database');
      console.warn('[DATABASE] ⚠️  Data will be lost on restart!');
      console.warn('[DATABASE] To fix: Add MONGODB_URI to .env file');
      return;
    }

    console.log('[DATABASE] Connecting to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('[DATABASE] ✓ Connected to MongoDB');
    
    mongoose.connection.on('error', (err) => {
      console.error('[DATABASE] Error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[DATABASE] Disconnected');
      isConnected = false;
    });

  } catch (error) {
    console.error('[DATABASE] ✗ Connection failed:', error.message);
    console.warn('[DATABASE] Continuing without database - data will be lost on restart');
  }
}

function isDBConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

module.exports = { connectDB, isDBConnected };

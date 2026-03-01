// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // 🌟 ADDED MONGOOSE

// 1. Load your secret variables
dotenv.config();

const app = express();

// 2. Middleware
app.use(cors()); 
app.use(express.json()); 

// 🔌 Connect the Charging Session Routes here:
app.use('/api/sessions', require('./src/routes/sessionRoutes'));

// 3. Simple Test Route
app.get('/', (req, res) => {
  res.send('ChargeUp Backend is Running! ⚡');
});

// 🌟 4. CONNECT TO DATABASE 🌟
// Make sure you have MONGO_URI="your_mongodb_link_here" in your .env file!
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chargeup'; // Fallback to local DB

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB!');
    // 5. Start Server ONLY after DB connects
    app.listen(PORT, () => {
      console.log(`Server is purring on port ${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));
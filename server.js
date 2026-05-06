const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. MIDDLEWARE
// This allows your Vercel frontend to talk to this Render backend
app.use(cors()); 
app.use(express.json());

// 2. MONGODB CONNECTION
// Use the Environment Variable you set in Render, or your direct string as a backup
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://lleyton:jeric0991@cluster0.pio6cez.mongodb.net/admin?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 3. DATABASE SCHEMA
const ScheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  position: { type: String, required: true }
}, { collection: 'schedule' });

const Schedule = mongoose.model('Schedule', ScheduleSchema);

// 4. ROUTES

// TEST ROUTE: Visit your Render link directly (https://sunday-mass-backend.onrender.com/)
// If you see "Server is Live", the backend is working!
app.get('/', (req, res) => {
  res.send('Server is Live and Running!');
});

// GET ROUTE: Fetch the list
app.get('/api/schedule', async (req, res) => {
  try {
    const items = await Schedule.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
});

// POST ROUTE: Add to the list
app.post('/api/schedule', async (req, res) => {
  try {
    const newItem = new Schedule(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Post Error:", err);
    res.status(400).json({ error: "Failed to add entry" });
  }
});

// 5. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is flying on port ${PORT}`);
});

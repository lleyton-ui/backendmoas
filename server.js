const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Use the environment variable from Render, or your local one for testing
const MONGO_URI = "mongodb+srv://lleyton:jeric0991@cluster0.pio6cez.mongodb.net/admin?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Connection error:', err));

const ScheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  position: { type: String, required: true }
}, { collection: 'schedule' });

const Schedule = mongoose.model('Schedule', ScheduleSchema);

app.get('/api/schedule', async (req, res) => {
  try {
    const items = await Schedule.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

app.post('/api/schedule', async (req, res) => {
  try {
    const newItem = new Schedule(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Validation Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
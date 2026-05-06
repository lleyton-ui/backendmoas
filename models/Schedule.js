const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  // Add any other fields you plan to use
}, { 
  // THIS IS THE IMPORTANT PART:
  collection: 'schedule' 
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
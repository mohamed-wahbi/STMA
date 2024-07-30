const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  alarmDesc: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  activated: {
    type: String,
    enum: ['oui', 'non'],
    default: 'non'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
{
  timestamps: true
});

const Alarm = mongoose.model('Alarm', alarmSchema);

module.exports = {
  Alarm
};

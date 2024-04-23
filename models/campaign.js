const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  photo: String,
    raised: {
    type: Number,
    default: 0,
  },
creator: {
  type: mongoose.Schema.Types.ObjectId,
    ref: 'userId'
}

}, {
  timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;
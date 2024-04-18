const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    photo: String
}, {
  timestamps: true // this will add `createdAt` and `updatedAt` fields automatically
});
const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;

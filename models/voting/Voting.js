const mongoose = require('mongoose')

const votingSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Option',
  },
  vote: {
    type: Number,
    default: 0,
  },
  list_user: {
    type: Array,
    default: [],
  },
  create_date: {
    type: String,
    default: Date.now(),
  },
});

mongoose.model('Voting', votingSchema);

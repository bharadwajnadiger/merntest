const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  UserId: {
    type: String,
    default: ''
  },
  timestamp:{
    type: Date,
    default : Date.Now
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);

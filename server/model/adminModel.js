const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {  // Add name field here
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user", "seller"],
    default: "admin"
  }
}, { timestamps: true });

const adminModel = new mongoose.model("admin", adminSchema);

module.exports = { adminModel }
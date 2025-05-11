const mongoose = require("mongoose");

// Định nghĩa Schema cho User
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Tạo model User từ schema
const User = mongoose.model("User", userSchema);

module.exports = User;

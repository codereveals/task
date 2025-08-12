// models/Profile.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  phone: String,
  address: String,
  designation:String,
  department:String,
  address:String,
  fatherName:String,
  motherName:String,
  email:String,
  dob:String,
  bio: String,
  avatar: String, // optional image URL
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);

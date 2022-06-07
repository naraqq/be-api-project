const mongoose = require("mongoose");
const User = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Color is required!"],
  },
  phone: {
    type: Number,
    minimum: 0,
    required: [true, "Phone is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
  role_id: {
    type: Number,
    required: [true, "Password is required!"],
  },
  created_date: {
    type: Date,
  },
  last_activity: {
    type: Date,
  },
});
module.exports = mongoose.model("user", User);

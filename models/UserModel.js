const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
});
module.exports = mongoose.model("user", User);

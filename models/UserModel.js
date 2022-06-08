const mongoose = require("mongoose");
const User = mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: Object,
    district: {
      type: String,
    },
    Khoroo: {
      type: String,
    },
    Apartment: {
      type: String,
    },
    additional: {
      type: String,
    },
  },
});
module.exports = mongoose.model("user", User);

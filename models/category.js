const mongoose = require("mongoose");
const userCategory = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  color: {
    type: String,
    required: [true, "Color is required!"],
  },
});
module.exports = mongoose.model("category", userCategory);

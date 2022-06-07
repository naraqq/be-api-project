const mongoose = require("mongoose");
const Foods = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  sales: {
    type: Boolean,
  },
  _id: {
    type: String,
  },
  category_id: {
    type: Number,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  portion: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  image: {
    type: String,
  },
  tumb_img: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
});
module.exports = mongoose.model("food", Foods);

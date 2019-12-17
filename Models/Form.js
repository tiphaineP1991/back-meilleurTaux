const mongoose = require("mongoose");

const Form = mongoose.model("Form", {
  type: String,
  state: String,
  use: String,
  situation: String,
  location: {
    country: String,
    state: Number
  },
  acquisitionPrice: Number,
  workPrice: Number,
  notaryFees: Number,
  totalPrice: Number,
  email: String,
  notification: Boolean
});

module.exports = Form;

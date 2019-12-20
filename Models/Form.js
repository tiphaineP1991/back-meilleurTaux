const mongoose = require("mongoose");

const Form = mongoose.model("Form", {
  type: String,
  state: String,
  use: String,
  situation: String,
  zipCode: String,
  amount: {
    estimated: Number,
    works: Number,
    notarialFees: Number,
    total: Number
  },
  email: String
});

module.exports = Form;

const express = require("express");
const router = express.Router();

const Form = require("../Models/Form");

// --------------CREATE-----------------

router.post("/form/create", async (req, res) => {
  try {
    const newForm = await new Form({
      type: req.body.type,
      state: req.body.state,
      use: req.body.use,
      situation: req.body.situation,
      location: {
        country: req.body.country,
        state: req.body.state
      },
      acquisitionPrice: req.body.acquisitionPrice,
      workPrice: req.body.workPrice,
      notaryFees: req.body.notaryFees,
      totalPrice: req.body.totalPrice,
      email: req.body.email,
      notification: req.body.notification
    });
    newForm.save();
    return res.json({
      _id: newForm._id,
      email: newForm.email
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// --------------READ-------------------
// --------------UPDATE-----------------
// --------------DELETE-----------------

module.exports = router;

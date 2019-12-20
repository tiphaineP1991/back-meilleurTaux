const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.DOMAIN;

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

const Form = require("../Models/Form");

// --------------CREATE-----------------

router.post("/form/create", async (req, res) => {
  try {
    const newForm = await new Form({
      type: req.body.type,
      state: req.body.state,
      use: req.body.use,
      situation: req.body.situation,
      zipCode: req.body.zipCode,
      amount: {
        estimated: req.body.amount.estimated,
        works: req.body.amount.works,
        notarialFees: req.body.amount.notarialFees,
        total: req.body.amount.total
      },
      email: req.body.email
    });
    newForm.save();
    res.json(newForm);
    mg.messages().send({
      from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
      to: newForm.email,
      subject:
        "Accusé de reception de votre demande de renseignements id :" +
        newForm._id,
      text:
        "Bonjour nous accusons reception de votre demande. Voici les données renseignées" +
        newForm +
        "Bien cordialement, l'équipe MeilleurTaux"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// --------------READ ALL-------------------

router.get("/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json({ forms });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// --------------READ BY ID-------------------

router.get("/form/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);

    if (form) {
      res.json(form);
    } else {
      res.status(404).json("form not found");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// --------------DELETE-----------------

router.post("/form/delete/:id", async (req, res) => {
  try {
    const deleteForm = await Form.findById(req.params.id);
    if (deleteForm) {
      await deleteForm.remove();
      res.json("form deleted");
    } else {
      res.status(404).json("form not found");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

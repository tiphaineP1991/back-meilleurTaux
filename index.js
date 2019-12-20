// 1-Permettre au serveur de communiquer
require("dotenv").config();

// 2-Démarrer mon serveur
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// 3-Importer mes modeles
require("./Models/Form");
// 4-Importer mes routes
const formRoutes = require("./routes/form");
app.use(formRoutes);

// 5-Connecter ma bdd
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 6-Ecouter mon serveur

app.listen(process.env.PORT, () => {
  console.log("Server is up !");
});

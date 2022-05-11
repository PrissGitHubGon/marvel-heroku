//import des packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const axios = require("axios");
//connexion à la bdd
// mongoose.connect("mongodb://lereacteur-marvel-api.netlify.app");
//blabla
//Création du serveur
const app = express();
app.use(formidable());
app.use(cors());

// const Comics = response.data;
const apiKey = process.env.API_KEY;
app.get("/", (req, res) => {
  res.status(200).json("Welcome !");
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// app.get("/comics/:id", async (req, res) => {
//   try {
//     const comics = await Comics.findById(req.params.id);
//     console.log(comics);

//     res.json({ message: "données reçu", comics });
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });
//************************************route characters**************************/
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//import des routes
// const comicsRoutes = require("./routes/comics");
// app.use(comicsRoutes);

// const caractersRoutes = require("./routes/caracters");
// app.use(caractersRoutes);

app.all("*", (req, res) => {
  res.status(404).json("Page Introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

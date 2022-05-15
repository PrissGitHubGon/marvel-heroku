//import des packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const axios = require("axios");
//connexion à la bdd
mongoose.connect("mongodb://localhost/marvel"); // fonctionne en local avec postman
//mongoose.connect( "mongodb+srv://priss-admin-marvel:7ZbTVQnhxB0vmohu@backendmarvel.77gba.mongodb.net/test"); //(probleme de connection a compass : bad auth : Authentication failed.)

// J'ai tenter l'import des routes comme vu en cours. Cela me générer beaucoup d'erreurs, j'ai laissé cette étape aux second plan

//Création du serveur
const app = express();
app.use(formidable());
app.use(cors());

const apiKey = process.env.API_KEY;
app.get("/", (req, res) => {
  res.status(200).json("Welcome ! take the direction on the road /comics ");
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`,
      {
        params: {
          title: req.query.title,
          skip: (req.query.page - 1) * 100, //pagination
        },
      }
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );
    console.log(response);
    res.send(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//************************************route characters**************************/
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`,
      {
        params: {
          name: req.query.name,
          skip: (req.query.page - 1) * 100, //pagination
        },
      }
    );
    console.log(response);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});
app.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`
    );
    console.log(response);
    res.send(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//**********************************************route user*************************************** */

const User = require("./models/User");

app.post("/user/register", async (req, res) => {
  try {
    if (req.fields.username === undefined) {
      res.status(400).json({ message: "Missing parameter" });
    } else {
      const isUserExist = await User.findOne({ email: req.fields.email });
      if (isUserExist !== null) {
        res.json({ message: "This email already has an account !" });
      } else {
        console.log(req.fields);

        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);
        const token = uid2(64);
        console.log("salt==>", salt);
        console.log("hash==>", hash);

        const newUser = new User({
          email: req.fields.email,
          account: {
            username: req.fields.username,
          },
          newsletter: req.fields.newsletter,
          token: token,
          hash: hash,
          salt: salt,
        });

        await newUser.save();
        res.json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
          account: newUser.account,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const userToCheck = await User.findOne({ email: req.fields.email });
    if (userToCheck === null) {
      res.status(401).json({ message: "Unauthorized ! 1" });
    } else {
      const newHash = SHA256(req.fields.password + userToCheck.salt).toString(
        encBase64
      );

      console.log("newHash==>", newHash);
      console.log("hashToCheck", userToCheck.hash);
      if (userToCheck.hash === newHash) {
        res.json({
          _id: userToCheck._id,
          token: userToCheck.token,
          account: userToCheck.account,
        });
      } else {
        res.status(401).json({ message: "Unauthorized ! 2" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("Page Introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

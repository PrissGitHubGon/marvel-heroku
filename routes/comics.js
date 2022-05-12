// créer :: Route : /comics -> Method : GET |+| Route : /comics/:characterId -> Method : GET
const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const axios = require("axios").default;
module.exports = router;

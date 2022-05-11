// créer :: Route : /comics -> Method : GET |+| Route : /comics/:characterId -> Method : GET
// const express = require("express");
// const router = express.Router();

// router.get("/comics", async (req, res) => {
//   try {
//     const comicsObject = {};
//     //gestion du Title
//     if (req.query.title) {
//       comicsObject.results = new RegExp(req.query.title);
//     }
//     res.status(200).json(comicsObject);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get("/comics/:id", async (req, res) => {
//   // Je récupère le produit par son id
//   try {
//     const offerById = await Offer.findById(req.params.id).populate({
//       path: "owner",
//       select: "account.username email -_id", // on renvoi le strict minimum au client, donc la juste le nom et l'email (-_id et égal qu'on ne renvoi pas l'id)
//     });
//     res.status(200).json(offerById);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// module.exports = router;

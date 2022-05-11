// // créer :: Route : /characters -> Method : GET |+| Route : /character/:characterId -> Method : GET
// const express = require("express");
// const router = express.Router();

// router.get("/caracters", async (req, res) => {
//   try {
//     res.status(200).json();
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get("/caracters/:id", async (req, res) => {
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

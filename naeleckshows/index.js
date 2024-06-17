// Création et exportation (dans le router) d'un JSON avec les derniers shows de l'Artiste de musique electrnique Naeleck. Le JSON doit comprendre pour chaques elements le nom, lieux, date, lien.

const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const data = await fetch("./data.json");
const shows = await data.json();

router.get("/", async (req, res) => {
    res.json(shows);
}
);


module.exports = router;


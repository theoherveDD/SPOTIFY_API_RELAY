// Création et exportation (dans le router) d'un JSON avec les derniers shows de l'Artiste de musique electrnique Naeleck. Le JSON doit comprendre pour chaques elements le nom, lieux, date, lien.

const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const data = require("./data.json");

router.get("/", async (req, res) => {
    try {
        const shows = await getShows();
        res.json(shows);
    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des derniers shows de l'artiste Naeleck" });
    }
});

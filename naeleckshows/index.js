const express = require("express");
const router = express.Router(); 
const fs = require('fs');

router.get("/naeleckshows", async (req, res) => {
    try {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                console.error("Une erreur est survenue lors de la lecture du fichier :", err);
                res.status(500).json({ error: "Une erreur est survenue lors de la lecture du fichier" });
            } else {
                const jsonData = JSON.parse(data);
                const shows = jsonData.shows;
                res.json(shows);
            }
        });
    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des derniers shows de l'artiste Naeleck" });
    }
});

module.exports = router;
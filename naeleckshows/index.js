const express = require("express");
const router = express.Router(); 
const fetch = require("node-fetch");



// Fonction pour récupérer le token d'accès
async function getToken() {
    // Construction du corps de la requête
    const requestBody = new URLSearchParams();
    requestBody.append("grant_type", "client_credentials");
    requestBody.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    requestBody.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);
  
    // Envoi de la requête POST
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody,
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la requête : " + response.status);
    }

    const data = await response.json();
    return data.access_token; // Récupération du token d'accès depuis la réponse
}

// Fonction pour récupérer les dernières sorties de l'artiste Naeleck
async function getLatestShows(artistId, token) {
    const response = await fetch(`https://api.spotify.com/v1/${artistId}/shows`, {
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la requête : " + response.status);
    }

    const data = await response.json(); // Convertir la réponse en JSON
    // Parcours des albums et récupération des informations sur les pistes
    const latestShows = [];
    data.items.forEach((show) => {
        const Shows = {
            name: show.name,
        };
        latestShows.push();
    });
    return latestShows;
}

router.get("/", async (req, res) => {
    try {
        const artistId = "2DYDFBqoaBP2i9XrTGpOgF"; // Remplace ARTIST_ID par l'ID de l'artiste Naeleck
        const token = await getToken(); // Utilisation de await pour attendre la résolution de la promesse
        const latestShows = await getLatestShows(artistId, token);
        res.json(latestShows);
    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des dernières sorties de l'artiste Naeleck" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router(); 
const fetch = require("node-fetch");

async function getToken() {

    const requestBody = new URLSearchParams();
    requestBody.append("grant_type", "client_credentials");
    requestBody.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    requestBody.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);
  

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
    return data.access_token; 
}


async function getLatestReleases(artistId, token) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=10`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la requête : " + response.status);
    }

    const data = await response.json(); 
    
    const latestReleases = [];
    data.items.forEach((album) => {
        const release = {
            name: album.name,
            release_date: album.release_date,
            artists: album.artists.map((artist) => artist.name).join(", "),
            cover_url: album.images.length > 0 ? album.images[0].url : null, 
            external_urls: album.external_urls,
            tracks: [],
        };
        if (album.tracks) {
            album.tracks.items.forEach((track) => {
                release.tracks.push({
                    name: track.name,
                    preview_url: track.preview_url,
                    external_urls: track.external_urls,
                });
            });
        }
        latestReleases.push(release);
    });
    return latestReleases;
}

router.get("/", async (req, res) => {
    try {
        const artistId = "2DYDFBqoaBP2i9XrTGpOgF"; 
        const token = await getToken(); 
        const latestReleases = await getLatestReleases(artistId, token);
        res.json(latestReleases);
    } catch (error) {
        console.error("Une erreur est survenue :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des dernières sorties de l'artiste Naeleck" });
    }
});

module.exports = router;
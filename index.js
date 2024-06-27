require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const naeleckreleases = require("./naeleckreleases");
const naeleckshows = require("./naeleckshows");
const dancingdeadplaylist = require("./dancingdeadplaylist");
const denhakuplaylist = require("./denhakuplaylist");
const dancingdeadartists = require("./dancingdeadartists");

app.use(express.json());
app.use(cors());
app.get("/", (req,res) => res.json({ success: "Hello World!" }));

app.use("/naeleckreleases", naeleckreleases);
app.use("/naeleckshows", naeleckshows);
app.use("/dancingdeadplaylist", dancingdeadplaylist);
app.use("/denhakuplaylist", denhakuplaylist);
app.use("/dancingdeadartists", dancingdeadartists);

app.listen(port, () => console.log(`Server running on port : ${port}`));
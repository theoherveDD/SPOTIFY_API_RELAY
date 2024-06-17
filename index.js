require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const naeleckreleases = require("./naeleckreleases");
const naeleckshows = require("./naeleckshows");
const dancingdeadplaylist = require("./dancingdeadplaylist");

app.use(express.json());
app.use(cors());
app.get("/", (req,res) => res.json({ success: "Hello World!" }));
// scihub
app.use("/naeleckreleases", naeleckreleases);
app.use("/naeleckshows", naeleckshows);
app.use("/dancingdeadplaylist", dancingdeadplaylist);

app.listen(port, () => console.log(`Server running on port : ${port}`));
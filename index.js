require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const spotify = require("./spotify");

app.use(express.json());
app.use(cors());
app.get("/", (req,res) => res.json({ success: "Hello World!" }));

app.use("/spotify", spotify);

app.listen(port, () => console.log(`Server running on port : ${port}`));
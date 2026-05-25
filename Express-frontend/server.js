const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.render("index"));

app.post("/submit", async (req, res) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:5000";
    const response = await axios.post(
      `${BACKEND_URL}/submit`,
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error connecting to backend");
  }
});

app.listen(3000, () => console.log("Frontend running on port 3000"));

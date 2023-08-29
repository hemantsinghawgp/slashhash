const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const db = require("./db");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Page 1: Search and Favorite
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", async (req, res) => {
  const searchQuery = req.body.searchQuery;
  const apiKey = "8af9c100";

  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`
    );
    const movies = response.data.Search || [];
    res.render("search", { movies });
  } catch (error) {
    console.error(error);
    res.render("search", { movies: [] });
  }
});

app.post("/favorite", (req, res) => {
  const { id, title, year, type, poster } = req.body;
  const query =
    "INSERT INTO favorites (id, title, year, type, poster) VALUES (?, ?, ?, ?, ?)";
  const values = [id, title, year, type, poster];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving favorite.");
    }
    res.redirect("/");
  });
});

// Page 2: View Favorites
app.get("/favorites", (req, res) => {
  const query = "SELECT * FROM favorites";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving favorites.");
    }
    res.render("favorites", { favorites: results });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

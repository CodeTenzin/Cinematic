const express = require("express");
const router = express.Router();

// hardcoded values. not using mongo.

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

// localhost:3000/api/genres
router.get("/", (req, res) => {
  res.send(genres);
});

// localhost:3000/api/genres/1
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre with given id not found.");
  res.send(genre);
});

// localhost:3000/api/genres
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// localhost:3000/api/genres
router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre with given id not found.");
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(err.details[0].message);
  genre.name = req.body.name;
  res.send(genre);
});

// localhost:3000/api/genres
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre with given id not found.");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  // compare shape of our object with the one sent by the user.
  return Joi.validate(genre, schema);
}

module.exports = router;

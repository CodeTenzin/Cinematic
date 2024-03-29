const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { validateGenre, Genre } = require("../models/genre");

// localhost:3000/api/genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// localhost:3000/api/genres/1
router.get("/:id", async (req, res) => {
  //   const genre = genres.find((g) => g.id === parseInt(req.params.id));
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre with given id not found.");
  res.send(genre);
});

// localhost:3000/api/genres
router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send("MY ERROR");
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// localhost:3000/api/genres
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(err.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!genre) return res.status(404).send("Genre with given id not found.");
  res.send(genre);
});

// localhost:3000/api/genres
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Genre with given id not found.");
  res.send(genre);
});

module.exports = router;

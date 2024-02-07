const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// set mongodb. using mongoose.

// const genres = [
//   { id: 1, name: "Action" },
//   { id: 2, name: "Horror" },
//   { id: 3, name: "Romance" },
// ];

// moved to customer model.
// const Genre = mongoose.model(
//   "Genre",
//   new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//       minlength: 5,
//       maxlength: 50,
//     },
//   })
// );

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
  //   if (error) return res.status(400).send(error.details[0].message);
  if (error) return res.status(400).send("MY ERROR");

  //   const genre = {
  //     id: genres.length + 1,
  //     name: req.body.name,
  //   };
  //   genres.push(genre);
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// localhost:3000/api/genres
router.put("/:id", async (req, res) => {
  //   const genre = genres.find((g) => g.id === parseInt(req.params.id));
  //   if (!genre) return res.status(404).send("Genre with given id not found.");
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(err.details[0].message);
  //   genre.name = req.body.name;
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
  //   const genre = genres.find((g) => g.id === parseInt(req.params.id));
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre with given id not found.");
  //   const index = genres.indexOf(genre);
  //   genres.splice(index, 1);
  res.send(genre);
});

// function validateGenre(genre) {
//   const schema = {
//     name: Joi.string().min(3).required(),
//   };
//   // compare shape of our object with the one sent by the user.
//   return Joi.validate(genre, schema);
// }

module.exports = router;

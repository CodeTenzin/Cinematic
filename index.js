const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/rentals");
const rentals = require("./routes/rentals");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
// localhost:3000/api/genres
app.use("/api/genres", genres);
// localhost:3000/api/customers
app.use("/api/customers", customers);
// localhost:3000/api/movies
app.use("/api/movies", movies);
// localhost:3000/api/rentals
app.use("/api/rentals", rentals);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

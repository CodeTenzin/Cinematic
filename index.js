const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

const express = require("express");
const app = express();

// set mongodb. using mongoose.

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
// localhost:3000/api/`genres`
app.use("/api/genres", genres);
// localhost:3000/api/customers
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

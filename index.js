const express = require("express");
const app = express();
const genres = require("./routes/genres");

// app.get("/", (req, res) => {
//   res.send("Home page");
// });

app.use(express.json());
// localhost:3000/api/genres
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

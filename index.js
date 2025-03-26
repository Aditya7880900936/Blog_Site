const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./routes/user");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const PORT = process.env.PORT || 3000;


mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get("/", (req, res) => {
  res.render("home",{
    user: req.user,
  });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

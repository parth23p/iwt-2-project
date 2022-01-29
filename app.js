const express = require("express");
require("./config/db.config");
require("nodemon");
const app = express();
app.use(express.json());
const userSignUpRoute = require("./routes/userSignUp");

app.post("/signUp", userSignUpRoute);
app.use(function (req, res) {
  res.type("application/json");
  res.status(404);
  res.send({ success: false, message: "404 Route Not Found", data: null });
});

// custom server Error
app.use(function (err, req, res, next) {
  res.type("application/json");
  res.status(500);
  res.json({ success: false, message: "500 Server Error", data: err.stack });
  next(err);
});

const PORT = 5000;
const server = app.listen(PORT, console.log(`Server running in port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

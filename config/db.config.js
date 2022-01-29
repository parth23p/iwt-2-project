const mongoose = require("mongoose");
const config = require("./config");

const db = mongoose.connect(
  `mongodb+srv://parthpatel:hello123@cluster0.1hvce.mongodb.net/iwt-2?authSource=admin&replicaSet=atlas-t1d5d8-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, database) {
    if (err) {
      console.log("Database Connection Error : ", err);
    } else {
      console.log(
        "Database Connection Successfully! : ",
        database.connections[0].name
      );
    }
  }
);
module.exports = db;

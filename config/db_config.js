const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/restorents");

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongo db is connected");
});

connection.on("error", (error) => {
  console.error(" error accure " + error);
});

module.exports = mongoose;

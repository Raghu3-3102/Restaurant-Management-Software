const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://it:VDGzOLcJWQ40A0Vf@cluster0.qdw8uhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongo db is connected");
});

connection.on("error", (error) => {
  console.error(" error accure " + error);
});

module.exports = mongoose;

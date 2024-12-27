const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://raghvendrakumarpandey321:ZLKw58wx6r7qyyx3@cluster0.y7bol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongo db is connected");
});

connection.on("error", (error) => {
  console.error(" error accure " + error);
});

module.exports = mongoose;

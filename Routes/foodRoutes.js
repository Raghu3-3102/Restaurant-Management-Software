const express = require("express");
const router = express.Router();
const foods = require("../model/FoodModel");

// router.post("/food-register", async (req, res) => {
//   try {
//     console.log("riched");

//     const foodChek = await foods.findOne({ foodname: req.body.foodname });
//     if (!foodChek) {
//       return res.status(200).send({
//         message: "food Registerd",
//         success: false,
//       });
//     }

//     const foodData = new foods(req.body);
//     const saveFood = await foodData.save();

//     if (!saveFood) {
//       return res.status(200).send({
//         message: "Internal error",
//         success: false,
//       });
//     }

//     res.status(200).send({
//       message: "Succesfully registerd",
//       success: true,
//       data: saveFood,
//     });
//   } catch (error) {
//     console.log(" riched" + error);
//   }
// });

router.get('/hello', async (req,res)=>{
  res.status(200).send("all are good")
  
})
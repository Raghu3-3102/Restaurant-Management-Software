const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true,
  },
  foodPrice: {
    type: Number,
    required: true,
  },
  aboutFood: {
    type: String,
    required: true,
  },
  parentFood : {
    type: String,
    required: true,
  },
  recomentation : {
    type: Boolean,
    default:false,
  
  },

  foodimage: {
    type: String,
    required: false,
  },
  numberoftimesOder:{
    type : Number,
    default:0
  },
  isBlocked:{
    type : Boolean,
    default:false
  }
});

const foodModel  = mongoose.model('foodItems',foodSchema)

module.exports = foodModel;

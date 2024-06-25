const mongoose = require("mongoose");

// Define the schema
const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  applicentid : {type: String, required: false },
  lastName: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  email: { type: String, required: false },
  address: { type: String, required: false },
  specialization: { type: String, required: false },
  expirence: { type: Number, required: false },
  prefrence: {
    type: String,
    required:false,
  },
  avaibility: {
    type: String,
    required: false,
  },
  isaproved : {
    type:Boolean,
    default:false
  }
});

// Create the model
const Employee = mongoose.model("Employee", employeeSchema);

// Export the model
module.exports = Employee;

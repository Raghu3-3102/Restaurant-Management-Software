const mongoose = require('mongoose')

const Feedback_schema = new mongoose.Schema(
    {
        
        rating :{
            type : Number,
            required:false,
        },
        comment :{
            type : String,
            required:false,
        },
        username :{
            type : String,
            required:false,
        },
        useremail:{
            type : String,
            required:false,
        }
    

        
    },
    {
        timestamp : true
    }
    
    )

    const Feedback_model = mongoose.model('Feedback',Feedback_schema)

    module.exports = Feedback_model;   
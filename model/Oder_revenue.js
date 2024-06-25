const mongoose = require('mongoose')

const Oder_revenue_schema = new mongoose.Schema(
    {
        
        date :{
            type : Number,
            required:false,
        },
        Foodprice :{
            type : Number,
            required:false,
        },

        
    },
    {
        timestamp : true
    }
    
    )

    const oder_revenue_Model = mongose.model('Oders',Oder_revenue_schema)

    module.exports = oder_show_Model;   
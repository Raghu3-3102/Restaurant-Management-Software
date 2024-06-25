const mongose = require('mongoose')

const oder_show_Schema = new mongose.Schema(
    {
        foodname : {
            type : String,
            required : false
        },
        address : {
            type : String,
            required : false
        },
        phoneno : {
            type : Number,
            required : false
        },
        userid:{
            type : String,
            required:true
        },
        aboutfood : {
            type:String,
            required:false
        },
        username : {
            type :String,
            required : true
        },
        tableno : {
            type : Number,
            required:false
        },
        noofcustomer : {
            type : Number,
            required:false
        },
        reason:{
            type:String,
            required :false

        },

        date :{
            type : Number,
            required:false,
        },
        booked_date :{
            type : Date,
            required:false,
        },
        booked_time :{
            type : String,
            required:false,
        },
        manth :{
            type : Number,
            required:false,
        },
        year :{
            type : Number,
            required:false,
        },
        Foodprice :{
            type : Number,
            required:false,
        },
        dileverd:{
          type:Boolean,
          default:false
        },
        finaldileverd:{
            type:Boolean,
            default:false
          },
        quntety:{
            type:Number,
            default:1

        }
        
    },
    {
        timestamp : true
    }
    
    )


    const oder_show_Model = mongose.model('Oders',oder_show_Schema)

  module.exports = oder_show_Model;
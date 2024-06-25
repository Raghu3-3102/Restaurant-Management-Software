const mongoose = require('mongoose')

const userShema  = new  mongoose.Schema(
    {
        name : {

            type : String,
            required : true
        },
        bestfriendname : {
            
            type : String,
            required : true
        },
        email : {

            type : String,
            required : true
        },
        passward : {

            type : String,
            required : true
        },
        isManager : {
            type : Boolean,
            default : false
        },
        isadmin : {
            type : Boolean,
            default : false
        },
        isNotification : {
            type : Array,
            required:false
        },
        add_to_cart : {
            type : Array,
            required:false
        },
        Nooftimefoododerd : {
            type : Number,
            default:0,
        }
    },

    )

    const userModel = mongoose.model('users',userShema)

    module.exports = userModel
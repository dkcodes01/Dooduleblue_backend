const mongoose=require("mongoose");
const userProfileModel = require("./user.profile.model");
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],
            trim:true,
        },
        email:{
            type:String,
            required:[true,"email is required"],
            trim:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:[true,"password is required"],
            select:false,
        },
        isActive:{
            type:Boolean,
            default:true,
        },
        // profile:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "userProfile"
        // }
    },
    {
        timestamps:true,
    }
)
const User=mongoose.model("User",userSchema)
module.exports=User;
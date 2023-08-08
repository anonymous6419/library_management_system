const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength: [3, "Minimum length would be 3"],
        maxlength: [20, "Minimum length is 20"],
        required:true
    },
    email:{
        type:String,
        minlength:[3, "Minimum length would be 3"],
        minlength:[20, "Minimum length would be 3"],
        required:true
    },
    contact:{
        type:Number,
        minlength:10,
        maxlength:10,
        required:true
    },
    address:{
        houseno:{
            type:String,
            minlength:1,
            maxlength:5
        },
        societyname:{
            type:String,
            required:true
        },
        landmark:{
            type:String,
            required:true
        },
        pincode:{
            type:Number,
            minlength:3,
            maxlength:6
        }
        },
        isIssuedBook:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "book",
            required : true
        },
        
},{timestamps:true})

module.exports = mongoose.model("user",userSchema);
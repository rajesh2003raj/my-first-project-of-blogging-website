import  mongoose  from "mongoose"; 

const userSchema=new mongoose.Schema({
     
    userName:{
        type:String,
        required:true,
        unique:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/05/22/77/67/240_F_522776712_3YT2vcT49YEvd8jYg5IGY4jlbHPPmJWc.jpg"
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema);
export default User;
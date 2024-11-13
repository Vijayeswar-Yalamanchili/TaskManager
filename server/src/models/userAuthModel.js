import mongoose from './indexModel.js'

const validateEmail = (email) => {
    return String(email).toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const userAuthSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true,"Firstname is required"]
    },
    lastName : {
        type : String,
        required : [true,"Lastname is required"]
    },
    email : {
        type : String,
        required : [true,"Email is required"],
        validate : {
            validator : validateEmail,
            message : props => `${props.value} is not a valid email`
        }
    },
    mobile:{
        type: String,
        required:[true,"Mobile number is required"]
    },
    password:{
        type: String,
        required:[true,"Password is required"]
    },
    isAdmin : {
        type:Boolean,
        default:false,
    },
    isLoggedIn : {
        type:Boolean,
        default:false,
    }
},
{ timestamps : true },
{ collection : 'userauths' })

const UserAuthModel = mongoose.model("userauths",userAuthSchema)

export default UserAuthModel
import mongoose from './indexModel.js'

const googleAuthSchema = new mongoose.Schema({
    googleId : {
        type : String,
    },
    displayName : {
        type : String,
    },
    email : {
        type : String,
    },
    image : {
        type : String,
    },
    isAdmin : {
        type:Boolean,
        default:false,
    },
    isLoggedIn : {
        type:Boolean,
        default:false,
    },
},
{ timestamps : true },
{ collection : 'googleAuthUsers' })

const GoogleAuthModel = mongoose.model("googleAuthUsers",googleAuthSchema)

export default GoogleAuthModel
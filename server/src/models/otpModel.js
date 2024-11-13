import mongoose from "./indexModel.js"

const otpSchema = new mongoose.Schema({
    mobile:{
        type: String,
        required:[true,"Mobile number is required"]
    },
    hashedOtp:{
        type:String,
        required:[false,"required"]
    }
},
{   timestamps : true  },
{   collection : 'otps' })

const OtpModel = mongoose.model('otps', otpSchema)

export default OtpModel
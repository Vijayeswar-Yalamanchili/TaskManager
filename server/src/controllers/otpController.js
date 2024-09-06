import dotenv from 'dotenv'
import axios from 'axios'
import hash from '../helper/hash.js'
import db from '../config/db.js'
import auth from '../helper/auth.js'

dotenv.config()

// Fast2SMS API details
const fast2smsAPIKey = process.env.FAST2SMS_APIKEY
const fast2smsURL = process.env.FAST2SMS_URL

const sendMobileOTP = async(req,res) => {
    try {
        const { mobile } = req.body
        const generateOtp = () => Math.floor(100000 + Math.random() * 900000)
        const otp = generateOtp();
        const otpHash = await hash.createHash(otp.toString())  
        const message = `Your login OTP for TaskManager Web App is ${otp}. Please do not share it with anyone.`    
        db.query(`SELECT * FROM otps WHERE mobile = ?`,[mobile],(err,result) => {
            if(err) throw err
            if(result.length > 0) {
                const updateOtpQuery = `UPDATE otps SET hashedOtp =?, createdAt =? WHERE mobile = ? `
                db.query(updateOtpQuery,[ otpHash, new Date(), mobile], (err,newOtp) => {
                    if(err) throw err
                    if(newOtp){
                        let fast2smsData  = {
                            route: 'p',
                            sender_id: 'TXTIND',
                            message: message,
                            language: 'english',
                            numbers: mobile,
                        }
    
                        //SEND SMS
                        try {
                            axios.post(fast2smsURL, fast2smsData, {
                                headers: {
                                    'Authorization' : `${fast2smsAPIKey}`,
                                }
                            })
                            res.status(200).send({
                                message : "Otp Sent"
                            })
                        } catch (error) {
                            res.status(400).send({
                                message : "Error in generating Otp"
                            })
                        }
                    }
                })
            } else {
                const insertOtpQuery = `INSERT INTO otps (mobile, hashedOtp, createdAt) VALUES (?,?,?)`
                db.query(insertOtpQuery,[mobile, otpHash, new Date()], (err,newOtp) => {
                    if(err) throw err
                    if(newOtp){
                        let fast2smsData  = {
                            route: 'p',
                            sender_id: 'TXTIND',
                            message: message,
                            language: 'english',
                            numbers: mobile,
                        }
    
                        //SEND SMS        
                        try {
                            axios.post(fast2smsURL, fast2smsData, {
                                headers: {
                                    'Authorization' : `${fast2smsAPIKey}`,
                                }
                            })
                            res.status(200).send({
                                message : "Otp Sent"
                            })
                        } catch (error) {
                            res.status(400).send({
                                message : "Error in generating Otp"
                            })
                        }
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in generating OTP"
        })  
    }
}

const verifyOTP = async(req,res) => {
    try {
        const { mobile, otp } = req.body

        const query = `SELECT hashedOtp FROM otps WHERE mobile = ?`;
        db.query(query, [mobile], async (err, results) => {
            if (err || results.length === 0) { 
                res.status(400).send({ message: 'Invalid mobile number or OTP' })
            }

            if (await hash.hashCompare(otp,results[0].hashedOtp)) {
                db.query(`SELECT * FROM userauths WHERE mobile=?`,[mobile],async(err,result) => {
                    if(err) return err
                    if(result){
                        let user = result[0]
                    }
                })
                const loginToken = await auth.createLoginToken({
                    id : user.userId,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    email:user.email,
                    isLoggedIn : user.isLoggedIn,
                    isAdmin : user.isAdmin
                })
                res.status(200).send({ 
                    message: 'OTP verified successfully',
                    loginToken
                })
            } else {
                res.status(400).send({ message: 'Invalid OTP' })
            }
        })        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in Verifying Otp"
        })
    }
}

export default {
    sendMobileOTP,
    verifyOTP
}
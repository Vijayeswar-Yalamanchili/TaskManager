import UserAuthModel from '../models/userAuthModel.js'
import GoogleAuthModel from '../models/googleAuthModel.js'
import auth from "../helper/auth.js"
import hash from "../helper/hash.js"

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await UserAuthModel.findOne({email : email})
        const googleUser = await GoogleAuthModel.findOne({email : email})
        if(user){
            if(await hash.hashCompare(password,user.password)){
                const loginToken = await auth.createLoginToken({
                    id : user._id,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    email:user.email,
                    isLoggedIn : user.isLoggedIn,
                    isAdmin : user.isAdmin
                })
                await UserAuthModel.findOneAndUpdate({email : email},{$set : {isLoggedIn : true}})
                res.status(200).send({
                    message : "Login Successful",
                    loginToken,
                })
            }else {
                res.status(400).send({
                    message : "Incorrect Password"
                })
            }
        }else if(googleUser){
            res.status(400).send({
                message : 'Login with Google account for this Email-id'
            })
        } else {
            res.status(400).send({
                message : "Email Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in fetching email"
        })
    }
}

const register = async(req,res) => {
    try {
        const {email, password} = req.body
        const checkUserEmail = await UserAuthModel.findOne({email : email})
        if(!checkUserEmail){
            req.body.password = await hash.createHash(password)
            const newUser = await UserAuthModel.create(req.body)
            res.status(200).send({
                message : "User created successfully",
                newUser
            })
        }  else{
            res.status(400).send({
                message : `User with ${req.body.email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in fetching email"
        })
    }
}

const forgotPassword = async(req,res) => {
    try {
        const user = await UserAuthModel.findOne({email : req.body.email})
        if(user){
            req.body.password = await hash.createHash(req.body.password)
            let resetPwd = await UserAuthModel.updateOne({password : req.body.password})
            res.status(200).send({
                message : "Password updated successfully",
                resetPwd
            })
        }else{
            res.status(400).send({
                message : `User with ${req.body.email} doesn't exists`
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message : "Internal server error in fetching email"
        })
    }
}

const logout = async(req,res) => {
    try {
        const user = await UserAuthModel.findOne({_id : req.params.id})
        if(user){
            let logout =  await UserAuthModel.findOneAndUpdate({_id : req.params.id},{ "$set": { isLoggedIn: false }},{new : true})
            res.status(200).send({
                message : "Logged Out Successfully"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in logging out"
        })
    }
}

export default {
    login,
    register,
    forgotPassword,
    logout
}
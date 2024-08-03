import UserAuthModel from '../models/userAuthModel.js'
import GoogleAuthModel from '../models/googleAuthModel.js'
import auth from "../helper/auth.js"
import hash from "../helper/hash.js"
import db from '../config/db.js'

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        // check if user exists and login
        const checkUserEmailQuery = `SELECT * FROM userauths WHERE email = ?`
        db.query(checkUserEmailQuery,[email],async(err,result) => {
            if(err) throw err
            if(result.length === 0){
                res.status(400).send({
                    message : `Email Not Found`
                })
            }
            const user = result[0]
            if(await hash.hashCompare(password,user.password)){
                db.query(`UPDATE userauths SET isLoggedIn = 1 WHERE email = ?`,[user.email],async(err,updated)=> {
                    if (err) return res.status(500).json({ error: 'Failed to update user login status' })
                    if(updated){
                        const loginToken = await auth.createLoginToken({
                            id : user._id,
                            firstName: user.firstName,
                            lastName : user.lastName,
                            email:user.email,
                            isLoggedIn : user.isLoggedIn,
                            isAdmin : user.isAdmin
                        })                
                        console.log('success', user, loginToken)
                        res.status(200).send({
                            message : "Login Successful",
                            loginToken,
                        })
                    }
                })
                
            }else {
                res.status(400).send({
                    message : "Incorrect Password"
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in fetching email"
        })
    }
}

const register = async(req,res) => {
    try {
        const {email, password,firstName,lastName,mobile} = req.body
        // check if user exists
        const checkUserEmailQuery = `SELECT * FROM userauths WHERE email = ?`
        db.query(checkUserEmailQuery,[email],(err,user) => {
            if(err) throw err
            if(user.length > 0){
                res.status(400).send({
                    message : `User with ${email} already exists. Err!`
                })
            }
        })
        // Insert user data
        let hashedPassword = await hash.createHash(password)
        const createUserQuery = `INSERT INTO userauths (firstName, lastName, mobile, email , password, isLoggedIn, createdAt) VALUES (?,?,?,?,?,?,?)`
        db.query(createUserQuery,[firstName,lastName,mobile,email,hashedPassword,0,new Date()],(err,newUser) => {
            if(err) throw err
            if(newUser) {
                res.status(201).send({
                    message : "User created successfully",
                    newUser
                })
            }            
        })
    } catch (error) {
        console.log(error)
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
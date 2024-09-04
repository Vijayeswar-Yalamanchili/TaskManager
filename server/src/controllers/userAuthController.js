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
                            id : user.userId,
                            firstName: user.firstName,
                            lastName : user.lastName,
                            email:user.email,
                            isLoggedIn : user.isLoggedIn,
                            isAdmin : user.isAdmin
                        })
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
        const createUserQuery = `INSERT INTO userauths (firstName, lastName, mobile, email , password, isLoggedIn, createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?)`
        db.query(createUserQuery,[firstName,lastName,mobile,email,hashedPassword,0,new Date(),new Date()],(err,newUser) => {
            if(err) throw err
            if(newUser) {
                res.status(200).send({
                    message : "User created successfully",
                    newUser
                })
            }            
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in fetching email"
        })
    }
}

const forgotPassword = async(req,res) => {
    try {
        const { email, password, confirmPassword } = req.body
        if( password === confirmPassword){
            const checkUserEmailQuery = `SELECT * FROM userauths WHERE email = ?`
            db.query(checkUserEmailQuery,[email],async(err,result) => {
                if(err) throw err
                if(result.length === 0) {
                    res.status(400).send({
                        message : `Email not found`
                    })
                }
                const user = result[0]
                let hashedPassword = await hash.createHash(password)
                db.query(`UPDATE userauths SET password = ? WHERE email = ?`,[hashedPassword,user.email],async(err,updated) => {
                    if (err) return res.status(500).json({ error: 'Failed to update user password' })
                    if(updated){
                        res.status(200).send({
                            message : "Password Updation Successful",
                        })
                    }
                })
            })
        } else {
            res.status(400).send({
                message : "Passwords doesn't match"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message : "Internal server error in updating password"
        })
    }
}

const logout = async(req,res) => {
    try {
        const { id } = req.params
        const checkUserIdQuery = `SELECT * FROM userauths WHERE userId = ?`
        db.query(checkUserIdQuery,[id],async(err,result) => {            
            if(err) throw err
            if(result.length === 1){
                const user = result[0]
                db.query(`UPDATE userauths SET isLoggedIn = 0 WHERE userId = ?`,[user.userId],async(err,updated) => {
                    if(err) return res.status(500).json({ error: 'Something went wrong in logging out' })
                    if(updated){
                        res.status(200).send({
                            message : "Logged out Successfully"
                        })
                    }
                })
            }
        })        
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
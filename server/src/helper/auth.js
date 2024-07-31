import jwt from 'jsonwebtoken'

//jwt

const createLoginToken = async(payload) => {
    let loginToken = await jwt.sign(payload,process.env.JWT_SECRETKEY_LOGIN,{
        expiresIn : process.env.JWT_EXPIRY_LOGIN
    })
    return loginToken
}

const decodeLoginToken = async(token) => {
    return await jwt.decode(token)
}

const createForgotPassToken = async(payload) => {
    let token = await jwt.sign(payload,process.env.JWT_SECRETKEY_FP,{
        expiresIn : process.env.JWT_EXPIRY_FP
    })
    return token
}

// ---------------------------------------------------------------------------------------------------------------

// Middlewares

//session expiry
const authenticate = async(req,res,next) => {
    let token  = req?.headers?.authorization?.split(' ')[1]
    if(token){
        let payload = await decodeLoginToken(token)
        let currentTime = +new Date()
        if(Math.floor(currentTime/1000)<payload.exp){
            next()
        }else{
            res.status(200).send({
                message :"Session expired and Logged out"
            })
        }
    }else{
        res.status(402).send({ 
            message :"Session is no longer available"
        })
    }
}


//mailId based
const getUserEmail = async(req,res,next) => {
    let token  = req?.headers?.authorization?.split(' ')[1]
    if(token){
        let payload = await decodeLoginToken(token)
        req.user = payload
        next()        
    }else{
        res.status(500).send({
            message :"Expired Token"
        })
    }
}

//role based
const adminGuard = async(req,res,next) => {
    // let token  = req?.headers?.authorization?.split(' ')[1]
    let token  = req?.headers?.authorization
    if(token){
        let payload = await decodeLoginToken(token)
        if(payload.isAdmin === true){
            next()
        }else{
            res.status(401).send({
                message :"Request noted & Only Admins are allowed to perform"
            })
        }        
    }else{
        res.status(500).send({
            message :"Unauthorised access"
        })
    }    
}

const adminAuthenticate = async(req,res,next) => {
    // let token  = req?.headers?.authorization?.split(' ')[1]
    let token  = req?.headers?.authorization
    if(token){
        let payload = await decodeLoginToken(token)
        let currentTime = +new Date()
        if(Math.floor(currentTime/1000)<payload.exp){
            next()
        }else{
            res.status(200).send({
                message :"Admin session expired and Logged out"
            })
        }
    }else{
        res.status(402).send({ 
            message :"Admin session is no longer available"
        })
    }
}

export default {
    createLoginToken,
    decodeLoginToken,
    createForgotPassToken,
    authenticate,
    getUserEmail,
    adminGuard,
    adminAuthenticate
}
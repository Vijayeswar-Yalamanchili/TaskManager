import UserAuthModel from "../models/userAuthModel.js"
import db from '../config/db.js'

const currentUser = async(req,res) => {
    try {
        // let user = await UserAuthModel.findById({_id : req.params.id})
        const q = 'SELECT * FROM userauths'
        db.query(q,(err,user) => {
            if(err){
                res.status(400).send({
                    message : err
                })
            } else {
                res.status(200).send({
                    user
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting current user details"
        })
    }
}

export default {
    currentUser
}
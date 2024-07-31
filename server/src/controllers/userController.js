import UserAuthModel from "../models/userAuthModel.js"

const currentUser = async(req,res) => {
    try {
        let user = await UserAuthModel.findById({_id : req.params.id})
        res.status(200).send({
            user
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
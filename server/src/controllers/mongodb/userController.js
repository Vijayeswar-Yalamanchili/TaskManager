import UserAuthModel from '../../models/userAuthModel.js'

const currentUser = async(req,res) => {
    try {
        const user = await UserAuthModel.findById({_id : req.params.id})
        res.status(200).send({
            user
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting current user details"
        })
    }
}

const updateUser = async(req,res) => {
    try {
        const user = await UserAuthModel.findByIdAndUpdate({_id : req.params.userId}, {$set : req.body},{new :true})
        res.status(200).send({
            user
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in updating user details"
        })
    }
}

export default {
    currentUser,
    updateUser
}
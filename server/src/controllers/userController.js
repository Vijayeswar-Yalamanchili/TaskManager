import db from '../config/db.js'

const currentUser = async(req,res) => {
    try {
        const { id } = req.params
        const checkUserIdQuery = `SELECT * FROM userauths WHERE userId = ?`
        db.query(checkUserIdQuery,[id],async(err,result) => {            
            if(err) throw err
            if(result.length === 1){
                const user = result[0]
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
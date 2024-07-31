import express from 'express'
import userAuthRoutes from './userAuthRoutes.js'

const router = express.Router()

// router.get('/', (req,res) => {
//     res.status(200).send({
//         message : "Server Started"
//     })
// })

router.use('/users',userAuthRoutes)

export default router
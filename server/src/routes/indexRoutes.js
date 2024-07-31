import express from 'express'
import userRoutes from './userRoutes.js'
import projectRoutes from './projectRoutes.js'

const router = express.Router()

// router.get('/', (req,res) => {
//     res.status(200).send({
//         message : "Server Started"
//     })
// })

router.use('/users',userRoutes)
router.use('/project',projectRoutes)

export default router
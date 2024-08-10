import express from 'express'
import userRoutes from './userRoutes.js'
import projectRoutes from './projectRoutes.js'
import taskRoutes from './taskRoutes.js'

const router = express.Router()

// router.get('/', (req,res) => {
//     res.status(200).send({
//         message : "Server Started"
//     })
// })

router.use('/users',userRoutes)
router.use('/project',projectRoutes)
router.use('/task',taskRoutes)

export default router
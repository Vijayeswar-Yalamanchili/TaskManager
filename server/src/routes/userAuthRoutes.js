import express from 'express'
import userAuthController from '../controllers/userAuthController.js'

const router = express.Router()

router.post('/login',userAuthController.login)
router.post('/register',userAuthController.register)
// router.post('/forgotpassword',userAuthController.forgotPassword)
router.put('/logout/:id',userAuthController.logout)

export default router
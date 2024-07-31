import express from 'express'
import userAuthController from '../controllers/userAuthController.js'
import auth from '../helper/auth.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.post('/login',userAuthController.login)
router.post('/register',userAuthController.register)
// router.post('/forgotpassword',userAuthController.forgotPassword)
router.put('/logout/:id',userAuthController.logout)

router.get('/currentuser/:id',auth.authenticate,userController.currentUser)

export default router
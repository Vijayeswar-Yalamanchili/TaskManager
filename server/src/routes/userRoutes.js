import express from 'express'
import auth from '../helper/auth.js'
import userAuthController from '../controllers/userAuthController.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.post('/login',userAuthController.login)
router.post('/register',userAuthController.register)
router.post('/forgotpassword',userAuthController.forgotPassword)
router.put('/logout/:id', auth.authenticate,userAuthController.logout)

router.get('/currentuser/:id',auth.authenticate,userController.currentUser)
router.put('/updateuser/:userId', auth.authenticate,userController.updateUser)

export default router
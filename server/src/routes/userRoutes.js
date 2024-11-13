import express from 'express'
import auth from '../helper/auth.js'
import userAuthController from '../controllers/mysql/userAuthController.js'
import userController from '../controllers/mysql/userController.js'
import otpController from '../controllers/mysql/otpController.js'
// import userAuthController from '../controllers/mongodb/userAuthController.js'
// import userController from '../controllers/mongodb/userController.js'
// import otpController from '../controllers/mongodb/otpController.js'

const router = express.Router()

router.post('/login',userAuthController.login)
router.post('/generate-otp',otpController.sendMobileOTP)
router.post('/verify-otp',otpController.verifyOTP)
router.post('/register',userAuthController.register)
router.post('/forgotpassword',userAuthController.forgotPassword)
router.put('/logout/:id', auth.authenticate,userAuthController.logout)

router.get('/currentuser/:id',auth.authenticate,userController.currentUser)
router.put('/updateuser/:userId', auth.authenticate,userController.updateUser)

export default router
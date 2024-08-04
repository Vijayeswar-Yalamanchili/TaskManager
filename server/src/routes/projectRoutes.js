import express from 'express'
import auth from '../helper/auth.js'
import projectController from '../controllers/projectController.js'

const router = express.Router()

router.post('/addproject/:id', auth.authenticate, projectController.addProject)
router.get('/getprojectslist/:id', auth.authenticate, projectController.getProjectsList)
router.get('/getcurrentprojectcarddata/:id',auth.authenticate, projectController.getCurrentProjectCardData)
router.get('/getcurrentprojectdata/:id',auth.authenticate, projectController.getCurrentProjectData)
router.post('/updatedprojectcardname/:id',auth.authenticate, projectController.updateCurrentProjectData)

export default router
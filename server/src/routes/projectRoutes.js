import express from 'express'
import auth from '../helper/auth.js'
import projectController from '../controllers/projectController.js'

const router = express.Router()

router.post('/addproject/:id', auth.authenticate, projectController.addProject)
router.get('/getprojectslist/:id', auth.authenticate, projectController.getProjectsList)
router.get('/getcurrentprojectdata/:id', projectController.getCurrentProjectData)

export default router
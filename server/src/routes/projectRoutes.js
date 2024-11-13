import express from 'express'
import auth from '../helper/auth.js'
import projectController from '../controllers/mysql/projectController.js'
// import projectController from '../controllers/mongodb/projectController.js'

const router = express.Router()

router.post('/addproject/:id', auth.authenticate, projectController.addProject)
router.get('/getprojectslist/:id', auth.authenticate, projectController.getProjectsList)
router.get('/getcurrentprojectcarddata/:userId/:projectId',auth.authenticate, projectController.getCurrentProjectCardData)
router.put('/updatedprojectcardname/:projectId',auth.authenticate, projectController.updateCurrentProjectData)
router.delete('/deleteproject/:projectId',auth.authenticate, projectController.deleteCurrentProject)

export default router
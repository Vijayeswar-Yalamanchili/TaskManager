import express from 'express'
import auth from '../helper/auth.js'
import taskController from '../controllers/taskController.js'

const router = express.Router()

router.post('/addtask/:projectId', auth.authenticate, taskController.addTask)
// router.get('/getprojectslist/:projectId', auth.authenticate, projectController.getProjectsList)
// router.get('/getcurrentprojectcarddata/:taskId/:projectId',auth.authenticate, projectController.getCurrentProjectCardData)
// router.put('/updatedprojectcardname/:taskId',auth.authenticate, projectController.updateCurrentProjectData)
// router.delete('/deleteproject/:taskId',auth.authenticate, projectController.deleteCurrentProject)

// router.get('/getcurrentprojectdata/:id',auth.authenticate, projectController.getCurrentProjectData)

export default router
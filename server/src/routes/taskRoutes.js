import express from 'express'
import auth from '../helper/auth.js'
import taskController from '../controllers/taskController.js'

const router = express.Router()

router.post('/addtask/:projectId', auth.authenticate, taskController.addTask)
router.get('/getalltasks/:projectId', auth.authenticate, taskController.getTasksList)
router.put('/statusupdate/:taskId', taskController.statusUpdate)
router.get('/getcurrenttaskdata/:taskId',auth.authenticate, taskController.getCurrentTaskData)
router.put('/updatetask/:taskId',auth.authenticate, taskController.updateTask)
router.delete('/deletetask/:taskId',auth.authenticate, taskController.deleteTask)

export default router
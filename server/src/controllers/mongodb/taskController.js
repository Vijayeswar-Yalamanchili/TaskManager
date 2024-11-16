import TasksModel from '../../models/tasksModel.js'
// import db from '../config/db.js'

const addTask = async(req,res) => {
    try {
        const {task} = req.body
        const taskStatus = task.taskStatus
        const addNewTask = await TasksModel.create({projectId : req.params.projectId, taskStatus : taskStatus, taskDetails : task.taskDetails})
        res.status(200).send({
            addNewTask
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding a new task"
        })
    }
}

const getTasksList = async(req,res) => {
    try {
        const { projectId } = req.params
        let list = await TasksModel.find({projectId : projectId})
        res.status(200).send({
            list
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all tasks"
        })
    }
}

const statusUpdate = async(req,res) => {
    try {
        const { taskId } = req.params
        const { taskStatus } = req.body
        let updatedTaskStatus = await TasksModel.findByIdAndUpdate({_id : taskId}, {$set : {taskStatus : taskStatus}},{new : true})
        res.status(200).send({
            updatedTaskStatus
        })
        // db.query(`UPDATE tasks SET taskStatus=?,updatedAt=? WHERE taskId=?`,[taskStatus,new Date(),taskId],async(err,result) => {
        //     if(err) throw err
        //     if(result){
        //         const updatedTaskStatus = result
        //         res.status(200).send({
        //             updatedTaskStatus
        //         })
        //     }
        // })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in Updating status of task"
        })
    }
}

const getCurrentTaskData = async(req,res) => {
    try {
        const { taskId } = req.params
        let currentTask = await TasksModel.find({_id : req.params.taskId})
        res.status(200).send({
            currentTask
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting current task"
        }) 
    }
}

const updateTask = async(req,res) => {
    try {
        const { taskId } = req.params
        const { taskStatus, taskDescription, taskTitle} = req.body
        let updatedTaskData = await TasksModel.findByIdAndUpdate({_id : taskId}, {$set : {taskStatus : taskStatus, "taskDetails.0.taskDescription" : taskDescription,"taskDetails.0.taskTitle" : taskTitle}},{new : true})
        res.status(200).send({
            updatedTaskData
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in updating task"
        })
    }
}

const deleteTask = async(req,res) => {
    try {
        const { taskId } = req.params
        let deletedTask = await TasksModel.findByIdAndDelete({_id :taskId},{new : true})
        res.status(200).send({
            deletedTask
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in deleting task"
        })
    }
}

export default {
    addTask,
    getTasksList,
    statusUpdate,
    getCurrentTaskData,
    updateTask,
    deleteTask
}
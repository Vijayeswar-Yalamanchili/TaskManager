import db from '../config/db.js'

const addTask = async(req,res) => {
    try {
        const {task} = req.body
        const taskStatus = task.taskStatus;
        const taskDetails = JSON.stringify(task.taskDetails);
        const addTaskQuery = `INSERT INTO tasks (projectId,taskStatus,taskDetails,createdAt,updatedAt) VALUES (?,?,?,?,?)`
        db.query(addTaskQuery,[req.params.projectId,taskStatus,taskDetails,new Date(),new Date()], async(err,result) => {
            if(err) throw err
            if(result) {
                res.status(200).send({
                    message : "Task created successfully",
                })
            }  
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
        const checkProjectIdQuery = `SELECT * FROM tasks WHERE projectId = ?`
        db.query(checkProjectIdQuery,[projectId],async(err,result) => {            
            if(err) throw err
            if(result){
                const list = result
                res.status(200).send({
                    list
                })
            }
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
        db.query(`UPDATE tasks SET taskStatus=?,updatedAt=? WHERE taskId=?`,[taskStatus,new Date(),taskId],async(err,result) => {
            if(err) throw err
            if(result){
                const updatedTaskStatus = result
                res.status(200).send({
                    updatedTaskStatus
                })
            }
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in Updating status of task"
        })
    }
}

const getCurrentTaskData = async(req,res) => {
    try {
        const { taskId } = req.params
        const checkTaskIdQuery = `SELECT * FROM tasks WHERE taskId = ?`
        db.query(checkTaskIdQuery,[taskId],async(err,result) => {            
            if(err) throw err
            if(result){
                const currentTask = result
                res.status(200).send({
                    currentTask
                })
            }
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
        const updateQuery = `UPDATE tasks SET taskStatus = ?, updatedAt = ?, taskDetails = JSON_SET(taskDetails,'$[0].taskTitle' , ?,'$[0].taskDescription' , ?) WHERE taskId=?`
        db.query(updateQuery,[taskStatus,new Date(),taskTitle,taskDescription,taskId],async(err,result) => {
            if(err) throw err
            if(result){
                const updatedTaskData = result
                res.status(200).send({
                    updatedTaskData,
                    message : "Task Updated"
                })
            }
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
        const deleteQuery = `DELETE FROM tasks WHERE taskId = ?`
        db.query(deleteQuery,[taskId],async(err,result) => {            
            if(err) throw err
            if(result){
                const deletedTask = result
                res.status(200).send({
                    message : 'Task removed successfully',
                    deletedTask
                })
            }
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
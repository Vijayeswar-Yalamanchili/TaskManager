import db from '../config/db.js'

const addTask = async(req,res) => {
    try {
        const {task} = req.body
        const taskStatus = task.taskStatus;
        const taskDetails = JSON.stringify(task.taskDetails);
        const addTaskQuery = `INSERT INTO tasks (projectId,taskStatus,taskDetails,createdAt,ModifiedAt) VALUES (?,?,?,?,?)`
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
    const { taskId } = req.params
    const { taskStatus } = req.body
    db.query(`UPDATE tasks SET taskStatus=? WHERE taskId=?`,[taskStatus,taskId],async(err,result) => {
        if(err) throw err
        if(result){
            const updatedTaskStatus = result
            res.status(200).send({
                updatedTaskStatus
            })
        }
    })
}

export default {
    addTask,
    getTasksList,
    statusUpdate
}
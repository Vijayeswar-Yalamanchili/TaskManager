import db from '../config/db.js'

const addTask = async(req,res) => {
    try {
        const {taskTitle,taskDescription,taskStatus,projectName} = req.body
        const addTaskQuery = `INSERT INTO tasks (projectId,projectName,taskTitle,taskDescription,taskStatus,createdAt) VALUES (?,?,?,?,?,?)`
        db.query(addTaskQuery,[req.params.projectId,projectName,taskTitle,taskDescription,taskStatus,new Date()], async(err,result) => {
            if(err) throw err
            if(result) {
                res.status(200).send({
                    message : "Task created successfully",
                })
            }  
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding a new project"
        })
    }
}

export default {
    addTask
}
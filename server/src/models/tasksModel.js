import mongoose from "./indexModel.js"

const tasksSchema = new mongoose.Schema({
    projectId : {
        type : String,
        required : true
    },
    taskStatus : {
        type : String,
        required : true
    },
    taskDetails : {
        type : JSON,
        required : true
    },
},
{ timestamps : true },
{ collection : 'tasks'})

const TasksModel = mongoose.model("tasks",tasksSchema)

export default TasksModel
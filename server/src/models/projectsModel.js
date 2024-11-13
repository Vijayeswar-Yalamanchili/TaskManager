import mongoose from "./indexModel.js"

const projectsSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    projectName : {
        type : String,
        required : true
    },
    tasks : {
        type : JSON,
        required : true
    },
},
{ timestamps : true },
{ collection : 'projects'})

const ProjectsModel = mongoose.model("projects",projectsSchema)

export default ProjectsModel
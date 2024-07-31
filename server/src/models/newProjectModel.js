import mongoose from './indexModel.js'

const newProjectSchema = new mongoose.Schema({
    currentUserId : {
        type : String,
        required : true
    },
    projectName : {
        type : String,
        required : true
    }
},
{ timestamps : true },
{ collection : 'projectsList' })

const NewProjectModel = mongoose.model("projectsList",newProjectSchema)

export default NewProjectModel
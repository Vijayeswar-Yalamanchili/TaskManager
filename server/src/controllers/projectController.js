import NewProjectModel from "../models/newProjectModel.js"

const addProject = async(req,res) => {
    try {
        console.log(req.params, req.body)
        let newProject = await NewProjectModel.create({
            currentUserId : req.params.id,
            projectName : req.body.projectName
        })
        res.status(200).send({
            newProject
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding a new project"
        })
    }
}

const getProjectsList = async(req,res) => {
    try {
        let list = await NewProjectModel.find({currentUserId : req.params.id})
        res.status(200).send({
            list
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding a new project"
        })
    }
}

const getCurrentProjectData = async(req,res) => {
    try {
        let currentProjectData = await NewProjectModel.findById({_id : req.params.id})
        res.status(200).send({
            currentProjectData
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding a new project"
        })
    }
}

export default {
    addProject,
    getProjectsList,
    getCurrentProjectData
}
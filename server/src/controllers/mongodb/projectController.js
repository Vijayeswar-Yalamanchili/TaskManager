import ProjectsModel from '../../models/projectsModel.js'

const addProject = async(req,res) => {
    try {
        const addNewProject = await ProjectsModel.create({userId : req.params.id, projectName : req.body.projectName})
        res.status(200).send({
            addNewProject
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding a new project"
        })
    }
}

const getProjectsList = async(req,res) => {
    try {
        let projectsList = await ProjectsModel.find({userId : req.params.id})
        res.status(200).send({
            projectsList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding a new project"
        })
    }
}

const getCurrentProjectCardData = async(req,res) => {
    try {
        let currentProjectCardData = await ProjectsModel.find({_id : req.params.projectId})
        res.status(200).send({
            currentProjectCardData
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting current card details"
        })
    }
}

const updateCurrentProjectData = async(req,res) => {
    try {
        const { projectId } = req.params
        const { projectName } = req.body
        let updatedProjectName = await ProjectsModel.findByIdAndUpdate({_id :projectId}, {$set : {projectName : projectName}},{new : true})
        res.status(200).send({
            updatedProjectName
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in updating project card"
        }) 
    }
}

const deleteCurrentProject = async(req,res) => {
    try {
        const { projectId } = req.params
        let deletedProjectCard = await ProjectsModel.findByIdAndDelete({_id :projectId},{new : true})
        res.status(200).send({
            deletedProjectCard
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
    getCurrentProjectCardData,
    updateCurrentProjectData,
    deleteCurrentProject
}
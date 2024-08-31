import db from '../config/db.js'

const addProject = async(req,res) => {
    try {
        const addProjectQuery = `INSERT INTO projects (userId,projectName,tasks,createdAt) VALUES (?,?,?,?)`
        db.query(addProjectQuery,[req.params.id, req.body.projectName,'[]',new Date()], async(err,result) => {
            if(err) throw err
            if(result) {
                res.status(200).send({
                    message : "Project created successfully",
                })
            }  
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding a new project"
        })
    }
}

const getProjectsList = async(req,res) => {
    try {
        const { id } = req.params
        const checkUserIdQuery = `SELECT * FROM projects WHERE userId = ?`
        db.query(checkUserIdQuery,[id],async(err,result) => {            
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
            message : "Internal server error in adding a new project"
        })
    }
}

const getCurrentProjectCardData = async(req,res) => {
    try {
        const { userId,projectId } = req.params
        const checkUserIdQuery = `SELECT * FROM projects WHERE userId = ? AND projectId = ?`
        db.query(checkUserIdQuery,[userId, projectId],async(err,result) => {            
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
            message : "Internal server error in getting current card details"
        })
    }
}

const updateCurrentProjectData = async(req,res) => {
    try {
        const { projectId } = req.params
        const { projectName } = req.body
        const updateQuery = `UPDATE projects SET projectName = ? WHERE projectId = ?`
        db.query(updateQuery,[projectName,projectId],async(err,result) => {            
            if(err) throw err
            if(result){
                const updatedProjectName = result
                res.status(200).send({
                    updatedProjectName
                })
            }
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
        const deleteQuery = `DELETE FROM projects WHERE projectId = ? ;`
        db.query(deleteQuery,[projectId],async(err,result) => {            
            if(err) throw err
            if(result){
                const deletedProjectCard = result
                res.status(200).send({
                    message : 'Project removed successfully',
                    deletedProjectCard
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
    addProject,
    getProjectsList,
    getCurrentProjectCardData,
    updateCurrentProjectData,
    deleteCurrentProject
}
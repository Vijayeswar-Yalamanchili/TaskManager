import NewProjectModel from "../models/newProjectModel.js"
import db from '../config/db.js'

const addProject = async(req,res) => {
    try {
        const addProjectQuery = `INSERT INTO projects (userId,projectName,createdAt) VALUES (?,?,?)`
        db.query(addProjectQuery,[req.params.id, req.body.projectName,new Date()], async(err,result) => {
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
            message : "Internal server error in getting current card details"
        })
    }
}

const updateCurrentProjectData = async(req,res) => {
    try {
        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in updating project card"
        }) 
    }
}

const getCurrentProjectData = async(req,res) => {
    try {
        console.log(req.query)
        // let currentProjectData = await NewProjectModel.findById({_id : req.params.id})
        // res.status(200).send({
        //     currentProjectData
        // })
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
    getCurrentProjectData,
    updateCurrentProjectData
}
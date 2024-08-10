import React, { useEffect, useState, useRef } from 'react'
import { Breadcrumb, Button, Container, Modal, Form, Spinner, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode' 
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import './ProjectCardContent.css'

function ProjectCardContent({socket}) {

    let { id } = useParams()
    let taskTitle = useRef()
    let taskDescription = useRef()
    let taskStatus = useRef()
    let navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tasksList, setTasksList] = useState(false)
    const [currentProjectCard, setCurrentProjectCard] = useState([])
    const getLoginToken = localStorage.getItem('loginToken')
    let decodedToken = jwtDecode(getLoginToken)
    let userId = decodedToken.id

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddTask = async(e) => {
        setLoading(true)
        e.preventDefault()
        let taskData = { 
            taskTitle : taskTitle.current.value,
            taskDescription : taskDescription.current.value,
            taskStatus : taskStatus.current.value,
            projectName : currentProjectCard[0]?.projectName
        }
        try {      
            let res = await AxiosService.post(`${ApiRoutes.ADDTASK.path}/${currentProjectCard[0]?.projectId}`,taskData, { headers : { 'Authorization' : `${getLoginToken}` } })
            setLoading(false)
            if(res.status === 200){
                toast.success(res.data.message)
                handleClose()
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
            setLoading(false)
        }
    }

    const getProjectData = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETCURRENTPROJECTCARDDATA.path}/${userId}/${id}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            if(res.status === 200){
                setCurrentProjectCard(res.data.list)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const getTasks = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETALLTASKS.path}/${id}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            if(res.status === 200){
                setTasksList(res.data.list)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=> {
        getProjectData()
        getTasks()
    },[currentProjectCard,tasksList])

    return <>
        <div className='mx-5 my-4'>
            <Breadcrumb>
                <Breadcrumb.Item style={{textTransform : 'uppercase'}} onClick={()=> navigate('/home')}>Home</Breadcrumb.Item>
                <Breadcrumb.Item style={{textTransform : 'uppercase'}} active>{currentProjectCard[0]?.projectName}</Breadcrumb.Item>
            </Breadcrumb>

            {/* ADDTASK */}
            <Container>
                <div className='d-flex justify-content-end'>
                    <Button onClick={handleShow}>Add Task</Button>
                </div>
            </Container>

            {/* TaskColumn */}
            <div>
                {
                    tasksList && tasksList.map((e,i) => {
                        return <Card key={i}>
                            <p>{e.projectId}</p>
                            <p>{e.projectName}</p>
                            <p>{e.taskTitle}</p>
                            <p>{e.taskDescription}</p>
                            <p>{e.taskStatus}</p>
                            <p>{e.createdAt}</p>
                            <p>{e.ModifiedAt}</p>
                        </Card>
                    })
                }
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleAddTask}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter here" name='taskName' ref={taskTitle}/>
                    </Form.Group>   
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter here" name='taskDescription' ref={taskDescription}/>
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Status</Form.Label>
                        <Form.Select  ref={taskStatus} onChange={()=> taskStatus.current.value}>
                            <option>Select task status</option>
                            <option value="Todo">Todo</option>
                            <option value="Working">Working</option>
                            <option value="Done">Done</option>
                        </Form.Select> 
                    </Form.Group>                           
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Create'}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}

export default ProjectCardContent
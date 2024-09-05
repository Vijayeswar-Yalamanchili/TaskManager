import React, { useEffect, useState, useRef } from 'react'
import { Breadcrumb, Button, Container, Modal, Form, Spinner, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { format } from 'date-fns'
import './ProjectCardContent.css'
import Board from '../kanbanBoard/Board'

function ProjectCardContent() {

    let { id } = useParams()
    let taskTitle = useRef()
    let taskDescription = useRef()
    let taskStatus = useRef()
    let navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tasksList, setTasksList] = useState([])
    const [inComplete, setInComplete] = useState([])
    const [workingTask, setWorkingTask] = useState([])
    const [completed, setCompleted] = useState([])
    const [currentProjectCard, setCurrentProjectCard] = useState([])
    const getLoginToken = localStorage.getItem('loginToken')
    let decodedToken = jwtDecode(getLoginToken)
    let userId = decodedToken.id

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddTask = async(e) => {
        setLoading(true)
        e.preventDefault()   
        const UID = () => Math.random().toString(36).substring(2, 10);     
        let taskData = { 
            task: {
                taskStatus: taskStatus.current.value,
                taskDetails: [
                  {
                    UID: UID(),
                    taskTitle : taskTitle.current.value.trim(),
                    taskDescription : taskDescription.current.value.trim(),
                    projectName : currentProjectCard[0]?.projectName                    
                  },
                ],
            }
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

    const getAllTasks = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETALLTASKS.path}/${id}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            let result = res.data.list
            let todos = result.filter((task) => task.taskStatus === "Pending" ? task : null)
            let working = result.filter((task) => task.taskStatus === "Ongoing" ? task : null)
            let completed = result.filter((task) => task.taskStatus === "Completed" ? task : null)
            if(res.status === 200){
                // console.log(result)
                setTasksList(result)
                setInComplete(todos)
                setWorkingTask(working)
                setCompleted(completed)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=> {
        getProjectData()
        getAllTasks()
    },[currentProjectCard, inComplete, workingTask, completed])

    return <>
        <div className='mx-5 my-4'>
            <Breadcrumb>
                <Breadcrumb.Item style={{textTransform : 'uppercase'}} onClick={()=> navigate('/home')}>Home</Breadcrumb.Item>
                <Breadcrumb.Item style={{textTransform : 'uppercase'}} active>{currentProjectCard[0]?.projectName}</Breadcrumb.Item>
            </Breadcrumb>

            {/* ADDTASK */}
            {/* <Container> */}
                <div className='d-flex justify-content-between'>
                    <h3>Progress Board</h3>
                    <Button onClick={handleShow}>Add Task</Button>
                </div>
            {/* </Container> */}

            {/* TaskColumn */}
            <div className='mt-3'>                
                <Board tasksList={tasksList} inComplete={inComplete} setInComplete={setInComplete} workingTask={workingTask} setWorkingTask={setWorkingTask} completed={completed} setCompleted={setCompleted}/>
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
                        <Form.Control style={{textTransform : 'capitalize'}} type="text" placeholder="Enter here" name='taskName' ref={taskTitle}/>
                    </Form.Group>   
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter here" name='taskDescription' ref={taskDescription}/>
                    </Form.Group> 
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Task Status</Form.Label>
                        <Form.Select  ref={taskStatus} onChange={()=> taskStatus.current.value}>
                            <option value = "-">Select task status</option>
                            <option value="Pending">Pending</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
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

{/* 
<div style={{backgroundColor : 'red'}}>
    {
        todoList.length > 0 && todoList.map((e,i) => {
            let formattedDateTime = useFormattedDateTime(e.ModifiedAt)
            return <Card key={i} className='m-2'  style={{width : '22rem'}}>
                <p>ProjectId : {e.projectId}</p>
                <p>ProjectName : {e.projectName}</p>
                <Card.Title className='mx-2 mt-2'>TaskTitle : {e.taskTitle}</Card.Title>
                <Card.Body>
                    <p>TaskDescription : {e.taskDescription}</p>
                    <p>TaskStatus : {e.taskStatus}</p>
                </Card.Body>
                <hr className='mx-3'/>
                <p className='px-3' style={{fontSize : 'smaller'}}>Last Updated At : {format(e.ModifiedAt, "dd/MM/yyyy")}</p>
            </Card>
        })
    }
</div>
<div style={{backgroundColor : 'green'}}>
    {
        pendingList.length > 0 && pendingList.map((e,i) => {
            return <Card key={i} className='m-2'  style={{width : '22rem'}}>
                <p>ProjectId : {e.projectId}</p>
                <p>ProjectName : {e.projectName}</p>
                <Card.Title className='mx-2 mt-2'>TaskTitle : {e.taskTitle}</Card.Title>
                <Card.Body>
                    <p>TaskDescription : {e.taskDescription}</p>
                    <p>TaskStatus : {e.taskStatus}</p>
                </Card.Body>
                <hr className='mx-3'/>
                <p className='px-3' style={{fontSize : 'smaller'}}>Last Updated At : {format(e.ModifiedAt, "dd/MM/yyyy")}</p>
            </Card>
        })
    }
</div>
<div style={{backgroundColor : 'blue'}}>
    {
        completedList.length > 0 && completedList.map((e,i) => {
            return <Card key={i} className='m-2'  style={{width : '22rem'}}>
                <p>ProjectId : {e.projectId}</p>
                <p>ProjectName : {e.projectName}</p>
                <Card.Title className='mx-2 mt-2'>TaskTitle : {e.taskTitle}</Card.Title>
                <Card.Body>
                    <p>TaskDescription : {e.taskDescription}</p>
                    <p>TaskStatus : {e.taskStatus}</p>
                </Card.Body>
                <hr className='mx-3'/>
                <p className='px-3' style={{fontSize : 'smaller'}}>Last Updated At : {format(e.ModifiedAt, "dd/MM/yyyy")}</p>
            </Card>
        })
    }
</div>
*/}
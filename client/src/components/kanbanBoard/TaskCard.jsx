import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, Modal, Spinner } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'
import './kanbanBoard.css'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import useFormattedDateTime from '../../hooks/UseFormattedDateTime'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function TaskCard({task, index}) {

  let taskNewTitle = useRef()
  let taskNewDescription = useRef()
  let taskNewStatus = useRef()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [taskData,setTaskData] = useState([])
  let formattedDateTime = useFormattedDateTime(task.updatedAt)
  let getLoginToken = localStorage.getItem('loginToken')

  const handleClose = () => setShow(false)
  const handleEditShow = (taskId) => {
    setShow(true)
    getTaskData(taskId)
  } 
  
  const handleEditTask= async(taskId) => {
    setLoading(true)
    let updatedDatas = {
      taskTitle : taskNewTitle.current.value.trim(),
      taskDescription : taskNewDescription.current.value.trim(),
      taskStatus: taskNewStatus.current.value,
    }
    try {      
      let res = await AxiosService.put(`${ApiRoutes.UPDATETASK.path}/${taskId}`,updatedDatas, { headers : { 'Authorization' : `${getLoginToken}` } })
      if(res.status === 200) {
        handleClose()
        toast.success(res.data.message)
        setLoading(false)
      }      
    } catch (error) {
      toast.error(error.response.data.message || error.message)
      setLoading(false)
    }
  }

  const handleDeleteTask = async(taskId) => {
    console.log("delete id : ",taskId)
    try {      
      let res = await AxiosService.delete(`${ApiRoutes.DELETETASK.path}/${taskId}`, { headers : { 'Authorization' : `${getLoginToken}` } })
      if(res.status === 200) {
        handleClose()
        toast.success(res.data.message)
        setLoading(false)
      }      
    } catch (error) {
      toast.error(error.response.data.message || error.message)
      setLoading(false)
    }
  }

  const getTaskData = async(taskId) => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETCURRENTTASKDATA.path}/${taskId}`,{ headers : { 'Authorization' : `${getLoginToken}` } })

      setTaskData(res.data.currentTask)
      setShow(true)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  return <>
    <Draggable draggableId={`${task.taskId}`} key={task.taskId} index={index}>
      {
        (provided,snapshot) => <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <div className='taskCardContainer d-flex'>
            <div className='d-flex mt-2' style={{ width: "100%" }}>
              <p className='taskCardText mb-0'>Title : {task.taskDetails[0].taskTitle}</p>
              <div className='buttons d-flex'>
                <div className='editBtn' onClick={() => handleEditShow(task.taskId)}><FontAwesomeIcon icon={faEdit} /></div>
                <div className='deleteBtn' onClick={() => handleDeleteTask(task.taskId)}><FontAwesomeIcon icon={faTrash} /></div>
              </div>
            </div>
            <hr className='hrLine' />
            <p className='taskCardText'>Description : {task.taskDetails[0].taskDescription}</p>
            <p className='taskCardText'>taskStatus : {task.taskStatus}</p>
            <p className='taskCardText'>Id : {task.taskDetails[0].UID}</p>
            <hr className='hrLine' />
            <p className='taskCardText'>Updated At : {formattedDateTime}</p>
          </div>
          {provided.placeholder}
        </div>
      }
    </Draggable>

    <Modal show={show} onHide={handleClose}>
      <Form>
        <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <Form.Control style={{textTransform : 'capitalize'}} defaultValue={taskData[0]?.taskDetails[0]?.taskTitle} type="text" placeholder="Enter here" name='taskName' ref={taskNewTitle}/>
            </Form.Group>   
            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control defaultValue={taskData[0]?.taskDetails[0]?.taskDescription} type="text" placeholder="Enter here" name='taskDescription' ref={taskNewDescription}/>
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Task Status</Form.Label>
              <Form.Select  ref={taskNewStatus} onChange={()=> taskNewStatus.current.value} default={taskData[0]?.taskDetails[0]?.taskStatus}>
                <option value = "-">Update task status</option>
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </Form.Select> 
          </Form.Group>                           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary"  onClick={()=> handleEditTask(taskData[0]?.taskId)} disabled={loading}>{loading ? <Spinner animation="border" /> : 'Update'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
}

export default TaskCard
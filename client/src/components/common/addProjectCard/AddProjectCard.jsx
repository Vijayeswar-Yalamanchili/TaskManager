import React, { useState } from 'react'
import { Card, Col, Button, Modal, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import useFormattedDateTime from '../../../hooks/UseFormattedDateTime'
import './AddProjectCard.css'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function AddProjectCard({cardData}) {
    
  let navigate = useNavigate()
  let formattedDateTime = useFormattedDateTime(cardData.createdAt)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [projectName, setProjectName] = useState()
  const [cardProjectName, setCardProjectName] = useState([])
  let getLoginToken = localStorage.getItem('loginToken')

  const handleClose = () => setShow(false)
  const handleShow = (userId,projectId) => {
    setShow(true) 
    getCardData(userId,projectId)  
  }

  const handleEditProjectCard = async(projectId) => {
    setLoading(true)
    let updatedDatas = { projectName : projectName }
    try {      
      let res = await AxiosService.put(`${ApiRoutes.UPDATEPROJECT.path}/${projectId}`,updatedDatas, { headers : { 'Authorization' : `${getLoginToken}` } })
      handleClose()
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
      setLoading(false)
    }
  }

  const handleDeleteProjectCard = async(projectId) => {
    try {
      let res = await AxiosService.delete(`${ApiRoutes.DELETECURRENTPROJECT.path}/${projectId}`, { headers : { 'Authorization' : `${getLoginToken}` } })
      if(res.status === 200){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const getCardData = async(userId,projectId) => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETCURRENTPROJECTCARDDATA.path}/${userId}/${projectId}`,{ headers : { 'Authorization' : `${getLoginToken}` } })
      setCardProjectName(res.data.list)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  return <>
    <Col>
      <Card style={{width: "20rem",minHeight : "7rem"}} >
        <Card.Body className='d-flex cardDatas'>
          <div className='cardText d-flex' onClick={() => navigate(`/home/${cardData.projectId}`)}>
            <p style={{fontSize : "large"}}>{cardData.projectName}</p>
            <p className='mb-0' style={{fontSize : "small"}}>Created At : {formattedDateTime}</p>
          </div>
          <div className='buttons d-flex'>
            <Button variant='secondary' onClick={() => handleShow(cardData.userId, cardData.projectId)}><FontAwesomeIcon icon={faEdit}/></Button>
            <Button variant='danger' onClick={() => handleDeleteProjectCard(cardData.projectId)}><FontAwesomeIcon icon={faTrash}/></Button>
          </div>
        </Card.Body>
      </Card>
    </Col>

    <Modal show={show} onHide={handleClose}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" defaultValue={cardProjectName[0]?.projectName} placeholder="Enter here" name='projectname' onChange={(e)=> setProjectName(e.target.value)}/>
          </Form.Group>        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={() => handleEditProjectCard(cardProjectName[0]?.projectId)} disabled={loading}>{loading ? <Spinner animation="border" /> : 'Save Changes'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
}

export default AddProjectCard
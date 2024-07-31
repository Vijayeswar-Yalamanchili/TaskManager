import React from 'react'
import { Card, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import useFormattedDateTime from '../../../hooks/UseFormattedDateTime'
import './AddProjectCard.css'

function AddProjectCard({cardData}) {
    
    let navigate = useNavigate()
    let formattedDateTime = useFormattedDateTime(cardData.createdAt)

    const handleEditProjectCard = async(cardId) => {
      try {
        
      } catch (error) {
        toast.error(error.response.data.message || error.message)
      }
    }

    const handleDeleteProjectCard = async(cardId) => {
      try {
        
      } catch (error) {
        toast.error(error.response.data.message || error.message)
      }
    }

    return <>
      <Col>
        <Card style={{width: "20rem",minHeight : "7rem"}} onClick={() => navigate(`/home/${cardData._id}`)}>
          <Card.Body className='d-flex cardBtns'>
            <div className='cardText d-flex'>
              <p style={{fontSize : "large"}}>{cardData.projectName}</p>
              <p className='mb-0' style={{fontSize : "small"}}>Created At : {formattedDateTime}</p>
            </div>
            <div className='buttons d-flex'>
              <Button variant='secondary' onClick={() => handleEditProjectCard(cardData._id)}><FontAwesomeIcon icon={faEdit}/></Button>
              <Button variant='danger' onClick={() => handleDeleteProjectCard(cardData._id)}><FontAwesomeIcon icon={faTrash}/></Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
}

export default AddProjectCard
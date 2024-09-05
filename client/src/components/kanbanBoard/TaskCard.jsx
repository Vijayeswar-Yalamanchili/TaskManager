import React from 'react'
import { Card } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'
import './kanbanBoard.css'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import useFormattedDateTime from '../../hooks/UseFormattedDateTime'

function TaskCard({task, index}) {

  let formattedDateTime = useFormattedDateTime(task.updatedAt)
  
  const handleEditShow = (uid,id) => {
    console.log("edit id : ",id)
  }

  const handleDeleteTask = (uid,id) => {
    console.log("delete id : ",id)
  }

  return <>
    <Draggable draggableId={`${task.taskId}`} key={task.taskId} index={index}>
      {
        (provided,snapshot) => <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <div className='taskCardContainer d-flex'>
            <div className='d-flex mt-2' style={{ width: "100%" }}>
              <p className='taskCardText mb-0'>Title : {task.taskDetails[0].taskTitle}</p>
              <div className='buttons d-flex'>
                <div className='editBtn' onClick={() => handleEditShow(task.taskDetails[0].UID, task.taskId)}><FontAwesomeIcon icon={faEdit} /></div>
                <div className='deleteBtn' onClick={() => handleDeleteTask(task.taskDetails[0].UID, task.taskId)}><FontAwesomeIcon icon={faTrash} /></div>
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
  </>
}

export default TaskCard

    {/* <Container>
      <div className='taskCardContainer d-flex flex-column justify-content-between align-items-center'>
          <h4>{task.title}</h4>
            <p>{task.description}</p>
              <p>{task.id}</p>
        
      </div>
    </Container> */}
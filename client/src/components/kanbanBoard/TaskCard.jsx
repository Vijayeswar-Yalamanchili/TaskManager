import React from 'react'
import { Card } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'
import './kanbanBoard.css'
import { Container } from 'react-bootstrap'

function TaskCard({task, index}) {
  
  return <>
    <Draggable draggableId={`${task.taskId}`} key={task.taskId} index={index}>
      {
        (provided,snapshot) => {
          return  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
            <div className='taskCardContainer d-flex flex-column justify-content-between align-items-start'>
              {/* <p>Title : {task.taskDetails[0].taskTitle}</p> for data from server */}
              <p>Title : {task.taskDetails[0].taskTitle}</p>
              <p>Description : {task.taskDetails[0].taskDescription}</p>
              <p>taskStatus : {task.taskStatus}</p>
              <p>Id : {task.taskDetails[0].UID}</p>                
            </div>
            {provided.placeholder} 
          </div>
        }
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
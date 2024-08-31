import React from 'react'
import { Card } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'
import './kanbanBoard.css'
import { Container } from 'react-bootstrap'

function TaskCard({task, index}) {
  console.log(task)
  return <>
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {
        (provided,snapshot) => {
          return  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
            <div className='taskCardContainer d-flex flex-column justify-content-between align-items-start'>
              <p>Title : {task.title}</p>
              <p>Description : {task.description}</p>
              <p>Id : {task.id}</p>                
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
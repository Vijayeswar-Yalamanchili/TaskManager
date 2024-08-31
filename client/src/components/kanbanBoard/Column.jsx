import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import './kanbanBoard.css'
import TaskCard from './TaskCard'

function Column({title,tasks,id,tasksList}) {
  return <>
    <div className='columnContainer'>
      <div className="columnTitle" style={{backgroundColor : "blue" , position : "sticky"}}>
        {title}
      </div>
      <Droppable droppableId={id} className='efr'>
        {
          (provided,snapshot) => {
            return <div className='columnTaskList' ref={provided.innerRef}{...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
              {
                // tasksList.map((task,index) => {
                tasks.map((task,index) => {
                  return <TaskCard key={index} index={index} task={task}/>
                })
              }
              {provided.placeholder}
            </div>
          }
        }
      </Droppable>
    </div>
  </>
}

export default Column
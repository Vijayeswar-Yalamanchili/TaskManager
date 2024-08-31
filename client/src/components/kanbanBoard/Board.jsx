import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import './kanbanBoard.css'
import Column from './Column'

function Board({tasksList}) {
  const [completed,setCompleted] = useState([])
  const [inComplete,setInComplete] = useState([])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId} = result
    if( source.droppableId === destination.droppableId) return;

    console.log('source : ', source.droppableId, "& destination : " ,destination.droppableId)
  }

  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        // console.log(json)
        setCompleted(json.filter((task) => task.completed))
        setInComplete(json.filter((task) => !task.completed))
      })
  },[])

  return <>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <Column title={"Todo"} tasks={inComplete} tasksList={tasksList} id={'1'}/>
        <Column title={"Completed"} tasks={completed} id={'2'}/>
      </div>
    </DragDropContext>
  </>
}

export default Board
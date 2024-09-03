import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import './kanbanBoard.css'
import Column from './Column'

function Board({tasksList}) {
  const [completed,setCompleted] = useState([])
  const [inComplete,setInComplete] = useState([])
  const [workingTask,setWorkingTask] = useState([])

  const tasksResult = () => {
    try {
      if(tasksList) {
        // console.log(tasksList)
        setInComplete(tasksList.filter((task) => task ? task?.taskStatus === 'Pending' : null))
        setWorkingTask(tasksList.filter((task) => task ? task?.taskStatus === 'Ongoing' : null))
        setCompleted(tasksList.filter((task) => task ? task?.taskStatus === 'Completed' : null))
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    tasksResult()
  },[completed, workingTask, inComplete])
  
  // useEffect(() => {console.log(tasksList)
  //   tasksResult()
  //   // fetch('https://jsonplaceholder.typicode.com/todos')
  //   //   .then(response => response.json())
  //   //   .then(json => {
  //   //     // console.log(json)
  //   //     setCompleted(json.filter((task) => task.completed))
  //   //     setInComplete(json.filter((task) => !task.completed))
  //   //   })
  // },[])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId} = result
    if( source.droppableId === destination.droppableId) return

    // REMOVE FROM SOURCE COLUMN LIST
    if(source.droppableId == 2) {
      setCompleted(removeItemById(draggableId,completed))
    } else {
      setInComplete(removeItemById(draggableId,inComplete))
    }

    // GET THE ITEM FROM SOURCE TO DESTINATION LIST
    const taskItem = findItemById(draggableId,[...inComplete, ...completed, ...workingTask])
    console.log(taskItem)

    // ADD ITEMS FROM SOURCE TO DESTINATION
    if(destination.droppableId == 2) {
      setCompleted([{...taskItem, completed : !taskItem.completed }, ... completed])
    } else {
      setInComplete([{...taskItem, completed : !taskItem.completed }, ... inComplete])
    }
    
    // console.log('source : ', source.droppableId, "& destination : " ,destination.droppableId)
  }

  const removeItemById = (id,array) => {
    // return array.filter((item) => console.log(item))
    return array.filter((item) => item.taskId != id)
  }

  const findItemById = (id,array) => {
    return array.find((item) => item.taskId == id)
  }

  return <>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <Column title={"Pending"} tasks={inComplete} tasksList={inComplete} id={'1'}/>
        <Column title={"On-Going"} tasks={workingTask} tasksList={workingTask} id={'2'}/>
        <Column title={"Completed"} tasks={completed} tasksList={completed} id={'3'}/>
      </div>
    </DragDropContext>
  </>
}

export default Board
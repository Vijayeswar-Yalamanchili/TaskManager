import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import './kanbanBoard.css'
import Column from './Column'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function Board({inComplete, setInComplete, workingTask, setWorkingTask, completed,setCompleted }) {

  const getLoginToken = localStorage.getItem('loginToken')

  const handleDragEnd = (result) => {
    const { destination, source, draggableId} = result
    if(!destination || source.droppableId === destination.droppableId) return

    // REMOVE FROM SOURCE COLUMN LIST
    deletePreviousState(source.droppableId, draggableId)

    // GET THE ITEM FROM SOURCE TO DESTINATION LIST
    const taskItem = findItemById(draggableId,[...inComplete, ...completed, ...workingTask])

    // ADD ITEMS FROM SOURCE TO DESTINATION
    setNewState(destination.droppableId, taskItem);
    // console.log('source : ', source.droppableId, "& destination : " ,destination.droppableId)
  }

  const deletePreviousState = (sourceDroppableId, taskId) => {
    switch (sourceDroppableId) {
      case "1":
        setInComplete(removeItemById(taskId, inComplete));
        break;
      case "2":
        setWorkingTask(removeItemById(taskId, workingTask));
        break;
      case "3":
        setCompleted(removeItemById(taskId, completed));
        break;
    }
  }

  const setNewState = async(destinationDroppableId, task) => {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1":   // Pending
        updatedTask = { ...task, taskStatus: 'Pending' }
        let pendingResult = await AxiosService.put(`${ApiRoutes.STATUSUPDATE.path}/${updatedTask.taskId}`, {taskStatus: 'Pending'},{ headers : { 'Authorization' : `${getLoginToken}` } })
        if(pendingResult.status === 200){
          setWorkingTask(pendingResult.data.updatedTaskStatus)
        }
        break;
      case "2":  // OnGoing
        updatedTask = { ...task, taskStatus: 'Ongoing' }
        let workingResult = await AxiosService.put(`${ApiRoutes.STATUSUPDATE.path}/${updatedTask.taskId}`, {taskStatus: 'Ongoing'},{ headers : { 'Authorization' : `${getLoginToken}` } })
        if(workingResult.status === 200) {
          setWorkingTask(workingResult.data.updatedTaskStatus)
        }
        break;
      case "3":  // Completed
        updatedTask = { ...task, taskStatus: 'Completed' }
        let completedResult = await AxiosService.put(`${ApiRoutes.STATUSUPDATE.path}/${updatedTask.taskId}`, {taskStatus: 'Completed'},{ headers : { 'Authorization' : `${getLoginToken}` } })
        if(completedResult.status === 200) {
          setCompleted(completedResult.data.updatedTaskStatus)
        }
        break;
    }
  }

  const removeItemById = (id,array) => {
    return array.filter((item) => item.taskId != id)
  }

  const findItemById = (id,array) => {
    return array.find((item) => item.taskId == id)
  }

  return <>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='d-flex flex-row justify-content-between align-items-center'>
        <Column title={"Pending"} tasks={inComplete} id={'1'}/>
        <Column title={"On-Going"} tasks={workingTask} id={'2'}/>
        <Column title={"Completed"} tasks={completed} id={'3'}/>
      </div>
    </DragDropContext>
  </>
}

export default Board
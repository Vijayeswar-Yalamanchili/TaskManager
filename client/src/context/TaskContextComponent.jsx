// import React, {useEffect, useState } from 'react'
// import AxiosService from '../utils/AxiosService'
// import ApiRoutes from '../utils/ApiRoutes'
// import { toast } from 'react-toastify'
// import { jwtDecode } from 'jwt-decode'

// export const TaskContext = React.createContext()

// function TaskContextComponent ({children}){

//     const [projectsList,setProjectsList] = useState([])
//     const [tasksList, setTasksList] = useState([])
//     const [completed,setCompleted] = useState([])
//     const [inComplete,setInComplete] = useState([])
//     const [workingTask,setWorkingTask] = useState([])
//     const [loggedIn, setLoggedIn] = useState(false)
//     let getLoginToken = localStorage.getItem('loginToken')
//     let decodedToken = jwtDecode(getLoginToken)
//     let userId = decodedToken.id

//     const getProjectsList = async() => {
//         try {
//             let res = await AxiosService.get(`${ApiRoutes.GETPROJECTSLIST.path}/${userId}`, { headers : { 'Authorization' : `${getLoginToken}` } })
//             if(res.status === 200){
//                 setProjectsList(res.data.list)
//             }
//         } catch (error) {
//             console.log(error.message)
//             // toast.error(error.response.data.message || error.message)
//         }
//     }

//     // // console.log(projectsList) 
//     //  let id = projectsList.projectId
//     //  console.log(id) 

//     const getAllTasks = async() => {
//         try {
//             getLoginToken && setLoggedIn(true) 
//             if(loggedIn === true){
//                 let res = await AxiosService.get(`${ApiRoutes.GETALLTASKS.path}/1`, {headers : { 'Authorization' : `${getLoginToken}` }})
//                 let result = res.data.list
//                 let todos = result.filter((task) => task.taskStatus === "Pending")
//                 let working = result.filter((task) => task.taskStatus === "Ongoing")
//                 let completed = result.filter((task) => task.taskStatus === "Completed")
//                 if(res.status === 200){
//                     // console.log(result)
//                     setTasksList(result)
//                     setInComplete(todos)
//                     setWorkingTask(working)
//                     setCompleted(completed)
//                 }
//             }
//         } catch (error) {
//             console.log(error.message)
//             // toast.error(error.response.data.message || error.message)
//         }
//     }

//     useEffect(()=> {
//         getAllTasks()
//         getProjectsList()
//     },[projectsList, tasksList, completed, inComplete, workingTask])

//     return <>
//         <TaskContext.Provider value={{projectsList, tasksList, completed, inComplete, workingTask}}>
//             {children}
//         </TaskContext.Provider>
//     </>
// }

// export default TaskContextComponent
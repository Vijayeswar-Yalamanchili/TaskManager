import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
// import TaskContextComponent from './context/TaskContextComponent'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
     <>
      {/* <TaskContextComponent> */}
        <App/>
      {/* </TaskContextComponent> */}
      <ToastContainer autoClose={2000}/>
    </>
  // </React.StrictMode>
)

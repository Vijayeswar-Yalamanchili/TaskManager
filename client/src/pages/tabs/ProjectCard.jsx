import React from 'react'
import io from 'socket.io-client'
import AppNavbar from '../../components/common/appNavbar/AppNavbar'
import ProjectCardContent from '../../components/projectCardContent/ProjectCardContent'

let serverBaseURL = import.meta.env.VITE_SERVER_URL
const socket = io.connect(serverBaseURL)

function ProjectCard() {
  return <>
    <AppNavbar socket={socket}/>
    <ProjectCardContent socket={socket}/>
  </>
}

export default ProjectCard
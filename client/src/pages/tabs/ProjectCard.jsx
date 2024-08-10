import React from 'react'
import io from 'socket.io-client'
import AppNavbar from '../../components/common/appNavbar/AppNavbar'
import ProjectCardContent from '../../components/projectCardContent/ProjectCardContent'

const socket = io.connect("http://localhost:6005/")

function ProjectCard() {
  return <>
    <AppNavbar socket={socket}/>
    <ProjectCardContent socket={socket}/>
  </>
}

export default ProjectCard
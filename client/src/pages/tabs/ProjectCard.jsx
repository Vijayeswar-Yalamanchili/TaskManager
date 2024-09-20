import React from 'react'
import { Navigate } from 'react-router-dom'
import AppNavbar from '../../components/common/appNavbar/AppNavbar'
import ProjectCardContent from '../../components/projectCardContent/ProjectCardContent'

function ProjectCard() {
  const getLoginToken = localStorage.getItem('loginToken')

  return <>
    {
      getLoginToken !== null ? <><AppNavbar/><ProjectCardContent/></> : <Navigate to={'/'}/> 
    }
  </>
}

export default ProjectCard
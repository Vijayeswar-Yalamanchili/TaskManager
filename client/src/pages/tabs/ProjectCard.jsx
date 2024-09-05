import React from 'react'
import AppNavbar from '../../components/common/appNavbar/AppNavbar'
import ProjectCardContent from '../../components/projectCardContent/ProjectCardContent'
import ErrorScreen from '../../components/common/errorScreen/ErrorScreen'

function ProjectCard() {
  const getLoginToken = localStorage.getItem('loginToken')

  return <>
    {
      getLoginToken !== null ? <><AppNavbar/><ProjectCardContent/></> : <ErrorScreen/> 
    }
  </>
}

export default ProjectCard
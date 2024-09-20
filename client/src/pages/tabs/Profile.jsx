import React from 'react'
import { Navigate } from 'react-router-dom'
import AppNavbar from '../../components/common/appNavbar/AppNavbar'
import ProfileContent from '../../components/profileContent.jsx/ProfileContent'

function Profile() {

  const getLoginToken = localStorage.getItem('loginToken')

  return <>

    {
      getLoginToken !== null ? <><AppNavbar/><ProfileContent/></> : <Navigate to={'/'}/> 
    }
  </>
}

export default Profile
import React from 'react'
import AppNavbar from '../../components/common/appNavbar/AppNavbar'
import ProfileContent from '../../components/profileContent.jsx/ProfileContent'
import ErrorScreen from '../../components/common/errorScreen/ErrorScreen'

function Profile() {

  const getLoginToken = localStorage.getItem('loginToken')

  return <>

    {
      getLoginToken !== null ? <><AppNavbar/><ProfileContent/></> : <ErrorScreen/> 
    }
  </>
}

export default Profile
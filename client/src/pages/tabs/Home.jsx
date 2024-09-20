import React from 'react'
import { Navigate } from 'react-router-dom'
import AppNavbar from '../../components/common/appNavbar/AppNavbar'
import HomeContent from '../../components/homeContent/HomeContent'

function Home() {

    const getLoginToken = localStorage.getItem('loginToken')

    return <>
        {
            getLoginToken !== null ? <><AppNavbar/><HomeContent/></> : <Navigate to={'/'}/> 
        }
    </>
}

export default Home
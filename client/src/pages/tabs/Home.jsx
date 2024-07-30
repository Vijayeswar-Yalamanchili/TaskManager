import React from 'react'
import AppNavbar from '../../components/common/appNavbar/AppNavbar'
import HomeContent from '../../components/homeContent/HomeContent'
import ErrorScreen from '../../components/common/errorScreen/ErrorScreen'

function Home() {

    const getLoginToken = localStorage.getItem('loginToken')

    return <>
        {/* {
            getLoginToken !== null ? <><AppNavbar/><HomeContent/></> : <ErrorScreen/> 
        } */}
        <AppNavbar/>
        <HomeContent/>
        
    </>
}

export default Home
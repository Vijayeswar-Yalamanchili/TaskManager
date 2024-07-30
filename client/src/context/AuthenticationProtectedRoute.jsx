import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import ErrorScreen from '../components/common/errorScreen/ErrorScreen'

function AuthenticationProtectedRoute({children}) {

    let token = localStorage.getItem('loginToken')
    
    return <>
        {
            token === null  ? <ErrorScreen/> : jwtDecode(token).isLoggedIn === true ? children : <Navigate to='/'/>
        }
    </>
}

export default AuthenticationProtectedRoute
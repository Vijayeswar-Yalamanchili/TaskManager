import React from 'react'
import AppNavbar from '../appNavbar/AppNavbar'
import { Spinner } from 'react-bootstrap'
import './LoadingComponent.css'

function LoadingComponent() {
  return <>
      <AppNavbar/>
      <div>
        <p className='loader'><Spinner animation='border'/></p>
      </div>
  </>
}

export default LoadingComponent
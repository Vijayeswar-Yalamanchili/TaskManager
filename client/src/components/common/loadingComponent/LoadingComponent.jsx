import React from 'react'
import { Spinner } from 'react-bootstrap'
import AppNavbar from '../appNavbar/AppNavbar'
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
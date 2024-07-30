import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faBars, faBasketShopping, faCartShopping, faHeartPulse, faHouse, faList, faListCheck, faPhone, faPowerOff, faRectangleList, faRightToBracket, faUserGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useLogout } from '../../../hooks/UseLogout'
import "./AppNavbar.css"

function AppNavbar() {

  let logout = useLogout()
  let navigate = useNavigate()
  const [respMenu, setRespMenu] = useState(false)
  const handleRespMenu = () => setRespMenu(!respMenu)
  const getLoginToken = localStorage.getItem('loginToken')

  const handleLogout = async() => {
    try {     
      const decodedToken = jwtDecode(getLoginToken)
      const id = decodedToken.id 
      let res = await AxiosService.put(`${ApiRoutes.LOGOUT.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      if(res.status === 200){
        logout()
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
}

  return <>
    <div style={{backgroundColor : "#6EACDA", height : "5rem"}}>
        {
            getLoginToken ? 
                <div className='d-flex justify-content-between align-items-center px-3' style={{height : '100%'}}>
                    <div><FontAwesomeIcon icon={faListCheck} style={{color : "white", height : "2.5rem"}} onClick={()=> navigate('/home')}/></div>
                    <div className='myNavsIcon d-flex'>
                        <Button variant='none' className='myNavTab'><FontAwesomeIcon icon={faUser} onClick={()=>navigate('/profile')} style={{ height : '1.5rem', color : "white"}}/></Button>
                        <Button variant='none' className='myNavTab'><FontAwesomeIcon icon={faPowerOff} onClick={handleLogout} style={{ height : '1.5rem', color : "white"}}/></Button>
                    </div>
                </div>  
                :
                <div className='d-flex justify-content-between align-items-center px-3' style={{height : '100%'}}>
                    <div><FontAwesomeIcon icon={faListCheck} style={{color : "white", height : "2.5rem"}} onClick={()=> navigate('/')}/></div>
                    <div className='myNavs d-flex'>
                        <Link to={'/'} className='myNavTab' style={{textDecoration : "none",color : "white"}}>
                            <Button variant='outline-light' className='myNavBtn'>Login</Button>
                        </Link>
                        <Link to={'/register'} className='myNavTab' style={{textDecoration : "none",color : "white"}}>
                            <Button variant='outline-light' className='myNavBtn'>Register</Button>
                        </Link>
                        <Button variant='none' className='myAuthBtns' onClick={()=>handleRespMenu()}>
                            <FontAwesomeIcon icon={faBars} style={{ height : '1.5rem', color : "white"}}/>
                        </Button>
                    </div>
                </div> 
        }              
        </div>

        {
            respMenu ?
                <div className="myRespMenuDrpdwn list-group list-group-flush px-1">
                    <Link to={`/login`} className="listMenu list-group-item list-group-item-action">
                        <span className='d-flex align-items-center justify-content-start' style={{gap:"15px"}}>
                            <FontAwesomeIcon icon={faHouse} size='xl' style={{color: "blue", width:"18px", height:"16px"}}/>Login
                        </span>
                    </Link>
                    <Link to={`/register`} className="listMenu list-group-item list-group-item-action">
                        <span className='d-flex align-items-center justify-content-start' style={{gap:"15px"}}>
                            <FontAwesomeIcon icon={faAddressCard} size='xl' style={{color: "blue", width:"18px", height:"16px"}}/>Register
                        </span>
                    </Link>                    
                </div> 
                :
                null
        }
  </>
}

export default AppNavbar
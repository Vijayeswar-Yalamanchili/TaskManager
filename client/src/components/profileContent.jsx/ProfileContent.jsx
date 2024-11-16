import React, { useEffect, useRef, useState } from 'react'
import { Card, Form, Button, Spinner } from  'react-bootstrap'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import './ProfileContent.css'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function ProfileContent() {
    let firstName = useRef()
    let lastName = useRef()
    let email = useRef()
    let mobile = useRef()
    const [userData, setUserData] = useState()
    const [buttonChange, setButtonChange] = useState(false)
    const [loading, setLoading] = useState(false)
    let getLoginToken = localStorage.getItem('loginToken')
    let decodedToken = jwtDecode(getLoginToken)
    // let userId = decodedToken.userId
    let userId = decodedToken.id

    const editUserData = async() => {
        setLoading(true)
        let updatedData = {
            firstName : firstName.current.value,
            lastName : lastName.current.value,
            email : email.current.value,
            mobile : mobile.current.value
        }
        try {      
            let res = await AxiosService.put(`${ApiRoutes.UPDATEUSER.path}/${userId}`,updatedData, { headers : { 'Authorization' : `${getLoginToken}` } })
            if(res.status === 200) {
              toast.success(res.data.message)
              setLoading(false)
              setButtonChange(!buttonChange)
            }      
          } catch (error) {
            toast.error(error.response.data.message || error.message)
            setLoading(false)
          }
    }

    const getUserData = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.CURRENTUSER.path}/${userId}`,{ headers : { 'Authorization' : `${getLoginToken}` } })
            if(res.status === 200){
                setUserData(res.data.user)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=> {
        getUserData()
    },[userData])

    return <>
    <Card className='profileCard mx-auto' style={{width : "30rem", height : "28rem"}}>
        <Card.Body>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text" defaultValue={userData?.firstName} placeholder="Enter here" name='firstName' ref={firstName}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control type="text" defaultValue={userData?.lastName} placeholder="Enter here" name='lastName' ref={lastName}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" defaultValue={userData?.email} placeholder="Enter here" name='email' ref={email}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text" defaultValue={userData?.mobile} placeholder="Enter here" name='mobile' ref={mobile}/>
                </Form.Group>
                {
                    buttonChange ? 
                    <Button variant='primary' style={{width : "100%"}} onClick={editUserData} disabled={loading}> {loading ? <Spinner animation="border" /> : 'Save'} </Button>
                    : <Button variant='secondary' style={{width : "100%"}} onClick={()=> setButtonChange(!buttonChange)} disabled={loading}> {loading ? <Spinner animation="border" /> : 'Edit'} </Button>
                }
            </div>
        </Card.Body>
    </Card>
  </>
}

export default ProfileContent
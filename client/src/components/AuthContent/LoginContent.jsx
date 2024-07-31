import React, { useState } from 'react'
import { Container, Form, Col, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import './Auth.css'

function LoginContent() {

  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:Yup.object({          
      email:Yup.string().required('Email is required').email('Enter a valid email'),
      password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password')
    }),
    onSubmit : async(values) => {
      try {
        setLoading(true)
        let res = await AxiosService.post(`${ApiRoutes.LOGIN.path}`,values)
        if(res.status === 200){
            localStorage.setItem('loginToken',res.data.loginToken)
            navigate('/home')
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || error.message)
        setLoading(false)
      }
    }
  })

  const handleGoogleLogin = async() => {
    let serverBaseURL = import.meta.env.VITE_SERVER_URL
    try {      
      window.open(`${serverBaseURL}/auth/google/callback`,'_self')
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  return <>
    <Container>
      <Col md xs={12}>
        <Form onSubmit={formik.handleSubmit} className='authForm mx-auto my-5 p-5 rounded-5'>                
          <Form.Group className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email ? (<div className='authErrorText'>{formik.errors.email}</div>) : null}
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
            {formik.touched.password && formik.errors.password ? (<div className='authErrorText'>{formik.errors.password}</div>) : null}
          </Form.Group>
          
          <div className='mb-4'>
            <Link to={'/forgotpassword'} className='forgotPasswordText'>Forgot Password ?</Link>
          </div>
          
          <div className="d-grid mb-2">
            <Button className='formBtns' type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Login'}</Button>
          </div>
          <div className='text-center mt-3'>New User? <Link to={'/register'} className='loginText'>Register</Link></div>
          <hr style={{color:"blue"}}/>
          <div className="d-grid mt-4 mb-3">
            <Button className='formBtns' variant='danger' onClick={handleGoogleLogin}>Sign Up with Google</Button>
          </div>
        </Form>
      </Col>
    </Container>  
  </>
}

export default LoginContent
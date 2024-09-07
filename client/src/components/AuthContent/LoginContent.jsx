import React, { useContext, useState } from 'react'
import { Container, Form, Col, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { SharedDataContext } from '../../context/SharedDataComponent'
import './Auth.css'

function LoginContent() {

  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [mobileLoginClicked,setMobileLoginClicked] = useState(false)
  const [isOtpGenerated, setIsOtpGenerated] = useState(false)
  const { sharedMobileNumber, setSharedMobileNumber } = useContext(SharedDataContext)

  let emailFormik = useFormik({
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

  let mobileFormik = useFormik({
    initialValues:{
      mobile:'',
    },
    validationSchema:Yup.object({          
      mobile:Yup.string().required('Mobile is required').matches(/^\d{10}$/,'Enter a valid mobile number'),
    }),
    onSubmit : async(values) => {
      try {
        setLoading(true)
        setSharedMobileNumber(values.mobile)
        let res = await AxiosService.post(`${ApiRoutes.GENERATEOTP.path}`,values)
        if(res.status === 200){
          toast.success(res.data.message)
          setIsOtpGenerated(!isOtpGenerated)
        }
        setLoading(false)
      } catch (error) {
        toast.error(error.response.data.message || error.message)
        setLoading(false)
      }
    }
  })

  let otpFormik = useFormik({
    initialValues:{
      mobile:'',
      otp : ''
    },
    validationSchema:Yup.object({          
      mobile:Yup.string().matches(/^\d{10}$/,'Enter a valid mobile number'),
      otp:Yup.string().required('Otp is required').matches(/^\d{6}$/,'Enter a valid OTP'),
    }),
    onSubmit : async(values) => {
      const otpValues = {
        mobile : sharedMobileNumber,
        otp : values.otp
      }
      try {
        setLoading(true)
        let res = await AxiosService.post(`${ApiRoutes.VERIFYOTP.path}`,otpValues)
        if(res.status === 200){
          localStorage.setItem('loginToken',res.data.loginToken)
          toast.success(res.data.message)
          navigate('/home')
        }
        setLoading(false)
      } catch (error) {
        toast.error(error.response.data.message || error.message)
        setLoading(false)
      }
    }
  })

  return <>
    <Container>
      <Col md xs={12}>
        {
          mobileLoginClicked ? 
            !isOtpGenerated ? 
              <Form onSubmit={mobileFormik.handleSubmit} className='authForm mx-auto  p-5 rounded-5' style={{marginTop : "8rem"}}>                
                <Form.Group className="mb-4">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type='text' placeholder="Enter Mobile" id='mobile' name='mobile' onChange={mobileFormik.handleChange} value={mobileFormik.values.mobile} onBlur={mobileFormik.handleBlur}/>
                  {mobileFormik.touched.mobile && mobileFormik.errors.mobile ? (<div className='authErrorText'>{mobileFormik.errors.mobile}</div>) : null}
                </Form.Group>
                
                <div className="d-grid mb-2">
                  <Button className='formBtns' type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Send OTP'}</Button>
                </div>
                <hr style={{color:"blue"}}/>
                <div className='text-center mt-3'><p onClick={()=> setMobileLoginClicked(!mobileLoginClicked)} className='loginText'><u>Login with Email</u></p></div>
              </Form> 
              :
              <Form onSubmit={otpFormik.handleSubmit} className='authForm mx-auto  p-5 rounded-5' style={{marginTop : "8rem"}}>              
                <Form.Group className="mb-4">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type='text' placeholder="Enter Mobile" id='mobile' name='mobile' value={sharedMobileNumber}/>
                  {otpFormik.touched.mobile && otpFormik.errors.mobile ? (<div className='authErrorText'>{otpFormik.errors.mobile}</div>) : null}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control type='text' placeholder="Enter otp" id='otp' name='otp' onChange={otpFormik.handleChange} value={otpFormik.values.otp} onBlur={otpFormik.handleBlur}/>
                  {otpFormik.touched.otp && otpFormik.errors.otp ? (<div className='authErrorText'>{otpFormik.errors.otp}</div>) : null}
                </Form.Group>
                
                <div className="d-grid mb-2">
                  <Button className='formBtns' type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Verify OTP'}</Button>
                </div>
                <hr style={{color:"blue"}}/>
                <div className='text-center mt-3'><p onClick={()=> setMobileLoginClicked(!mobileLoginClicked)} className='loginText'><u>Login with Email</u></p></div>
              </Form> 
          : 
            <Form onSubmit={emailFormik.handleSubmit} className='authForm mx-auto  p-5 rounded-5' style={{marginTop : "8rem"}}>                
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" id='email' name='email' onChange={emailFormik.handleChange} value={emailFormik.values.email} onBlur={emailFormik.handleBlur}/>
                {emailFormik.touched.email && emailFormik.errors.email ? (<div className='authErrorText'>{emailFormik.errors.email}</div>) : null}
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" id='password' name='password' onChange={emailFormik.handleChange} value={emailFormik.values.password} onBlur={emailFormik.handleBlur}/>
                {emailFormik.touched.password && emailFormik.errors.password ? (<div className='authErrorText'>{emailFormik.errors.password}</div>) : null}
              </Form.Group>
              
              <div className='mb-4'>
                <Link to={'/forgotpassword'} className='forgotPasswordText'>Forgot Password ?</Link>
              </div>
              
              <div className="d-grid mb-2">
                <Button className='formBtns' type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Login'}</Button>
              </div>
              <div className='text-center mt-3'>New User? <Link to={'/register'} className='loginText'>Register</Link></div>
              <hr style={{color:"blue"}}/>
              <div className='text-center mt-3'><p onClick={()=> setMobileLoginClicked(!mobileLoginClicked)} className='loginText'><u>Login with Mobile OTP</u></p></div>
            </Form>
        }
      </Col>
    </Container>  
  </>
}

export default LoginContent
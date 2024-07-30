import React, { useState } from 'react'
import { Container, Col, Form, Button, Spinner, Breadcrumb } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function ForgotPasswordContent() {

  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',      
      confirmPassword:''
    },
    validationSchema:Yup.object({          
      email:Yup.string().required('Email is required').email('Enter a valid email'),
      password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password'),
      confirmPassword:Yup.string().required('Confirm Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Confirm Password should match Password')
    }),
    onSubmit : async(values) => {
        try {
          setLoading(true)
          if(values.password === values.confirmPassword){
            let res = await AxiosService.post(`${ApiRoutes.FORGOTPASSWORD.path}`,values)
            if(res.status === 200){
                navigate('/login')
            }
            setLoading(false)
          }else{
            toast.error("Passwords doesnt match! Please enter the same passwords")
          }        
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
  })

  return <>
    <Container className='mt-4'>
      <Breadcrumb>
        <Breadcrumb.Item onClick={ ()=> navigate('/')}>Login</Breadcrumb.Item>
        <Breadcrumb.Item active>Forgot Password</Breadcrumb.Item>
      </Breadcrumb>

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
          
          <Form.Group className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder="Re-Enter Password" id="confirmPassword" name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur}/>
            {formik.touched.password && formik.errors.password ? (<div className='authErrorText'>{formik.errors.password}</div>) : null}
          </Form.Group>
         
          <div className="d-grid mb-4">
            <Button className='formBtns' type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Update Password'}</Button>            
          </div>
        </Form>
      </Col>
    </Container>
  </>
}

export default ForgotPasswordContent
import React, { useEffect, useState, useMemo } from 'react'
import { Button, Modal, Form, Spinner, Card, Row, Col } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import './HomeContent.css'
import AddProjectCard from '../common/addProjectCard/AddProjectCard'

function HomeContent() {

  const [show, setShow] = useState(false)
  const [projectName,setProjectName] = useState()
  const [projectsList,setProjectsList] = useState([])
  const [loading, setLoading] = useState(false)
  let getLoginToken = localStorage.getItem('loginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let userId = decodedToken.id

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleAddProject = async(e) => {
    setLoading(true)
    e.preventDefault()
    let datas = { projectName : projectName }
    try {      
      let res = await AxiosService.post(`${ApiRoutes.ADDPROJECT.path}/${userId}`,datas, { headers : { 'Authorization' : `${getLoginToken}` } })
      setLoading(false)
      handleClose()
    } catch (error) {
      toast.error(error.response.data.message || error.message)
      setLoading(false)
    }
  }

  const getProjectsList = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETPROJECTSLIST.path}/${userId}`, { headers : { 'Authorization' : `${getLoginToken}` } })
      if(res.status === 200){
        setProjectsList(res.data.list)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getProjectsList()
  },[projectsList])

  const memoizedProjects = useMemo(() => projectsList, [projectsList]);

  return <>
    <div className='m-5'>
      <div className='pb-5'>        
        <Button onClick={() => handleShow()}>Add Project</Button>

      </div>
      <div className='my-3 mx-3'>
        <Row xs={1} md={2} lg={3} xl={4} className="projectListArea g-4">
          {
            memoizedProjects.length > 0 ? memoizedProjects.map((e,i) => {
              return <AddProjectCard cardData={e} key={i}/>
            }) 
            : 
            <p className='emptyText text-center mx-auto'>No Projects Created</p>
          }
        </Row>
      </div>
    </div>

    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleAddProject}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" placeholder="Enter here" name='projectname' onChange={(e)=> setProjectName(e.target.value)}/>
          </Form.Group>        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Save Changes'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
}

export default HomeContent
import React, { useEffect, useState } from 'react'
import './ProjectCardContent.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { toast } from 'react-toastify'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function ProjectCardContent() {

    let { id } = useParams()
    let navigate = useNavigate()
    const [currentProjectCard, setCurrentProjectCard] = useState([])
    const getLoginToken = localStorage.getItem('loginToken')

    const getProjectData = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETCURRENTPROJECTDATA.path}/${id}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            // console.log(res.data.currentProjectData)
            if(res.status === 200){
                setCurrentProjectCard(res.data.currentProjectData)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=> {
        getProjectData()
    },[currentProjectCard])


    return <>
        <div className='mx-5 my-4'>
            <Breadcrumb>
                <Breadcrumb.Item style={{textTransform : 'uppercase'}} onClick={()=> navigate('/home')}>Home</Breadcrumb.Item>
                <Breadcrumb.Item style={{textTransform : 'uppercase'}} active>{currentProjectCard?.projectName}</Breadcrumb.Item>
            </Breadcrumb>

        </div>
    </>
}

export default ProjectCardContent
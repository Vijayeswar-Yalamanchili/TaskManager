import axios from 'axios'

const AxiosService = axios.create({
    baseURL : "http://localhost:8000",
    // baseURL : 'https://farmkettle.onrender.com',
    headers : {
        "Content-Type" :"application/json",
        Authorization : localStorage.getItem('loginToken')
    }
})

AxiosService.interceptors.request.use((config) => {
    const token = localStorage.getItem('loginToken')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},(error) => {
    return Promise.reject(error)
})

export default AxiosService
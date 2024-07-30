import { lazy, Suspense } from "react"
import LoadingComponent from '../components/common/loadingComponent/LoadingComponent'
import ErrorScreen from "../components/common/errorScreen/ErrorScreen"
import AuthenticationProtectedRoute from "../context/AuthenticationProtectedRoute"
// import AuthenticationProtectedRoute from '../context/AuthenticationProtectedRoute'

const LoginPage = lazy(()=> import('../pages/authentication/Login'))
const RegisterPage = lazy(()=> import('../pages/authentication/Register'))
const ForgotPasswordPage = lazy(()=> import('../pages/authentication/ForgotPassword'))
const HomePage = lazy(()=> import('../pages/tabs/Home'))

const AppRoutes = [
    {
        path : '/',
        element : <Suspense fallback={<LoadingComponent/>}><LoginPage/></Suspense>,
        exact : true
    },
    {
        path : '/register',
        element : <Suspense fallback={<LoadingComponent/>}><RegisterPage/></Suspense>,
        exact : true
    },
    {
        path : '/forgotpassword',
        element : <Suspense fallback={<LoadingComponent/>}><ForgotPasswordPage/></Suspense>,
        exact : true
    },
    {
        path : '/home',
        element : <Suspense fallback={<LoadingComponent/>}><><HomePage/></></Suspense>,
        exact : true
    },
    {
        path : '*',
        element : <ErrorScreen/>,
        exact : true
    },
]

export default AppRoutes
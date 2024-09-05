import { lazy, Suspense } from "react"
import LoadingComponent from '../components/common/loadingComponent/LoadingComponent'
import ErrorScreen from "../components/common/errorScreen/ErrorScreen"

const LoginPage = lazy(()=> import('../pages/authentication/Login'))
const RegisterPage = lazy(()=> import('../pages/authentication/Register'))
const ForgotPasswordPage = lazy(()=> import('../pages/authentication/ForgotPassword'))
const HomePage = lazy(()=> import('../pages/tabs/Home'))
const ProjectCardPage = lazy(() => import('../pages/tabs/ProjectCard'))
const ProfilePage = lazy(() => import('../pages/tabs/Profile'))

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
        path : '/home/:id',
        element : <Suspense fallback={<LoadingComponent/>}><><ProjectCardPage/></></Suspense>,
        exact : true
    },
    {
        path : '/profile',
        element : <Suspense fallback={<LoadingComponent/>}><><ProfilePage/></></Suspense>,
        exact : true
    },
    {
        path : '*',
        element : <ErrorScreen/>,
        exact : true
    },
]

export default AppRoutes
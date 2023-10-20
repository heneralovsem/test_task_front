import { Navigate } from "react-router-dom";
import LoginPage from '../pages/LoginPage'
import HomePage from "../pages/HomePage";
import DealsPage from "../pages/DealsPage";


export const privateRoutes = [
    {path: '/home', component: <HomePage/>},
    {path: '/deals', component: <DealsPage/>},
    {path: '/', component: <Navigate to= "/home" replace/> },
    {path: '/*', component: <Navigate to= "/home" replace/> },
    {path: '/login', component: <Navigate to= "/home" replace/> },
]
export const publicRoutes = [
    {path: '/home', component: <HomePage/>},
    {path: '/login', component: <LoginPage/>},
    {path: '/registration', component: <LoginPage/>},
    {path: '/', component: <Navigate to= "/login" replace/> },
    {path: '/*', component: <Navigate to= "/login" replace/> },
    {path: '/deals', component: <Navigate to= "/login" replace/> }, 
]
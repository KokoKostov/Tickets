import { Navigate, Outlet,  } from "react-router-dom"


const ProtectedRoutes= ()=>{
   
    const currentUser = localStorage.getItem('accessToken')
   return  currentUser? <Outlet/> : <Navigate to="/login"/>
   
}
export default ProtectedRoutes
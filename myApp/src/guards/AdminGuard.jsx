import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router-dom";

export default function AdminGuard(){
    const { user } = useContext(UserContext);
    if(user){
        if(user?._id != '67b0907d78c1cbe7a3cc01a2'){
            return <Navigate to={'/sunglasses'}/>
         }
    }

    return <Outlet/>
}
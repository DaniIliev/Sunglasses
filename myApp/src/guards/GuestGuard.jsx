import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export default function GuestGuard(){

    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    if(user){
       return <Navigate to={'/sunglasses'}/>
    }

    return <Outlet/>
}
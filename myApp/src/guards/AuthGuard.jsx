import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export default function AuthGuard(){

    const { user } = useContext(UserContext);
    console.log(user)
    if(!user){
       return <Navigate to={'/user/access'}/>
    }

    return <Outlet/>
}
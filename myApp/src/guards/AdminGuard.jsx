import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router-dom";

export default function AdminGuard(){
    const { user } = useContext(UserContext);
    if(user){
        if(user?._id != "6807dcbd98b4d26516707ce3"){
            return <Navigate to={'/sunglasses'}/>
         }
    }

    return <Outlet/>
}
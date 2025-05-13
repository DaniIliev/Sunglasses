import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router-dom";

export default function AdminGuard(){
    const { user } = useContext(UserContext);

        if(user && user?._id == "68092d56a17f6bacd78b1bc4" || user._id == '6807eb2a98b4d26516707d85'){
            return <Outlet/>
         }
         return <Navigate to={'/sunglasses'}/>
}
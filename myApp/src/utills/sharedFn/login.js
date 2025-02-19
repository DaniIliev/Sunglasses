import { decodeToken } from "../DecodeToken";
import * as userService from '../../services/userService'
import { REACT_APP_API_URL } from "../../env";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const apiUrl = REACT_APP_API_URL; 

export const login = async (formData, setUser) => {
  let user
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
          method: "POST",
          credentials: "include", // Това е необходимо за изпращане на бисквитки
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        // Проверка за HTTP грешка
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error("Login failed: " + errorData.message)
        }
  
        const data = await response.json();
        // Ако всичко е наред
        localStorage.setItem("token", data.token); // Save token
        const decodedUser = decodeToken(data.token);
              userService.findOneByID(decodedUser._id)
                        .then((res) => setUser(res))
        toast.success("✅ Welcome, you are now authorized!", {
            position: "top-center",  
            autoClose: 3000,        
            hideProgressBar: false, 
            closeOnClick: true,     
            pauseOnHover: true,     
            draggable: true,        
            theme: "colored",       
        });
        return {status: 200, message: "Logged in successfully!"};
      } catch (error) {
        toast.error("❌ An error occurred: " + error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
}
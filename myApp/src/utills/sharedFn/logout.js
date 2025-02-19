import { REACT_APP_API_URL } from "../../env";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
const apiUrl = REACT_APP_API_URL; 

export const logout = async (setUser) => {
    localStorage.removeItem("token");

    // Изпращане на заявка към бекенда за изчистване на сесията
    try {
      const response = await fetch(`${apiUrl}/users/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // Ако използваш бисквитки
    });
    setUser(null)
    toast.success("✅ You have successfully logged out", {
      position: "top-center",  
      autoClose: 3000,        
      hideProgressBar: false, 
      closeOnClick: true,     
      pauseOnHover: true,     
      draggable: true,        
      theme: "colored",       
    });
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
import { decodeToken } from "../DecodeToken";
import * as userService from '../../services/userService'
const apiUrl = process.env.REACT_APP_API_URL; 

export const login = async (formData, setUser) => {
    try {
        const response = await fetch(`https://sunglasses-992v.onrender.com/users/login`, {
          method: "POST",
          credentials: "include", // Това е необходимо за изпращане на бисквитки
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        // Проверка за HTTP грешка
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Грешка от сървъра:", errorData);
          alert("Login failed: " + errorData.message);
          return;
        }
  
        const data = await response.json();
        // Ако всичко е наред
        localStorage.setItem("token", data.token); // Save token
        const decodedUser = decodeToken(data.token);
              userService.findOneByID(decodedUser._id)
                        .then((user) => setUser(user))
        // setUser(decodedUser);
        alert("Logged in successfully!");
      } catch (error) {
        console.error("Грешка при fetch:", error);
        alert("An error occurred: " + error.message);
      }
}
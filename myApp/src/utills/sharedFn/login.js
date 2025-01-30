import { decodeToken } from "../DecodeToken";


export const login = async (formData, setUser) => {
    try {
        const response = await fetch("http://localhost:5200/users/login", {
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
        console.log(data);
        localStorage.setItem("token", data.token); // Save token
        const decodedUser = decodeToken(data.token);
        setUser(decodedUser);
        alert("Logged in successfully!");
      } catch (error) {
        console.error("Грешка при fetch:", error);
        alert("An error occurred: " + error.message);
      }
  
      console.log("Login Submitted");
}
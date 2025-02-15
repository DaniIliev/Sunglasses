import { REACT_APP_API_URL } from "../../env";
import { login } from "./login";

const apiUrl = REACT_APP_API_URL; 

export const register = async (formData, setUser) => {
    try {
        const response = await fetch(`${apiUrl}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        const loginData = {
            email: formData.email,
            password: formData.password
        }
        login(loginData, setUser)
        return {status: 0, message: "Registered successfully!"};
    } catch (error) {
        setMessage('Error registering user');
        console.error('Error:', error);
    }
}
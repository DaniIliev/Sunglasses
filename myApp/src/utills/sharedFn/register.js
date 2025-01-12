import { login } from "./login";

export const register = async (formData, setUser) => {
    console.log(formData.email)
    try {
        const response = await fetch('http://localhost:5200/users/register', {
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
    } catch (error) {
        setMessage('Error registering user');
        console.error('Error:', error);
    }
}
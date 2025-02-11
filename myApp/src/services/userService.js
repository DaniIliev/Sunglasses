import { REACT_APP_API_URL } from "../env";

const apiUrl = REACT_APP_API_URL; 
export const findOneByID = async (id) => {
    try {

        const response = await fetch(`${apiUrl}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const user = await response.json(); 

        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null; 
    }
};


export const patchUser = async (id, data) => {
    const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}), 
    });
}
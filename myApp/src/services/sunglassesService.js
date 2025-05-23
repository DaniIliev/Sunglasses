import { REACT_APP_API_URL } from "../env";

const apiUrl = REACT_APP_API_URL; 
export const getAll = async (startIndex, limit=12) => {
    const data = await fetch(`${apiUrl}/sunglasses`,
        {
            method: 'GET',
            credentials: 'include',
        }
    )
    const sunglasses = await data.json()

    return sunglasses
}

export const getById = async (id) => {
    const data = await fetch(`${apiUrl}/sunglasses/${id}`)
    const item = await data.json()
    return item
}
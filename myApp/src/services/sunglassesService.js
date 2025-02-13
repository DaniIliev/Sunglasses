import { REACT_APP_API_URL } from "../env";

const apiUrl = REACT_APP_API_URL; 
export const getAll = async () => {
    const data = await fetch(`${apiUrl}/sunglasses`)
    const sunglasses = await data.json()
    console.log(sunglasses)
    return sunglasses
}

export const getById = async (id) => {
    const data = await fetch(`${apiUrl}/sunglasses/${id}`)
    const item = await data.json()
    return item
}
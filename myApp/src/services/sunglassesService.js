import { REACT_APP_API_URL } from "../env";

const apiUrl = REACT_APP_API_URL; 
export const getAll = async () => {
    console.time('totalRequest')
    console.time('mongoQuery')
    const data = await fetch(`${apiUrl}/sunglasses`)
    console.timeEnd('mongoQuery')
    const sunglasses = await data.json()
    console.timeEnd('totalRequest')

    return sunglasses
}

export const getById = async (id) => {
    const data = await fetch(`${apiUrl}/sunglasses/${id}`)
    const item = await data.json()
    return item
}
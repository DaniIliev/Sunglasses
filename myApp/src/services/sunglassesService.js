const apiUrl = process.env.REACT_APP_API_URL; 

export const getAll = async () => {
    const data = await fetch(`${apiUrl}/sunglasses`)
    const sunglasses = await data.json()
    return sunglasses
}

export const getById = async (id) => {
    const data = await fetch(`${apiUrl}/${id}`)
    const item = await data.json()
    return item
}
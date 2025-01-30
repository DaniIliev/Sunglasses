
export const getAll = async () => {
    const data = await fetch(`http://localhost:5200/sunglasses`)
    const sunglasses = await data.json()
    return sunglasses
}

export const getById = async (id) => {
    const data = await fetch(`http://localhost:5200/sunglasses/${id}`)
    const item = await data.json()
    return item
}
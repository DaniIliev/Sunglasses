export const getSunglasses= async (type) => {
    // if(type == 'all'){
    //     responce = await fetch(`https://react-demo-a5b29-default-rtdb.firebaseio.com/recipes.json`)
    // }else{
    //     responce = await fetch(`https://react-demo-a5b29-default-rtdb.firebaseio.com/recipes/${type}.json`)
    // }
    const responce = await fetch(`https://sunglasses-5a7b3-default-rtdb.firebaseio.com/sunglasses.json`)
    const result = await responce.json()
    return result
}
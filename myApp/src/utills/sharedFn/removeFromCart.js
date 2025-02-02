import * as userService from '../../services/userService'

export const removeFromCart = (user, setUser, idToRemove) => {
    const index = user.cart.findIndex(el => el.id === idToRemove); 
    if (index !== -1) {  
        user.cart.splice(index, 1);  
    } 
    const data = {
        itemIDs: user.cart,
        type: "deleteFromCart"
    }
    console.log(user.cart)
    userService.patchUser(user._id, data)
            .then(result => {
            setUser((prevUser) => ({
                ...prevUser,
                cart: user.cart
                }));
            })
            .catch(error => console.log(error))
}
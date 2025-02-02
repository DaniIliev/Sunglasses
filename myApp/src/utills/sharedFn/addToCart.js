import * as userService from '../../services/userService'

export const addToCart = (user, setUser, id, quantity) => {
    const data = {
      id: id,
      type: "addToCart",
      quantity: quantity,
    };
    userService
      .patchUser(user._id, data)
      .then((result) => {
            if(user.cart.length <= 0){
              setUser((prevUser) =>({
                ...prevUser,
                cart: [{id: id, quantity: quantity}]
              }))
            }else{
              setUser((prevUser) => ({
                ...prevUser,
                cart: [...prevUser.cart, {id: id, quantity: quantity}]
              }))
            }
        })
      .catch((error) => console.log(error));
  };
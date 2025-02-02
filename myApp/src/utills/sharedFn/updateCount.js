import * as userService from '../../services/userService'

export const updateCount = (user, setUser, id, quantity) => {
    const index = user.cart.findIndex(el => el.id === id); 
    user.cart[index].quantity = quantity
    const data = {
      id: id,
      type: "updateCount",
      quantity: quantity,
      newUser: user
    };
    
    userService
      .patchUser(user._id, data)
      .then((result) => {
          const existingItemIndex = user.cart.findIndex(item => item.id === id);  
          if (existingItemIndex >= 0) {   
            setUser((prevUser) => {  
              const updatedCart = [...prevUser.cart];  
              updatedCart[existingItemIndex].quantity = quantity;   
              return { ...prevUser, cart: updatedCart };  
            });  
          } else {  
            setUser((prevUser) => ({  
              ...prevUser,  
              cart: [...prevUser.cart, { id: id, quantity: quantity }]  
            }));  
          }
        })
      .catch((error) => console.log(error));
  };
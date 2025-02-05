import * as sunglassesService from '../../services/sunglassesService'

export const fetchItemsInCart = async (user) => {
      try {  
        const items = await Promise.all(  
          user?.cart.map(async (item) => {  
            const product = await sunglassesService.getById(item.id);  
            return { ...product, quantity: item.quantity }; 
          })  
        ); 
        return items;
        // setAllItems(items);  
      } catch (error) {  
        console.error(error);  
      }    
}
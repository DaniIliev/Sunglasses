import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './CartDropdown.css'
import { IoIosClose } from "react-icons/io";
import { UserContext } from '../../../context/UserContext';
import { fetchItemsInCart } from '../../../utills/sharedFn/fetchItemsInCart';
import { removeFromCart } from '../../../utills/sharedFn/removeFromCart';
const CartDropdown = ({setIsShippingHovered,isShippingHovered}) => {
  const {user, setUser} = useContext(UserContext);
  const [allItems, setAllItems] = useState([])

  useEffect(() => { 
    if(user){
      fetchItemsInCart(user)
          .then((items) => setAllItems(items))
    }
  }, [user?.cart])

  const handleDelete = (el) => {
    console.log('delete')
    removeFromCart(user, setUser, el)
  }
  return (
<>
{/* {isShippingHovered ?  */}
    <div onMouseLeave={() => setIsShippingHovered(!isShippingHovered)} className={isShippingHovered ? 'cartDropdown open' : 'cartDropdown closed'}>
      {allItems.map(item => 
      <div className='aboutItem' key={item._id}>
          <img src="/images/COPY1.webp" alt="" width={100}/>
          <div className="sumaryInfo">
            <p>{item.name}</p>
            <p>QTY: {item.quantity}</p>
            <p>PRICE: {item.price}$</p>
          </div>
          <IoIosClose className='close2' onClick={() => handleDelete(item._id)}/>
      </div>
      )}
      <p>Total price: 600$</p>
      <p>All Item(s) are shipped from Bulgaria. View further shipping info <strong>HERE</strong>. All orders are processed in EURO€</p>
      <div className="buttons">
        <Link className='viewCart'>View cart</Link>
        <Link className='ckeckout'>Checkout</Link>
      </div>
    </div>
     {/* : ''
} */}
</>
)}

export default CartDropdown
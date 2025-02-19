import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import './CartDropdown.css'
import { IoIosClose } from "react-icons/io";
import { UserContext } from '../../../context/UserContext';
import { fetchItemsInCart } from '../../../utills/sharedFn/fetchItemsInCart';
import { removeFromCart } from '../../../utills/sharedFn/removeFromCart';
import { useTranslation } from 'react-i18next';
const CartDropdown = ({setIsShippingHovered,isShippingHovered}) => {
  const {user, setUser} = useContext(UserContext);
  const [allItems, setAllItems] = useState([])

  useEffect(() => { 
    if(user){
      fetchItemsInCart(user)
          .then((items) => setAllItems(items))
    }
  }, [user?.cart])

  const {t, i18n} = useTranslation()

  const handleDelete = (el) => {
    removeFromCart(user, setUser, el)
  }
  return (
<>
    <div onMouseLeave={() => setIsShippingHovered(!isShippingHovered)} className={isShippingHovered ? 'cartDropdown open' : 'cartDropdown closed'}>
      {allItems.map(item => 
      <div className='aboutItem' key={item._id}>
          <img src={item.images[0]} alt="itemImage" width={100}/>
          <div className="sumaryInfo">
            <p>{item.name}</p>
            <p>QTY: {item.quantity}</p>
            <p>PRICE: {item.price} лв</p>
          </div>
          <IoIosClose className='close2' onClick={() => handleDelete(item._id)}/>
      </div>
      )}
      {allItems?.length == 0 &&
        <div className="dropDownCartIsEmty">
            <img src="/images/shoppingCart.png" alt="shoppingCart" width={100}/>
            <h1>{t('shoppingCart.textIfNoAddedItems')}</h1>
        </div>}
      <p>Total price: {allItems.reduce((sum, item) => sum + Number(item.price), 0)} лв</p>
      <p>All Item(s) are shipped from Bulgaria. View further shipping info <strong>HERE</strong>. All orders are processed in EURO€</p>
      <div className="buttons">
        <Link className='viewCart' to='/cart'>View cart</Link>
        <Link className='ckeckout' to='/cart'>Checkout</Link>
      </div>
    </div>
     {/* : ''
} */}
</>
)}

export default CartDropdown
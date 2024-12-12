import React from 'react'
import { Link } from 'react-router-dom';
import './CartDropdown.css'
import { IoIosClose } from "react-icons/io";

const CartDropdown = ({setIsShippingHovered,isShippingHovered}) => {
  console.log(isShippingHovered)
  return (
<>
{isShippingHovered ? 
    <div className='cartDropdown' onMouseLeave={() => setIsShippingHovered(!isShippingHovered)}>
      <div className='aboutItem'>
          <img src="/images/COPY1.webp" alt="" width={100}/>
          <div className="sumaryInfo">
            <p>OUTTA LOVE | TORT</p>
            <p>QTY: 1</p>
            <p>PRICE: 600$</p>
          </div>
          <IoIosClose className='close2'/>
      </div>
      
      <p>Total price: 600$</p>
      <p>All Item(s) are shipped from Bulgaria. View further shipping info <strong>HERE</strong>. All orders are processed in EURO€</p>
      <div className="buttons">
        <Link className='viewCart'>View cart</Link>
        <Link className='ckeckout'>Checkout</Link>
      </div>
    </div> : ''
    }
</>
)}

export default CartDropdown
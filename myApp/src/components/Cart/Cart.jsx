import React from 'react'
import './Cart.css'
import { FaMinus } from "react-icons/fa6";
import '../Details/Details.css'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
const Cart = () => {
  return (
    <div className='cart'>
        <div className="titles">
            <p>HOME / CART</p>
            <h2>Your Cart</h2>
        </div>
        <div className="tableInfo">
            <p>PRODUCT DETAILS</p>
            <p>PRICE</p>
            <p>QUANTITY</p>
            <p>TOTAL</p>
        </div>
        <div className="summaryStocks">
            <div className="stock">
                <div className='imagesTitle'>
                    <img src="/images/COPY1.webp" alt="" width={100}/>
                    <h5>NO BIGGIE | PEWTER-SMOKE MONO</h5>
                </div>
                <div className='prices'>
                    <h5>600,00$</h5>
                    <h4>500,00$</h4>
                    <p>-10%</p>
                </div>
                <div className='counter'>
                    <p className='plusMinus'><FaMinus /></p>
                    <p>0</p>
                    <p className='plusMinus'><FaPlus /></p>
                </div>
                <h4 className='total'>500,00$</h4>
                <IoMdCloseCircleOutline className='close'/>
            </div>
        </div>
        <div className='cartItems'>
        </div>
    </div>
  )
}

export default Cart
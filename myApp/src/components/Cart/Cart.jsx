import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { FaMinus } from "react-icons/fa6";
import '../Details/Details.css'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { UserContext } from '../../context/UserContext';
import * as userService from '../../services/userService'
import { fetchItemsInCart } from '../../utills/sharedFn/fetchItemsInCart';
import { removeFromCart } from '../../utills/sharedFn/removeFromCart';
import { addToCart } from '../../utills/sharedFn/addToCart';
import { updateCount } from '../../utills/sharedFn/updateCount';
const Cart = () => {
    const {user, setUser} = useContext(UserContext)
    const [allItems, setAllItems] = useState([])
    
    useEffect(() => {
        if(user){
            fetchItemsInCart(user, setAllItems)
        }
    },[user])

    const onHandleRemove = (el) => {
        removeFromCart(user, setUser, el)
    }

    const updateCnt = (id, quantity) => {
        updateCount(user, setUser, id, quantity)
    }
  return (
    <>
    <div className='cart'>
        <div className="titles">
            <p>HOME / CART</p>
            <h2>Your Cart</h2>
        </div>
        <div className='scrollbarTabelle'>
        <table className='table'>
            <tr>
                <th>Photo</th>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th>Total price</th>
            </tr>
            {allItems.map(item => 
            <tr>
                <td><img src="/images/COPY1.webp" alt="" width={100}/></td>
                <td>{item.name}</td>
                <td>
                    <div className='counterTD'>
                        <div className='counter'>
                            <p className='plusMinus'><FaMinus 
                            onClick={() => 
                            item.quantity > 1 && updateCnt(item._id, item.quantity - 1)} 
                            disabled={item.quantity === 1} 
                            /></p>
                            <p>{item.quantity}</p>
                            <p className='plusMinus'><FaPlus  onClick={() => updateCnt(item._id, item.quantity + 1)}/></p>
                        </div>
                        <IoMdCloseCircleOutline className='del' onClick={() => onHandleRemove(item._id)}/>
                    </div>
                </td>
                <td>
                     <div className='prices'>
                        <h5>{item.oldPrice ? item.oldPrice : ''}</h5>
                        <h4>{item.price}</h4>
                        <p>{item.oldPrice ?`-${Math.round((((item.oldPrice - item.price) / item.oldPrice) * 100) / 10) * 10}${'%'}`: ''}</p>
                    </div>
                </td>
                <td>
                    <h4>{item.price * item.quantity}</h4>
                </td>
            </tr>
            )}
        </table> 
        </div>
        <div className='cartItems'>
        </div>
    </div>
    </>
  )
}

export default Cart
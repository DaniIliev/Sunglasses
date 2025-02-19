import React from 'react'
import './Popup.css';  
import { Link } from 'react-router-dom';

const AddToCartPopup = ({ product, onClose }) => {
  return (  
    <div className="popup-overlay">  
        <div className="popup">  
            <button className="close-btn" onClick={onClose}>✖</button>  
            <div className='aboutAddedItem'>
                <div className='item'>
                    <img src={product?.images[0]} alt={product?.name} className="popup-image" />  
                    <h4>{product?.name}</h4>  
                </div>
                <p>Добавихте <strong>{product?.name}</strong> към вашата количка!</p>  
            </div> 
                
            <Link to='/cart'><button className="cart-btn">Към количката</button></Link>
        </div>  
    </div>  
);  
}

export default AddToCartPopup
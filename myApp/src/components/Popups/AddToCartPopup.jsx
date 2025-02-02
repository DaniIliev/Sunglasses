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
                    <img src='/images/COPY6.webp' alt={product?.name} className="popup-image" />  
                    <h4>NO BIGGIE | PEWTER-SMOKE MONO</h4>  
                </div>
                <p>Добавихте <strong>NO BIGGIE | PEWTER-SMOKE MONO</strong> към вашата количка!</p>  
            </div> 
                
            <Link to='/cart'><button className="cart-btn">Към количката</button></Link>
        </div>  
    </div>  
);  
}

export default AddToCartPopup
import React from 'react'
import { FaUser } from "react-icons/fa";
import './UserDropdown.css'

const UserDropdown = ({setIsUserIconHovered,isUserIconHovered}) => {
    console.log(isUserIconHovered)

  return (
    <>
    {/* {isUserIconHovered ? console.log('work') : ''} */}
    {isUserIconHovered ? 
        <div className='userDropdown' onMouseLeave={() => setIsUserIconHovered(!isUserIconHovered)}>
        <div className='notAuthorizedUsers'>
            <div className="signInORsignUp">
                <p><FaUser /> Sign in</p>
                <p>Create account</p>
            </div>
            <div className="fields">
                <input type="text" placeholder='EMAIL ADDRESS*' />
                <input type="password" placeholder='PASSWORD*'/>
            </div>
            <div>
                <label class="container">Remember me - I want Vistglasses to personalise my shopping experience
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                </label>
                <div className="signInBTN">Sign in</div>
                <hr className='hr-text gradient' data-content='OR'/>
                <div className="anotherwaytosignin">
                    <img src="/images/facebook.png" alt="" width={50}/>
                    <img src="/images/google.png" alt="" width={50}/>
                    <img src="/images/apple.png" alt="" width={50} className='apple'/>
                </div>  
            </div>
        </div>
    </div>
    : ''
    }
    </>
  )
}

export default UserDropdown
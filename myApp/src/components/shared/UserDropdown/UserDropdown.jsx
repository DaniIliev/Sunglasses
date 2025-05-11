import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import "./UserDropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

import { logout } from "../../../utills/sharedFn/logout";
import { login } from "../../../utills/sharedFn/login";
import { register } from "../../../utills/sharedFn/register";
import { useTranslation } from "react-i18next";

const UserDropdown = ({ setIsUserIconHovered, isUserIconHovered }) => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {t} = useTranslation()
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (type) => {
    type == 'signIn' ? 
        await login(formData, setUser)
        : await register(formData, setUser)
  };

  const handleLogout = async () => {
    await logout(setUser);
    navigate("/");
  };
  return (
    <>
      {/* {isUserIconHovered ? console.log('work') : ''} */}
      {isUserIconHovered && user ? (
        <div
          className="userDropdown"
          onMouseLeave={() => setIsUserIconHovered(!isUserIconHovered)}
        >
          <div className="authorizedUsers">
            <Link to="/orders">
              <p>{t('My Orders')}</p>
            </Link>
            <Link onClick={handleLogout}><p>{t('Logout')}</p></Link>
          </div>
        </div>
      ) : (
        ''
        // ""
        // <div
        //   className="userDropdown"
        //   onMouseLeave={() => setIsUserIconHovered(!isUserIconHovered)}
        // >
        //   {isSignInForm ? 
        //   <div className="notAuthorizedUsers SignIN">
        //     <div className="signInORsignUp">
        //       <p>
        //         <FaUser /> Sign in
        //       </p>
        //       <p onClick={() => setIsSignInForm(false)}>Create account</p>
        //     </div>
        //     <div className="fields">
        //       <input
        //         type="text"
        //         name="email"
        //         value={formData.email}
        //         onChange={onHandleChange}
        //         placeholder="EMAIL ADDRESS*"
        //       />
        //       <input
        //         type="password"
        //         name="password"
        //         value={formData.password}
        //         onChange={onHandleChange}
        //         placeholder="PASSWORD*"
        //       />
        //     </div>
        //     <div>
        //       <div className="signInBTN" onClick={() => handleSubmit('signIn')}>
        //         Sign in
        //       </div>
        //       <hr className="hr-text gradient" data-content="OR" />
        //       <div className="anotherwaytosignin">
        //         <img src="/images/facebook.png" alt="" width={50} />
        //         <img src="/images/google.png" alt="" width={50} />
        //         <img
        //           src="/images/apple.png"
        //           alt=""
        //           width={50}
        //           className="apple"
        //         />
        //       </div>
        //     </div>
        //   </div>
        //   :
        //   <div className="notAuthorizedUsers SignUP">
        //     <div className="signInORsignUp">
        //       <p>
        //         <FaUser /> Sign up
        //       </p>
        //       <p onClick={() => setIsSignInForm(true)}>I already have an account</p>
        //     </div>
        //     <div className="fields">
        //       <input
        //         type="text"
        //         name="username"
        //         value={formData.username}
        //         onChange={onHandleChange}
        //         placeholder="USERNAME*"
        //       />
        //       <input
        //         type="text"
        //         name="email"
        //         value={formData.email}
        //         onChange={onHandleChange}
        //         placeholder="EMAIL ADDRESS*"
        //       />
        //       <input
        //         type="password"
        //         name="password"
        //         value={formData.password}
        //         onChange={onHandleChange}
        //         placeholder="PASSWORD*"
        //       />
        //     </div>
        //     <div>
        //       <div className="signInBTN" onClick={() => handleSubmit('signUp')}>
        //         Sign up
        //       </div>
        //       <hr className="hr-text gradient" data-content="OR" />
        //       <div className="anotherwaytosignin">
        //         <img src="/images/facebook.png" alt="" width={50} />
        //         <img src="/images/google.png" alt="" width={50} />
        //         <img
        //           src="/images/apple.png"
        //           alt=""
        //           width={50}
        //           className="apple"
        //         />
        //       </div>
        //     </div>
        //   </div>
        //   }
        // </div>
      )}
    </>
  );
};

export default UserDropdown;

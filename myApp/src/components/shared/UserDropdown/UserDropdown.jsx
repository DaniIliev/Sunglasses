import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import "./UserDropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { decodeToken } from "../../../utills/DecodeToken";
import { logout } from "../../../utills/sharedFn/logout";
import { login } from "../../../utills/sharedFn/login";

const UserDropdown = ({ setIsUserIconHovered, isUserIconHovered }) => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData, setUser)
    navigate('/')
  };

  const handleLogout = async () => {
   await logout(setUser) 
   console.log('logout ok')
   navigate('/')
  }
  return (
    <>
      {/* {isUserIconHovered ? console.log('work') : ''} */}
      {isUserIconHovered && user ? (
        <div className="userDropdown" 
        onMouseLeave={() => setIsUserIconHovered(!isUserIconHovered)}
        >
            <div className="authorizedUsers">
            <Link to='/orders'><p>My Orders</p></Link>
            <p onClick={handleLogout}>Logout</p>
            </div>
        </div>
      ) : (
        // ""
        <div
          className="userDropdown"
          onMouseLeave={() => setIsUserIconHovered(!isUserIconHovered)}
        >
          <div className="notAuthorizedUsers">
            <div className="signInORsignUp">
              <p>
                <FaUser /> Sign in
              </p>
              <p>Create account</p>
            </div>
            <div className="fields">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={onHandleChange}
                placeholder="EMAIL ADDRESS*"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onHandleChange}
                placeholder="PASSWORD*"
              />
            </div>
            <div>
              {/* <label class="container">Remember me - I want Vistglasses to personalise my shopping experience
                  <input type="checkbox" />
                  <span class="checkmark"></span>
              </label> */}
              <div className="signInBTN" onClick={handleSubmit}>
                Sign in
              </div>
              <hr className="hr-text gradient" data-content="OR" />
              <div className="anotherwaytosignin">
                <img src="/images/facebook.png" alt="" width={50} />
                <img src="/images/google.png" alt="" width={50} />
                <img
                  src="/images/apple.png"
                  alt=""
                  width={50}
                  className="apple"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDropdown;

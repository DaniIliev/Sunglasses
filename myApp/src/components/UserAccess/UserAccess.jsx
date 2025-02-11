import React, { useContext, useEffect, useState } from "react";
import "./UserAccess.css"; // Уверете се, че имате CSS файла
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { register } from "../../utills/sharedFn/register";
import { login } from "../../utills/sharedFn/login";

const UserAccess = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {

  }, [isSignIn]);

  const handleSignUp = async () => {
    await register(formData, setUser);
    navigate("/");
  };

  const handleSingIn = async (e) => {
    e.preventDefault()
    console.log(formData)
    await login(formData, setUser)
    navigate('/')
  };
  return (
    <div
      // className="containerAutorized"
      className={`containerAutorized ${isSignIn ? 'sign-in' : 'sign-up'}`} 
      id="container"

    >
      {isSignIn}
      <div
        className={`form-container ${
          isSignIn ? "sign-in-container" : "sign-up-container"
        }`}
      >
        {isSignIn ? (
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <img src="/images/facebook.png" alt="facebook" width={50} />
              <img src="/images/google.png" alt="google" width={50} />
              <img src="/images/apple.png" alt="apple" width={50} />
            </div>
            <span>or use your account</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email..."
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password..."
            />
            <p className="typeSubmitSignIn" type="submit" onClick={handleSingIn}>
              Sign In
            </p>
          </form>
        ) : (
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <img src="/images/facebook.png" alt="facebook" width={50} />
              <img src="/images/google.png" alt="google" width={50} />
              <img src="/images/apple.png" alt="apple" width={50} />
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email..."
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password..."
            />
            <div className="allreadyHaveAcc">
                <p>I already have an account</p>
                <p className="SignInBTNPHONE" onClick={() => setIsSignIn(true)}>Sing in</p>
            </div>
            <p
              className="typeSubmitSignUp"
              type="submit"
              onClick={handleSignUp}
            >
              Sign Up
            </p>
          </form>
        )}
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div
            className={`overlay-panel overlay-right ${isSignIn ? 'active' : ''}`}
          >
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <p className="signUp" id="signUp" onClick={() => setIsSignIn(false)}>
              Sign Up
            </p>
          </div>
          <div
            className={`overlay-panel overlay-left ${isSignIn ? '' : 'active'}`}
          >
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <p
              className="signIn"
              id="signIn"
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccess;

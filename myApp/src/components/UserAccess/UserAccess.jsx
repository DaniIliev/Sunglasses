import React, { useContext, useEffect, useState } from "react";
import "./UserAccess.css"; // Уверете се, че имате CSS файла
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { register } from "../../utills/sharedFn/register";
import { login } from "../../utills/sharedFn/login";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const UserAccess = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {t} = useTranslation()
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {

  }, [isSignIn]);


  const handleSubmit = async (type) => {
    type == 'signIn' ? 
    await login(formData, setUser)
            .then(result => result.status == 200 && navigate('/sunglasses'))

    : await register(formData, setUser)
            .then(result => result.status == 200 && navigate('/sunglasses'))

  }
  return (
    <>

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
            <h1>
            {t('Sign in')}</h1>
            {/* <div className="social-container">
              <img src="/images/facebook.png" alt="facebook" width={50} />
              <img src="/images/google.png" alt="google" width={50} />
              <img src="/images/apple.png" alt="apple" width={50} />
            </div> */}
            {/* <span>or use your account</span> */}
            <TextField
              type="email"
              name="email"
              label={'Email'}
              value={formData.email}
              onChange={handleChange}
              variant="standard"
              required
              placeholder="Email..."
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              label={'Pasword'}
              value={formData.password}
              onChange={handleChange}
              required
              variant="standard"
              placeholder="Password..."
              fullWidth
            />
            <div className="allreadyHaveAcc">
                  <p>
                  {t('I don\'t have an account yet')}:</p>
                  <p className="SignInBTNPHONE" onClick={() => setIsSignIn(false)}>Sing up</p> 
            </div>
            <p className="typeSubmitSignIn" type="submit" onClick={() => handleSubmit('signIn')}>
              {t('Sign in')}
            </p>
          </form>
        ) : (
          <form action="#">
            <h1>
            {t('Create Account')}
              </h1>
            {/* <div className="social-container">
              <img src="/images/facebook.png" alt="facebook" width={50} />
              <img src="/images/google.png" alt="google" width={50} />
              <img src="/images/apple.png" alt="apple" width={50} />
            </div>
            <span>or use your email for registration</span> */}

            <TextField
              name='username'
              label={'Username'}
              variant="standard"
              value={formData.username}
              onChange={handleChange}
              // sx={{marginBottom: 2}}
              fullWidth
            />
            <TextField
              type="email"
              name="email"
              label={'Email'}
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email..."
              variant="standard"
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              label={'Password'}
              value={formData.password}
              onChange={handleChange}
              required
              variant="standard"
              placeholder="Password..."
              fullWidth
            />
            <div className="allreadyHaveAcc">
              <p>{t('I already have an account')}:</p>
              <span><p className="SignInBTNPHONE" onClick={() => setIsSignIn(true)}>Sing in</p></span>
            </div>
            <p
              className="typeSubmitSignUp"
              type="submit"
              onClick={() => handleSubmit('signUp')}
            >
              {t('Sign Up')}
            </p>
          </form>
        )}
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div
            className={`overlay-panel overlay-right ${isSignIn ? 'active' : ''}`}
          >
            <h1>{t('Hello, Friend!')}</h1>
              <p>{t('Enter your personal details and start your journey with us')}</p>
            <p className="signUp" id="signUp" onClick={() => setIsSignIn(false)}>
              {t('Sign Up')}
            </p>
          </div>
          <div
            className={`overlay-panel overlay-left ${isSignIn ? '' : 'active'}`}
          >
            <h1>
            {t('Welcome Back')}!</h1>
            <p>
            {t('To keep connected with us please login with your personal info')}
              
            </p>
            <p
              className="signIn"
              id="signIn"
              onClick={() => setIsSignIn(true)}
            >
              {t('Sign in')}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default UserAccess;

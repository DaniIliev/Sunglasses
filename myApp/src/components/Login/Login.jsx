import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { UserContext } from '../../context/UserContext';
import { decodeToken } from '../../utills/DecodeToken';
import { login } from '../../utills/sharedFn/login';

const Login = () => {
  const { user , setUser} = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

const navigate = useNavigate()
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      await login(formData, setUser)
      navigate('/')
    };
    
  return (
        <form action="" className='login'>
            <h2>Sign in</h2>
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
            <Link className='signIn' onClick={handleSubmit}>Sign in</Link>

            <div className='dontHaveAcc'>
                <p>I don't have an account</p>
                <Link className='createAcc' to='/user-register'>Create an account</Link>
            </div>
        </form>

  )
}

export default Login
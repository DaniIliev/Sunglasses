import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
const Login = () => {
  return (
    <div>
        <form action="" className='login'>
            <h2>Sign in</h2>
            <input type="text" id="email" name="email" placeholder="Email.."/>
            <input type="password" id="password" name="password" placeholder="Password.."/>
            <Link className='signIn'>Sign in</Link>

            <div className='dontHaveAcc'>
                <p>I don't have an account</p>
                <Link className='createAcc'>Create an account</Link>
            </div>
        </form>
    </div>
  )
}

export default Login
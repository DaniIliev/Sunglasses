import React from 'react'
import '../Login/Login.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
    <form action="" className='register'>
        <h2>Sign up</h2>
        <input type="text" id="email" name="email" placeholder="Email.."/>
        <input type="password" id="password" name="password" placeholder="Password.."/>
        <Link className='signUp'>Sign up</Link>

        <div className='dontHaveAcc'>
            <p>I already have an account</p>
            <Link to='/user-login' className='alreadyHaveAcc'>Sign in</Link>
        </div>
    </form>

</div>
  )
}

export default Register
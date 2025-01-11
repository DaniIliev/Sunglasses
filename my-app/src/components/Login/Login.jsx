import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
const Login = () => {
  return (
    <div className='pageDiv'>
        <form action="" className='login'>
            <h2>Sign in</h2>
            <input type="text" id="email" name="email" placeholder="Email.."/>
            <input type="password" id="password" name="password" placeholder="Password.."/>
            <Link className='signIn'>Sign in</Link>

            <div className='dontHaveAcc'>
                <p>I don't have an account</p>
                <Link className='createAcc' to='/user-register'>Create an account</Link>
            </div>
        </form>
            <div className="imagesbox">
                <div className="singleBoxImage">
                  <img src="/images/sunglasses3.jpg" alt="Slide 1" />
                  <div className="text">Manage Your Orders</div>
                </div>

                <div className="singleBoxImage">
                  <img src="/images/scr2.jpeg" alt="Slide 2"/>
                  <div className="text">Track Your Account Benefits</div>
                </div>

                <div className="singleBoxImage">
                  <img src="/images/test4.png" alt="Slide 3" />
                  <div className="text">Enjoy Exclusive Offers</div>
                </div>
                <div className="singleBoxImage">
                  <img src="/images/test2.png" alt="Slide 3" />
                  <div className="text">Enjoy Exclusive Offers</div>
                </div>
              </div>
    </div>
  )
}

export default Login
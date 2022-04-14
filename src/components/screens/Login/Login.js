import React, { useContext } from 'react'
import {Link} from 'react-router-dom';

import {Helmet} from 'react-helmet'

import './Login.css'
import AuthContext from '../../../context/AuthContext';


const Login = () => {
  let {loginUser,errMessage} = useContext(AuthContext)

  return (
    <section id="login" className="wrapper">
      <Helmet><title>Ecommerce App| Login</title></Helmet>
        <form className="content" onSubmit={loginUser}>            
            <h1>Login</h1>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter your username" name="username" id="username"/>
            <p className="error-message">{errMessage && errMessage["username"]}</p>

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter your password" name="password" id="password"/>
            <p className="error-message">{errMessage && errMessage["password"]}</p>

            <p className="error-message">{errMessage && errMessage["detail"]}</p>   
            <button type="submit">Login</button>

            <Link to="/signup">Create Account</Link>
        </form>
    </section>

  )
}

export default Login
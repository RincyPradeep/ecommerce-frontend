import React,{useContext} from 'react'
import {Link} from 'react-router-dom';

import {Helmet} from 'react-helmet'

import './Signup.css'
import AuthContext from '../../../context/AuthContext';

const Signup = () => {
  let {createUser,errMessage} = useContext(AuthContext)

  return (
    <section id="signup" className="wrapper">
      <Helmet><title>Ecommerce App| Signup</title></Helmet>
        <form className="content" onSubmit={createUser} >
            <h1>Signup</h1>           
                <label htmlFor='first_name'>First Name</label>
                <input type="text" name="first_name" id='first_name' required />

                <label htmlFor='last_name'>Last Name</label>
                <input type="text" name="last_name" id='last_name' />

                <label htmlFor='email'>Email</label>
                <input type="email" name="email" id='email' required/> 

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Enter your username" name="username" id="username" required />
                <p className="error-message">{errMessage && errMessage["username"]}</p>

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter your password" name="password" id="password" required/>
                <p className="error-message">{errMessage && errMessage["password"]}</p>
    
                <button type="submit">Create Account</button>

                <Link to="/login">Login</Link>
        </form>
    </section>
  )
}

export default Signup
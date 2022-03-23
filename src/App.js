import React from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


import Header from './components/includes/Header/Header';
import Home from './components/screens/Home/Home';
import Footer from './components/includes/Footer/Footer';
import SingleProduct from './components/screens/SingleProduct/SingleProduct';
import Cart from './components/screens/Cart/Cart';
import Login from './components/screens/Login/Login';
import Checkout from './components/screens/Checkout/Checkout';
import Order from './components/screens/Order/Order';
import Signup from './components/screens/Signup/Signup';
import Profile from './components/screens/Profile/Profile';


function App() { 
  return (
    <div>
      <Router>
        <AuthProvider>
        <CartProvider>
            <Header />     
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route path='/product/:id' element={<SingleProduct/>} />
              <Route path='/cart/:id' element={<Cart />} />
              <Route path='/checkout' element={<Checkout/>} />
              <Route path='/orders' element={<Order/>} />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/profile' element={<Profile/>} />
            </Routes>
            <Footer/>
          </CartProvider>
         </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

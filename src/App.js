import React from 'react'
import { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/ProductContext';

import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from './components/includes/Header/Header';
import Home from './components/screens/Home/Home';
import Footer from './components/includes/Footer/Footer';
import SingleProduct from './components/screens/SingleProduct/SingleProduct';
import Cart from './components/screens/Cart/Cart';
import Wishlist from './components/screens/Wishlist/Wishlist';
import Login from './components/screens/Login/Login';
import Checkout from './components/screens/Checkout/Checkout';
import Order from './components/screens/Order/Order';
import Signup from './components/screens/Signup/Signup';
import Profile from './components/screens/Profile/Profile';


function App() { 
  return (
    <>
      <Router>
        <AuthProvider>
        <CartProvider>
            <Header />    
            <Toaster /> 
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route path='/product/:id' element={<SingleProduct/>} />
              <Route path='/cart/:id' element={<Cart />} /> 
              <Route path='/wishlist/:id' element={<Wishlist />} />             
              <Route path='/place-order' element={<Checkout />} />             
              <Route path='/orders/:id' element={<Order/>} />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/profile' element={<Profile/>} />
            </Routes>
            <Footer/>
        </CartProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

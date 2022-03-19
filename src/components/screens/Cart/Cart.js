import React, { useState, useEffect, useContext } from "react";
import "./Cart.css";
import { Link ,useParams} from "react-router-dom";
import axios from 'axios'
// import product from "../../../assets/images/products/studytable.jpeg";
import CloseIcon from "@material-ui/icons/Close";
import AuthContext from "../../../context/AuthContext";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [products,setProducts] = useState([])
  const { id } = useParams()
  let {authTokens, logoutUser} = useContext(AuthContext)

  useEffect(()=>{
    getProducts()
    getCart()
  },[])

  const getProducts = async() =>{
    await axios.get('http://localhost:8000/api/v1/products/').then((response)=>{
      setProducts(response.data.data);
    }).catch(err=>{
      alert(err)
  })
  }

  let getCart = async() =>{
    let response = await fetch(`http://localhost:8000/api/v1/products/cart/${id}`, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
    let data = await response.json()
    console.log("DATA in Cart:",data.data)

    if(response.status === 200){
        setCarts(data.data)
    }else if(response.statusText === 'Unauthorized'){
        logoutUser()
    }   
}

  return (
    <section id="cart" className="container">
      {carts ?
      <>
        <div className="head">
          <h5>Total Cart Products (-)</h5>
        </div>
        <ul className="cart-items">         
          {carts.map((cart, index) => {
            let item = products.find(product=>product.id === cart.product_id)
            console.log("ITEM:",item)
            if(item){
              return (
                <li className="cart-item" key={index}>
                  <img src={item.image} alt="" />
                  <h5>
                    {item.title}
                  </h5>
                  <div className="quantity">
                    <label htmlFor="quantity">QUANTITY</label>
                    <input type="text" value={cart.quantity} />
                  </div>
                  <div className="price">
                    <p>SUBTOTAL</p>
                    <p>{cart.quantity * item.price}</p>
                  </div>
                  <div className="close-btn">
                    <CloseIcon />
                  </div>
                </li>
              );
            }
            else{
              return(
                <h1>Product not Found</h1>
              )
            }
          })}        
        </ul>
        <h4>TOTAL : $499</h4>
        <div className="buttons">
          <Link to="/" className="shopping">
            CONTINUE SHOPPING
          </Link>
          <Link to="/checkout" className="checkout">
            CHECKOUT
          </Link>
        </div>
      </>:
      <div className="empty">
        <h1>Your cart is empty</h1>
        <Link to="/" className="shopping">
            CONTINUE SHOPPING
          </Link>
      </div>
    }
    </section>
  );
};

export default Cart;

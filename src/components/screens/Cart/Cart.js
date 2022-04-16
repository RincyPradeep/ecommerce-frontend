import React, { useState,useEffect, useContext } from "react";
import { Link ,useParams,useNavigate} from "react-router-dom";

import axios from 'axios'
import toast from 'react-hot-toast';
import CloseIcon from "@material-ui/icons/Close";

import "./Cart.css";
import AuthContext from '../../../context/AuthContext';
import ProductContext from "../../../context/ProductContext";


const Cart = () => {
  let sub_total = 0
  let total = 0

  const[toggleCartCount,setToggleCartCount] = useState(false)
  
  const navigate = useNavigate();
  const { id } = useParams()
  const {authTokens} = useContext(AuthContext)
  let {carts,products,emptyCart,getCart,getProducts,setTotalAmount} = useContext(ProductContext)

  const findTotal = (quantity,price)=>{ 
    price = parseFloat(price)
    sub_total = quantity * price
    total = total + sub_total    
  }

  const removeFromCart = (cart_id)=>{
    axios.post("http://localhost:8000/api/v1/products/removefromcart/",{
          "user_id" : id, "cart_id" : cart_id
          },{
          headers : {
            'Authorization':'Bearer ' + String(authTokens.access)
          },           
      }).then(response=>{
        setToggleCartCount(!toggleCartCount)
        toast.success("Item Deleted",{duration: 2000,style: {
          border: '1px solid green',
          padding: '8px',
          color: '#713200',
        }})
      }).catch(error=>{
        alert(error)
      })
  }

  const changeCartQuantity=(cartId,quantity,price)=>{
    axios.post("http://localhost:8000/api/v1/products/changecartquantity/",{
            "cart_id" : cartId, "quantity" : quantity
            },{
            headers : {
                'Authorization':'Bearer ' + String(authTokens.access)
            },           
        }).then(response=>{
          setToggleCartCount(!toggleCartCount)
           findTotal(quantity,price)
        }).catch(error=>{
          alert(error)
        })
  }

  const handlePlaceOrder=()=>{
    setTotalAmount(total)
    navigate("/place-order")
  }

  useEffect(()=>{
    getCart(id)
    getProducts()   
  },[toggleCartCount])

  return (
    <section id="cart" className="wrapper">
      {emptyCart ?
      <div className="empty">
        
      <h3>{emptyCart}</h3>
      <Link to="/" className="shopping">
          CONTINUE SHOPPING
      </Link>
    </div> :
      <>
        <div className="head">
          <h5>Total Cart Products ({carts.length})</h5>
        </div>
        <ul className="cart-items">         
          {carts.map((cart, index) => {
            let item = products.find(product=>product.id === cart.product)
            if(item){   
              return (
                <li className="cart-item" key={cart.id}>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} />
                    <h5>
                    {item.title}
                  </h5>
                  </Link> 
                  <div className="quantity">
                    <p>QUANTITY</p>
                    <select name="quantity" id="quantity" defaultValue={cart.quantity} 
                            onChange={(e)=>changeCartQuantity(cart.id,e.target.value,item.price)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>   
                  </div>
                  <div className="price">
                    <p>PRICE</p>
                    <p>&#x20B9;{item.price}</p>
                  </div>
                  <div className="price subtotal">
                    <p>SUBTOTAL</p>                  
                    <p>&#x20B9; {cart.quantity * parseFloat(item.price)}</p>                    
                  </div>

                   {findTotal(cart.quantity,item.price)}
                  
                  <div className="close-btn">
                    <CloseIcon onClick={()=>removeFromCart(cart.id)} />
                  </div>
                </li>
              );
            }

            else{
              return(
                <h1 key={cart.id}>Product not Found</h1>
              )
            }
          })
        }                 
        </ul>
        <h4>Total: &#x20B9; {total}</h4>
        <div className="buttons">
          <Link to="/" className="shopping">
            CONTINUE SHOPPING
          </Link>
          <button onClick={handlePlaceOrder} className="place-order">
          PLACE ORDER
          </button>
        </div>
      </>      
    }
    
    </section>
  );
};

export default Cart;

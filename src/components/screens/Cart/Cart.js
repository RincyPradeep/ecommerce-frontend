import React, { useState, useEffect, useContext } from "react";
import { Link ,useParams,useNavigate} from "react-router-dom";
import axios from 'axios'
import sweetalert from 'sweetalert'
import CloseIcon from "@material-ui/icons/Close";

import "./Cart.css";
import AuthContext from '../../../context/AuthContext';
import ProductContext from "../../../context/ProductContext";

const Cart = () => {
  // const [total, setTotal] = useState(0)
  let totalAmount=0
  const navigate = useNavigate();
  const { id } = useParams()
  const {authTokens} = useContext(AuthContext)
  let {carts,products,emptyCart,getCart,getProducts,setTotalAmount} = useContext(ProductContext)

  const removeFromCart = (cart_id)=>{
    axios.post("http://localhost:8000/api/v1/products/removefromcart/",{
          "user_id" : id, "cart_id" : cart_id
          },{
          headers : {
            'Authorization':'Bearer ' + String(authTokens.access)
          },           
      }).then(response=>{
        sweetalert("Good","Item Deleted","success")
        // navigate(`/cart/${id}`)
        window.location.reload()
      }).catch(error=>{
        alert(error)
      })
  }

  const changeCartQuantity=(cartId,quantity)=>{
    axios.post("http://localhost:8000/api/v1/products/changecartquantity/",{
            "cart_id" : cartId, "quantity" : quantity
            },{
            headers : {
                'Authorization':'Bearer ' + String(authTokens.access)
            },           
        }).then(response=>{
          window.location.reload()
        }).catch(error=>{
          alert(error)
        })
  }

  const findTotal =(quantity,price)=>{
    
    price = parseFloat(price)
    let subTotal = quantity*price
       
    return(          
      totalAmount += subTotal
    )
  }

  useEffect(()=>{
    getProducts()
    getCart(id)
  },[])

  useEffect(()=>{
    setTotalAmount(totalAmount)
    console.log("Total Amount changed.............................",totalAmount)
  },[totalAmount])


  return (
    <section id="cart" className="container">
      {emptyCart ?
      <div className="empty">
      <h1>{emptyCart}</h1>
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
              totalAmount = findTotal(cart.quantity , item.price)
              
              return (
                <li className="cart-item" key={cart.id}>
                  <Link to={`/product/${item.id}`}><img src={item.image} alt={item.title} /></Link>
                  <h5>
                    {item.title}
                  </h5>
                  <div className="quantity">
                    <p>QUANTITY</p>
                    <select name="quantity" id="quantity" defaultValue={cart.quantity} 
                            onChange={(e)=>changeCartQuantity(cart.id,e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>   
                  </div>
                  <div className="price">
                    <p>PRICE</p>
                    <p>&#x20B9;{item.price}</p>
                  </div>
                  <div className="price">
                    <p>SUBTOTAL</p>
                    <p>&#x20B9;{(cart.quantity * item.price).toFixed(2)}</p>                    
                  </div>
                  <div className="close-btn">
                    <CloseIcon onClick={()=>removeFromCart(cart.id)} />
                  </div>
                </li>
              );
            }
            else{
              return(
                <h1>Product not Found</h1>
              )
            }
          })
        }                 
        </ul>
        <h4>TOTAL : &#x20B9; {totalAmount}</h4>
        {/* <h4>Total: &#x20B9;{total}</h4> */}
        <div className="buttons">
          <Link to="/" className="shopping">
            CONTINUE SHOPPING
          </Link>
          <Link to="/place-order" className="place-order">
          PLACE ORDER
          </Link>
        </div>
      </>      
    }
    </section>
  );
};

export default Cart;

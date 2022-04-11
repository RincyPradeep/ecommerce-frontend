import React,{useState,useEffect,useContext} from 'react'
import {useParams,useNavigate} from 'react-router-dom';

import axios from 'axios'
import sweetalert from 'sweetalert'

import './SingleProduct.css'
import AuthContext from '../../../context/AuthContext';
import ProductContext from "../../../context/ProductContext";


const SingleProduct = () => {
  let navigate = useNavigate();
  let {user,authTokens, logoutUser} = useContext(AuthContext)
  let {getCart} = useContext(ProductContext)
  const [product,setProduct] = useState()
  const [quantity,setQuantity] = useState(1)
  const { id } = useParams() 

  const addToCart = async( product_id,quantity)=>{
    if(user){
      let user_id=user.user_id
      let response = await fetch("http://localhost:8000/api/v1/products/addtocart/",{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body : JSON.stringify({"user_id" : user_id, "product_id":product_id, "quantity":quantity})
        })
        if(response.status === 200){
          sweetalert("Good","Item Added To Cart","success")
          getCart(user_id)
          navigate('/')
        }else if(response.statusText === 'Unauthorized'){
          sweetalert("Oops","Please Login Again","error")
          logoutUser()
    }  
    }else{
      navigate('/login')
    }
  }
   
  const getProduct = () => {
  axios.get(`http://localhost:8000/api/v1/products/singleproduct/${id}`).then(response=>{
    if(response.data.status_code === 6000){
      setProduct(response.data.data);
    }else if(response.data.status_code === 6001){
      sweetalert("Oops","No such Product found","error")
    }
  }).catch(error=>{
      alert(error)
    }
  )
  };

  useEffect(() => {
    getProduct();
  },[]);

  return (
    <section id="single-product" className='container'>
      {product && <>
        <div className='left'>
            <img src={product.image} alt="product" />
        </div>
        <div className='right'>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <div className="details">
              <div className="details-row">
                <p>Price :</p>
                <p>&#x20B9; {product.price*quantity}</p>
              </div>
              <div className="details-row">
                <p>Status :</p>
                {product.is_available? <p className='green'>In Stock</p> : <p className='red'>Currently not Available</p>}
              </div>
              { product.is_available &&
                <div className="details-row">
                    <label htmlFor="quantity">Quantity:<small>(Maximum 5 items/order)</small></label>
                    <select name="quantity" id="quantity" onChange={(e)=>setQuantity(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>    
                </div>         
              }            
            </div>
            { product.is_available &&
              <button onClick={()=>addToCart( product.id,quantity)}>Add to Cart</button>
            }
        </div>
        </>
      }
    </section>
  )
}

export default SingleProduct
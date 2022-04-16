import React, { useState,useEffect, useContext } from "react";
import { Link ,useParams,useNavigate} from "react-router-dom";

import axios from 'axios'
import toast from 'react-hot-toast';
import CloseIcon from "@material-ui/icons/Close";

import "./Wishlist.css";
import AuthContext from '../../../context/AuthContext';
import ProductContext from "../../../context/ProductContext";


const Wishlist = () => {
  const [wishlists, setWishlists] = useState([])
  const [emptyWishlist,setEmptyWishlist] = useState(null)
  const[changeWishlist,setChangeWishlist] = useState(false)
  const navigate = useNavigate();
  const { id } = useParams()
  const {authTokens} = useContext(AuthContext)
  let {carts,products,emptyCart,getProducts} = useContext(ProductContext)

  const getWishlist = (id) =>{
    axios.get(`http://localhost:8000/api/v1/products/wishlist/${id}/`,
    {
      headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer ' + String(authTokens.access)
      }
    }).then((response)=>{
        if(response.status === 200){
          if(response.data.status_code === 6000){
            setWishlists(response.data.data)
            setEmptyWishlist(null)
          } else if(response.data.status_code === 6001){
            setEmptyWishlist(response.data.message)
          }
        }else{
          alert("Something went wrong!")
        }   
    }).catch((error)=>{
      alert(error)
    })
  }  

  const removeFromWishlist = (wishlist_id)=>{
    axios.post("http://localhost:8000/api/v1/products/removefromwishlist/",{
          "user_id" : id, "wishlist_id" : wishlist_id
          },{
          headers : {
            'Authorization':'Bearer ' + String(authTokens.access)
          },           
      }).then(response=>{
        setChangeWishlist(!changeWishlist)
        toast.success("Item Deleted",{duration: 2000,style: {
          border: '1px solid green',
          padding: '8px',
          color: '#713200',
        }})
      }).catch(error=>{
        alert(error)
      })
  }

  useEffect(()=>{
    getWishlist(id)
    getProducts()   
  },[changeWishlist])

  return (
    <section id="wishlist" className="wrapper">
      {emptyWishlist ?
      <div className="empty">
        
      <h3>{emptyWishlist}</h3>
      <Link to="/" className="shopping">
          CONTINUE SHOPPING
      </Link>
    </div> :
      <>
      <div className="head">
          <h5>My Wishlist</h5>
        </div>
        <ul className="wishlist-items">         
          {wishlists.map((wishlist, index) => {
            let item = products.find(product=>product.id === wishlist.product)
            if(item){   
              return (
                <li className="wishlist-item" key={wishlist.id}>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} />
                    <h5>
                     {item.title}
                    </h5>
                  </Link> 
                  <div className="price">
                    <p>PRICE</p>
                    <p>&#x20B9;{item.price}</p>
                  </div>
                  
                  <div className="close-btn">
                    <CloseIcon onClick={()=>removeFromWishlist(wishlist.id)} />
                  </div>
                </li>
              );
            }

            else{
              return(
                <h1 key={wishlist.id}>Product not Found</h1>
              )
            }
          })
        }                 
        </ul>
        
        <div className="buttons">
          <Link to="/" className="shopping">
            CONTINUE SHOPPING
          </Link>
        </div>
      </>      
    }   
    </section>
  );
};

export default Wishlist;

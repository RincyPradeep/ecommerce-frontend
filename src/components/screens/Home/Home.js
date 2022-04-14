import React,{useState,useEffect,useContext}  from 'react'
import {Link} from 'react-router-dom';

import axios from 'axios'
import {Helmet} from 'react-helmet'

import './Home.css'
import ProductCard from '../ProductCard/ProductCard'
import ProductContext from "../../../context/ProductContext";
import AuthContext from '../../../context/AuthContext';


const Home = () => {
  axios.defaults.baseURL="http://localhost:8000/api/v1/products"
  let {setProducts,products,setShowSearchBar,getCart} = useContext(ProductContext)
  const [categories,setCategories] = useState([])
  const [active,setActive] = useState(0)
  let {user} = useContext(AuthContext)

  useEffect(() => {
    setShowSearchBar(true)
    fetchProducts(); 
    fetchCategories();
    if(user){
      getCart(user.user_id)
    }
    return () => {
      setShowSearchBar(false)
    }
  }, [])

  const fetchProducts = () =>{
    setActive(0)
    axios.get('/').then((response)=>{
      setProducts(response.data.data);
    }).catch(err=>{
      alert(err)
  })
  }

  const fetchCategories = () =>{
    axios.get('/categories/').then((response)=>{
      setCategories(response.data.data);
    }).catch(err=>{
      alert(err)
  })
  }

  const fetchCategoryProducts = (id) =>{
    setActive(id)
    axios.get(`/category-products/${id}`).then((response)=>{
      setProducts(response.data.data);
    }).catch(err=>{
      alert(err)
  })
  }

  return (
    <section id="home" className="wrapper">
      <Helmet><title>Ecommerce App| Home</title></Helmet>
      <nav className="menu">
        <ul>              
            <li onClick={fetchProducts} className={active===0 ? 'active' : ""}>All</li>  
            {
              categories.map((category,index)=>{
                return(
                  <li key={category.id} onClick={()=>fetchCategoryProducts(category.id)} className={active=== category.id ? 'active' : ""}>{category.name}</li>
                )
              })
            }    
        </ul>
      </nav>
      <div className="products">
        <ul>
          {
            products.map((product,index)=>{
              return(
                <li key={product.id}>
                  <Link to={`/product/${product.id}`}><ProductCard product={product} /></Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default Home
import React,{useState,useEffect}  from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';

import './Home.css'
import ProductCard from '../ProductCard/ProductCard'


const Home = () => {
  axios.defaults.baseURL="http://localhost:8000/api/v1/products"
  const [products,setProducts] = useState([])
  const [categories,setCategories] = useState([])

  useEffect(() => {
    fetchProducts(); 
    fetchCategories();
  }, [])

  const fetchProducts = () =>{
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

  return (
    <section id="home" className="container">
      <nav className="menu">
        <ul>              
            <li><Link to="#" className="active">All</Link></li>  
            {
              categories.map((category,index)=>{
                return(
                  <li key={category.id}><Link to="#" className="">{category.name}</Link></li>
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
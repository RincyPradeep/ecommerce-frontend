import React,{useState,useEffect,useContext}  from 'react'
import {Link} from 'react-router-dom';

import axios from 'axios'
import Slider from 'react-slick'

import './Home.css'
import ProductCard from '../ProductCard/ProductCard'
import ProductContext from "../../../context/ProductContext";
import AuthContext from '../../../context/AuthContext';
import Pagination from '../Pagination/Pagination';


const Home = () => {
  const settings = {
    dots: true,
    arrow:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true
  };

  axios.defaults.baseURL="http://localhost:8000/api/v1/products"
  let {setProducts,products,setShowSearchBar,getCart} = useContext(ProductContext)
  const [categories,setCategories] = useState([])
  const [active,setActive] = useState(0)
  const [banners,setBanners] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [productsPerPage,setProductsPerPage] = useState(8)
  let {user} = useContext(AuthContext)

  useEffect(() => {
    setShowSearchBar(true)
    fetchProducts(); 
    fetchCategories();
    getBanners();
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
    axios.get(`/category-products/${id}/`).then((response)=>{
      setProducts(response.data.data);
    }).catch(err=>{
      alert(err)
  })
  }

  const getBanners = ()=>{
    axios.get('/banners/').then((response)=>{
      setBanners(response.data.data)
    }).catch((error)=>{
      alert(error)
    })
  }

  // get current posts
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  // change page
  const paginate = (pageNumber)=>setCurrentPage(pageNumber)

  return (
    <section id="home" className="wrapper">
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
      <div className='banner'>
        <Slider {...settings}>
          {banners.map((banner)=>{
            return(
              <div key={banner.id}>
                <img src={banner.image} />
              </div>
            )
          })}
        </Slider>
      </div>
      <div className="products">
        <ul>
          {
            currentProducts.map((product,index)=>{
              return(
                <li key={product.id}>
                  <Link to={`/product/${product.id}`}><ProductCard product={product} /></Link>
                </li>
              )
            })
          }
        </ul>
      </div>
      <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
    </section>
  )
}

export default Home
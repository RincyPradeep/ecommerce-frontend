import React,{useState,useContext,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Form,FormControl,Button,DropdownButton, Dropdown} from 'react-bootstrap';
import axios from 'axios'

import './Header.css' 
import logo from "../../../assets/images/logo.png";
import AuthContext from '../../../context/AuthContext';
import ProductContext from "../../../context/ProductContext";


const Header = () => {
  
  const [searchItem,setSearchItem] = useState()
  let {user, logoutUser} = useContext(AuthContext)
  let {cartLength,getCart,carts,setProducts,showSearchBar,emptyCart} = useContext(ProductContext)

  const handleChange = (value)=>{
    setSearchItem(value)
  }

  const handleSearch = (event) =>{
    event.preventDefault()
    axios.get("/search/",{params :{q : searchItem}}).then((response)=>{
      setProducts(response.data.data);
    }).catch(err=>{
      alert(err)
  })
  }

  return (
    <section id="header" className="wrapper">
      <div className="nav-left">
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </h1>
      </div>
      {showSearchBar && 
      <div className="nav-middle">
        <Form className="d-flex" onSubmit={(event)=> handleSearch(event)}>
          <FormControl
            type="search"
            id="query"
            name="query"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange ={(e)=>handleChange(e.target.value)}
          />
          <Button variant="outline-success" type='submit'>Search</Button>
        </Form>
      </div>
      }
      <div className="nav-right">
        <ul>          
          { user ?
            <>
              <li>
                <DropdownButton id="dropdown-basic-button" title={user.username}>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to={`/orders/${user.user_id}`}>Orders</Dropdown.Item>
                  <Dropdown.Item as={Link} to={`/wishlist/${user.user_id}`}>Wish List</Dropdown.Item>
                </DropdownButton>
              </li>
              <li>
                <Link to={`/cart/${user.user_id}`}>
                  <ShoppingCartIcon/>                  
                    <span id="cart-count">{emptyCart? 0 : carts.length}</span>
                </Link>
              </li>
              <li onClick={logoutUser} className="logout-btn">Logout</li>
            </> :
            <li><Link to="/login" className="button">Login</Link></li>
          }
        </ul>
      </div>      
    </section>
  );
};

export default Header;

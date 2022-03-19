import './Header.css' 
import React,{useContext} from 'react'
import logo from "../../../assets/images/logo.png";
import {Link} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Form,FormControl,Button,DropdownButton, Dropdown} from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';


const Header = ({carts}) => {
  let {user, logoutUser} = useContext(AuthContext)
  return (
    <section id="header" className="container">
      <div className="nav-left">
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </h1>
      </div>
      <div className="nav-middle">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
      <div className="nav-right">
        <ul>          
          { user ?
            <>
              <li>
                <DropdownButton id="dropdown-basic-button" title={user.username}>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                </DropdownButton>
              </li>
              <li>
                <Link to={`/cart/${user.user_id}`}>
                  <ShoppingCartIcon/>
                  <span id="cart-count">0</span>
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

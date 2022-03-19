import React from 'react'
import './Footer.css'
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PrintIcon from '@material-ui/icons/Print';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <section id="footer">
      <ul>
        <li>
          <Link to="">
            <div><PhoneIcon/></div>
            <p>Call Us 24x7</p>
            <p>9876 543 210</p>
            </Link>
        </li>
        <li>
          <Link to="">
            <div><LocationOnIcon/></div>
            <p>Headquarter</p>
            <p>Mumbai</p>
          </Link>
        </li>
        <li>
          <Link to="">
            <div><PrintIcon/></div>
            <p>Fax</p>
            <p>9876 543 210</p>
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Footer
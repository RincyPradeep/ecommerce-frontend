import React, {useState, useEffect, useContext } from 'react'
import { Link ,useParams} from "react-router-dom";

import axios from 'axios'

import './Order.css'
import AuthContext from '../../../context/AuthContext';
import ProductContext from "../../../context/ProductContext";
import Pagination from '../Pagination/Pagination';


const Order = () => {

    const { id } = useParams()
    const {authTokens} = useContext(AuthContext)
    let {getCart} = useContext(ProductContext)

    const [orders,setOrders] = useState([])
    const [message,setMessage] = useState(null)
    const [currentPage,setCurrentPage] = useState(1)
    const [productsPerPage,setProductsPerPage] = useState(10)

    const getOrders = async() =>{
        await axios.get(`http://localhost:8000/api/v1/products/orders/${id}/`,{
            headers : {
              'Authorization':'Bearer ' + String(authTokens.access)
            },           
        }).then((response)=>{
            if (response.data.status_code === 6000)
                setOrders(response.data.data)
            else
                setMessage(response.data.message)         
        }).catch(err=>{
          alert(err)
      })
      }

    useEffect(()=>{
        getOrders(id)
        getCart(id)
      },[])

      // get current posts
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = orders.slice(indexOfFirstProduct, indexOfLastProduct)

  // change page
  const paginate = (pageNumber)=>setCurrentPage(pageNumber)

  return (
    <section id="order" className="wrapper">
        {message ?<h3 className="text-center center">{message}</h3>:
        <>
        <h3 className="text-center center">Order List</h3>
        <table id="orders" className="table table-bordered table-hover table-responsive" >
            <thead>
                <tr>
                    <th scope="col">order id</th>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th scope="col">Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody> 
                {currentProducts.map((order,index)=>{
                    return(
                        <tr key={order.id}>
                            <td>{order.order_payment_id}</td>
                            <td className='date'>{order.order_date}</td>
                            <td><Link to={`/product/${order.product_id}`}>{order.product_title}</Link></td>
                            <td>{order.quantity}</td>
                            <td><i className="fa fa-inr pr-2"></i>{order.product_amount}</td>
                            <td>{order.status==="Pending"?<span style={{"color":"red"}}>{order.status}</span>:
                                <span style={{"color":"green"}}>{order.status}</span>}
                            </td>
                        </tr> 
                    )
                })}                           
            </tbody>
        </table>
        
        <Pagination productsPerPage={productsPerPage} totalProducts={orders.length} paginate={paginate} />
        </>
        }
</section>
  )
}

export default Order
import React from 'react'
import './Order.css'

const Order = () => {
  return (
    <section id="order" className="container">
        {/* <h3 className="text-center center">Order List is Empty</h3> */}
        <h3 className="text-center center">Order List</h3>
        <table className="table table-bordered table-hover table-responsive" >
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th>Address</th>
                    <th>Pincode</th>
                    <th>Mobile</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                
                <tr>
                    <td>5.3.22</td>
                    <td>sdasd dffdsf dfdsf dsfsdf </td>
                    <td>683456</td>
                    <td>9876543235</td>
                    <td><i class="fa fa-inr pr-2"></i>$499</td>
                    <td>Online</td>
                    <td>ordered</td>
                    {/* <td>
                        <a href="/view-order-products/{{this._id}}" class="btn order-btn" style="width:128px">View Products</a>
                    </td>                     */}
                </tr>
                
            </tbody>
        </table>
</section>
  )
}

export default Order
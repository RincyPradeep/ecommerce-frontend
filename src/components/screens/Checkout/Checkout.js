import React from "react";
import "./Checkout.css";

const Checkout = () => {
  return (
    <section id="checkout" className="container">
      <form action="POST" id="checkout-form">
        <div className="left">
          <h2>Enter Delivery Details</h2>
          <br />
          <div>
            <label htmlFor="name">Name</label>
            <input className="form-control" type="text" id="name" name="name" value="" required />

            <label htmlFor="address">Address</label>
            <input className="form-control" type="text" id="address" name="address" value="" required />

            <label htmlFor="pincode">Pincode</label>
            <input className="form-control" type="text" id="pincode" name="pincode" value="" required />

            <label htmlFor="mobile">Mobile</label>
            <input className="form-control" type="text" id="mobile" name="mobile" value="" required />

            <input type="text" name="userId" id="" value="" hidden />
          </div>
        </div>

        <div className="right">
            <h5>Total Amount : <i class="fa fa-inr pr-2"></i>$499</h5>
            <hr />
            <div className="payment">
              <p>Payment method</p>
              <label className="radio-inline">
                <input type="radio" name="payment-method" value="COD" checked />
                COD
              </label>
              <br /><br/>
              <label className="radio-inline">
                <input type="radio" name="payment-method" value="ONLINE" />
                Online payment
              </label>
              <br /><br/>
              <button className="checkout-btn" type="submit">
                Checkout
              </button>
            </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;

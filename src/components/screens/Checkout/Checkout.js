import React, { useState, useEffect , useContext} from "react";
import Axios from "axios";

import "./Checkout.css";
import AuthContext from '../../../context/AuthContext';
import ProductContext from "../../../context/ProductContext";
import sweetalert from 'sweetalert'


const Checkout = () => {

  const {user,getProfile,name,address,pincode,mobile,setName,setAddress,setPincode,setMobile} = useContext(AuthContext)
  let {totalAmount,getCart,carts} = useContext(ProductContext)

  let userId = user.user_id;
  const [products,setProducts] = useState([{}])
  const [amount, setAmount] = useState(totalAmount);

  useEffect(()=>{
    getCart(userId)
    getProfile(userId)
  },[])


  // this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
const handlePaymentSuccess = async (response) => {
  try {
    let bodyData = new FormData();

    // we will send the response we've got from razorpay to the backend to validate the payment
    bodyData.append("response", JSON.stringify(response));

    await Axios({
      url: "http://localhost:8000/api/v1/razorpay/payment/success/",
      method: "POST",
      data: bodyData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("RESONSE FROM AYMENT SUCCESS",res)
        console.log("Everything is OK!");
        sweetalert("Good",res.data.message,"success")
        console.log(res.data.message)
        setName("");
        setAmount("");
      })
      .catch((err) => {
        console.log(err);
        sweetalert("Opps",err,"error")
      });
  } catch (error) {
    console.log(console.error());
  }
};

// this will load a script tag which will open up Razorpay payment card to make //transactions
const loadScript = () => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.body.appendChild(script);
};

const showRazorpay = async (event) => {
  event.preventDefault();
  const res = await loadScript();
  // carts.map((cart)=>{
  //   return(
  //     setProducts([...products,{"product_id":cart.product,"quantity" : cart.quantity}])
  //   )
  // })

  const data = await Axios({
    url: "http://localhost:8000/api/v1/razorpay/pay/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      "amount":amount,"pincode":pincode,"mobile":mobile,"name":name,"userId":userId,"address":address,"carts":carts
    }
  }).then((res) => {
    console.log("RESONSE FROM START PAYMENT",res)
    return res;
  }).catch(error=>{
    alert(error)
  });

  // in data we will receive an object from the backend with the information about the payment
  //that has been made by the user

  var options = {
    key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
    key_secret: process.env.REACT_APP_SECRET_KEY,
    // amount: data.data.payment.amount,
    amount : totalAmount,
    currency: "INR",
    name: "Org. Name",
    description: "Test transaction",
    image: "", // add image url
    order_id: data.data.payment.id,
    handler: function (response) {
      // we will handle success by calling handlePaymentSuccess method and
      // will pass the response that we've got from razorpay
      handlePaymentSuccess(response);
    },
    prefill: {
      name: name,
      email: data.data.email,
      contact: mobile,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var rzp1 = new window.Razorpay(options);
  rzp1.open();
};
   
  return (
    <section id="checkout" className="container">
      
      <form id="checkout-form">
        <div className="left">
          <h2>Enter Delivery Details</h2>
          <br />
          <div>
            <label htmlFor="name">Name</label>
            <input className="form-control" type="text" id="name" name="name" value={name}
            onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="address">Address</label>
            <textarea className="form-control" type="text" id="address" name="address" value={address}
            onChange={(e) => setAddress(e.target.value)} rows='5' required />

            <label htmlFor="pincode">Pincode</label>
            <input className="form-control" type="number" id="pincode" name="pincode" value={pincode}
            onChange={(e) => setPincode(e.target.value)} required />

            <label htmlFor="mobile">Mobile</label>
            <input className="form-control" type="number" id="mobile" name="mobile" value={mobile}
            onChange={(e) => setMobile(e.target.value)} required />

            <input type="text" name="userId" id="" defaultValue={user.user_id}  hidden/>
            <input type="number" name="amount" id="" defaultValue={totalAmount}  hidden/>
          </div>
        </div>

        <div className="right">
            <h4>Total Amount : <i className="fa fa-inr pr-2"></i>&#x20B9; {totalAmount}</h4>
            <hr />
             
            <button onClick={showRazorpay} className="btn btn-primary btn-block">
                Pay with razorpay
              </button>  
        </div>
      </form>
    </section>
  );
};

export default Checkout;

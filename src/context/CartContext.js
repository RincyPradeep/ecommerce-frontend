import {createContext, useState, useContext} from 'react'
import axios from 'axios'

import AuthContext from './AuthContext';

const CartContext = createContext()

export default CartContext

export const CartProvider = ({children})=>{
    const [carts, setCarts] = useState([])
    const [cartLength,setCartLength] = useState(0)
    const [emptyCart,setEmptyCart] = useState()
    const [products,setProducts] = useState([])
    let {authTokens} = useContext(AuthContext)
    

    const getProducts = async() =>{
        await axios.get('http://localhost:8000/api/v1/products/').then((response)=>{
          setProducts(response.data.data);
        }).catch(err=>{
          alert(err)
      })
      }
    
      let getCart = async(id) =>{
        let response = await fetch(`http://localhost:8000/api/v1/products/cart/${id}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
    
        if(response.status === 200){
          if(data.status_code === 6000){
            setCarts(data.data)
            setCartLength(carts.length)
          } else if(data.status_code === 6001){
            setEmptyCart(data.message)
          }
        }else{
          alert("Something went wrong!")
        }   
    }

    let contextData = {
        carts : carts,
        cartLength : cartLength,
        products : products,
        emptyCart : emptyCart,
        getCart : getCart,
        getProducts : getProducts
    }

    return(
        <CartContext.Provider value={contextData}>
            {children}
        </CartContext.Provider>
    )
}
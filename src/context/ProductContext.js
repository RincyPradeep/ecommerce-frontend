import {createContext, useState, useContext} from 'react'
import axios from 'axios'

import AuthContext from './AuthContext';

const ProductContext = createContext()

export default ProductContext

export const CartProvider = ({children})=>{
    const [carts, setCarts] = useState([])
    const [cartLength,setCartLength] = useState(0)
    const [emptyCart,setEmptyCart] = useState(null)
    const [products,setProducts] = useState([])
    const [showSearchBar,setShowSearchBar] = useState(false)
    const [totalAmount,setTotalAmount] = useState(0)
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
            setEmptyCart(null)
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
        showSearchBar : showSearchBar,
        totalAmount : totalAmount,
        setProducts : setProducts,
        getCart : getCart,
        getProducts : getProducts,
        setShowSearchBar : setShowSearchBar,
        setTotalAmount : setTotalAmount
    }

    return(
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}
import {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios'


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children})=>{
    const navigate = useNavigate();
    const [user,setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [authTokens,setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)
    const [errMessage,setErrMessage] = useState(null)

    const [name,setName] = useState()
    const [address,setAddress] = useState()
    const [pincode,setPincode] = useState()
    const [mobile,setMobile] = useState()

    const createUser = async(e)=>{
        e.preventDefault()
        let response = await fetch('http://localhost:8000/api/v1/auth/create/',{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({"first_name" : e.target.first_name.value,"last_name" : e.target.last_name.value,"email" : e.target.email.value,"username" : e.target.username.value, "password":e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            if(data.status_code === 6001){
                setErrMessage(data.message)               
            }else{
                let final_data = data.data
                setAuthTokens(final_data)
                setUser(jwt_decode(final_data.access))
                localStorage.setItem('authTokens', JSON.stringify(final_data))
                navigate('/')
            }
        }else{
            alert('Something went wrong!')
        }
    }

    let loginUser = async(e)=>{
        e.preventDefault()
        let response = await fetch('http://localhost:8000/api/v1/auth/token/',{
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({"username" : e.target.username.value, "password":e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else if(response.status === 401){
            setErrMessage(data)
        }else if(response.status === 400){
            setErrMessage(data)
        }
        else{
            alert('Something went wrong!')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let updateToken = async ()=> {
        let response = await fetch('http://localhost:8000/api/v1/auth/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }


    const getProfile = (userid) =>{
        axios.get(`http://localhost:8000/api/v1/auth/get_profile/${userid}`,
        {
         headers : {
           'Authorization':'Bearer ' + String(authTokens.access)
         },           
       }).then((response)=>{
         if (response.data.status_code === 6000){
             let profile = response.data.data;
             setName(profile.name)
             setAddress(profile.address)
             setPincode(profile.pincode)
             setMobile(profile.mobile)
         }
           }).catch(err=>{
             alert(err)
         })
     } 

    let contextData = {
        user : user,
        authTokens : authTokens,
        errMessage : errMessage,
        name : name,
        address : address,
        pincode : pincode,
        mobile : mobile,
        loginUser : loginUser,
        logoutUser:logoutUser,
        createUser : createUser,
        getProfile : getProfile,
        setName : setName,
        setAddress : setAddress,
        setPincode : setPincode,
        setMobile : setMobile
    }

    useEffect(()=> {
        if(loading && authTokens){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4
        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
import React,{useState,useContext, useEffect} from 'react'
import axios from 'axios'
import sweetalert from 'sweetalert'

import './Profile.css'
import AuthContext from '../../../context/AuthContext';


const Profile = () => {

  const {authTokens,user,getProfile,name,address,pincode,mobile,setName,setAddress,setPincode,setMobile} = useContext(AuthContext)

  let userid = user.user_id
  

  

  const updateProfile=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8000/api/v1/auth/update_profile/",{
       "user" : userid,"name" : name, "address" : address,"pincode" : pincode,"mobile" : mobile
            },{
            headers : {
                'Authorization':'Bearer ' + String(authTokens.access)
            },           
        }).then(response=>{
          console.log("RESPONSE:-----------------",response)
          sweetalert("Good","Profile Updated","success")
        }).catch(error=>{
          alert(error)
        })
  }

  useEffect(()=>{
    getProfile(userid)
  },[])

  return (
    <section id="profile" className="container">
        <form className="content" onSubmit={updateProfile} >
            <h1>Profile</h1>
                <label htmlFor='name'>Name</label>
                <input type="text" name='name' id='name' value={name}
                  onChange={(e)=>setName(e.target.value)}/>

                <label htmlFor='address'>Address</label>
                <textarea type="text" rows='3' name='address' id='address' value={address}
                  onChange={(e)=>setAddress(e.target.value)}/>

                <label htmlFor='pincode'>Pincode</label>
                <input type="text" id='pincode' value={pincode}
                  onChange={(e)=>setPincode(e.target.value)}/>

                <label htmlFor='mobile'>Mobile</label>
                <input type="text" name='mobile' id='mobile' value={mobile}
                  onChange={(e)=>setMobile(e.target.value)}/>

                <input type="text" name='user' defaultValue={userid} hidden />
                   
            <button type="submit">Update Profile</button>
        </form>
    </section>
  )
}

export default Profile
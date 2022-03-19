import React from 'react'
import './Profile.css'


const Profile = () => {
  return (
    <section id="profile" class="container">
        <form className="content" action="" method="POST" >
            <h1>Profile</h1>
                <label htmlFor='address'>Address</label>
                <textarea type="text" rows='3' name='address' id='address' />
                <label htmlFor='pincode'>Pincode</label>
                <input type="text" id='pincode'/>
                <label htmlFor='phone'>Phone</label>
                <input type="text" name='phone' id='phone'/>
                   
            <button type="submit">Update Profile</button>
        </form>
    </section>
  )
}

export default Profile
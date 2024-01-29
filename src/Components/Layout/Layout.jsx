import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';


export default function Layout({CurrentUser,clearUserData}) {
  return <>

<Navbar clearUserData={clearUserData} CurrentUser={CurrentUser}/>

<Outlet/>

<footer className='p-5'>

<h2>Get the FreshCart App</h2>
<p>We will send you a link, open it on your phone to download the app</p>
<div className="container d-flex justify-content-between p-5">
  <input type="text" className='form-control w-75' placeholder='Email..' />
  <button className=' btn btn-success w-25 ms-5'>Share App Link</button>
</div>
<div className="container border-bottom border-top border-2 border-dark d-flex justify-content-between align-items-center py-4">
  <div className="leftpart">
    <ul className='list-unstyled d-flex'>

      <li className='me-2'><h6>Payment parteners</h6></li>

     <li className='me-2 text-primary'><i class="fa-brands fa-amazon-pay"></i></li>
      <li className='me-2 text-primary'><i class="fa-brands fa-cc-mastercard"></i></li>
      
    
      <li className='me-2 text-primary'><i class="fa-brands fa-paypal"></i></li>

    </ul>


  </div>
  <div className="rightpart d-flex align-items-center">
    <h6 className='me-4'>Get Deliveries with FreshCart</h6>
    <button className='btn btn-dark  btn-lg mx-3'>

    <i class="fa-brands fa-app-store me-2"></i>
      
      <span>Available on the App Store</span></button>
    <button className='btn btn-dark btn-lg mx-2'>

    <i class="fa-brands fa-google-play me-2"></i>
      <span>Get it on Google Play</span></button>
  </div>
</div>
</footer>

  
  </>
    
  
}

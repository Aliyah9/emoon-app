import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({CurrentUser,clearUserData}) {

  const navigate=useNavigate();

  function logoutUser(){
    clearUserData();
    navigate('/login');
    


  }
  return <>



<nav className="navbar navbar-expand-lg">
  <div className="container-fluid d-inline-block p-3">
    <Link className="navbar-brand" to="/home">
      <img src={require('../../Images/logo-main-removebg-preview.png')}  className='w-25' alt="fresh cart logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 py-2">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Orders">my orders</Link>
        </li>
        
        
      </ul>


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">


        {CurrentUser?<>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Profile">Profile</Link>
        </li>
        <li className="nav-item">
          <span onClick={logoutUser} className='nav-link'>Logout</span>
        </li>
        
        </>: <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Register">Register</Link>
        </li>
        </>
        }
      
        
        
        
      </ul>
      
    </div>
  </div>
</nav>


  </>
}

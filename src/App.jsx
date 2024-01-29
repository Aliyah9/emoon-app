import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Brands from './Components/Brands/Brands';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import Profile from './Components/Profile/Profile';
import jwtDecode from 'jwt-decode';
import Cart from './Components/Cart/Cart';
import CartContext from './Components/Context/CartContext';
import Payment from './Components/Payment/Payment';
import Orders from './Components/Orders/Orders';



// next important step routing
export default function App() {


// protected route

  function ProtectedRoute({children}){
    if(CurrentUser==null){
      return <Navigate to='/login'/>

    }
    else{
      return <>
      {children}
      </>
    }
  }
  function clearUserData(){
    localStorage.removeItem('token');

    setCurrentUser(null);
  }




  const [CurrentUser,setCurrentUser]=useState(null);
    function getUserData(){
      //to decode user data
      const userData =jwtDecode(localStorage.getItem('token'));
      setCurrentUser(userData);
      // console.log(userData);
       
    }
  const router=createHashRouter([{  

    path:'',element:<Layout clearUserData={clearUserData} CurrentUser={CurrentUser} />,children:[
      
      {path:'',element: <CartContext>< Home/></CartContext>},
      {path:'home',element: <CartContext>< Home/></CartContext>},
      {path:'login',element: <Login currentuser={CurrentUser} getUserData={getUserData} />}, // 
      {path:'register',element: <Register/>},
      {path:'brands',element: <Brands/>},
      {path:'payment',element: <ProtectedRoute>
        <CartContext>
        <Payment/>
      </CartContext>
      </ProtectedRoute>},
      {path:'productdetails/:id',element: <ProtectedRoute> <CartContext><ProductDetails/></CartContext></ProtectedRoute>},
      {path:'brandproducts/:id',element: <BrandProducts/>},
      {path:'cart',element: <ProtectedRoute>  <Cart/> </ProtectedRoute>},
      {path:'orders',element: <ProtectedRoute>  <Orders currentuser={CurrentUser}/> </ProtectedRoute>},
      {path:'profile',element: <ProtectedRoute> <Profile currentuser={CurrentUser}/> </ProtectedRoute>},  //currentuser={CurrentUser}
      
      {path:'*',element: <div className='text-center'>

        <img src={require('./Images/monkey.png')} alt="not found template" />
      </div>},


      


    ]
   }
  
  
  
  ])

  useEffect(function(){
    if(localStorage.getItem('token')!=null){
      getUserData();
    }
  },[])
  return <>
  

<RouterProvider router={router}/>

  </>
    
  
}

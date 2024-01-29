import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery'

export const cartContext = createContext(); // Exporting as a named export
 

export default function CartContext({ children,navigate }) {
  // let nav =useNavigate()
  const [numOfcartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const [cartid, setCartid] = useState(null);

 

  async function updateCount(id,count){
    try {
     const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
     {"count":count},
     
     {headers:{'token':localStorage.getItem('token')}}
     );
     if(data.status==='success'){

       setNumOfCartItems(data.numOfCartItems);
       setTotalCartPrice(data.data.totalCartPrice);
       setCartProducts(data.data.products);
       
       return true;
       
       
       
     }
    } 
    catch (error) {
     console.log("error",error);
     
    }

 }

//  async function clearCart(){
//   try {
//    const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
   
//    {headers:{'token':localStorage.getItem('token')}}
//    );
//    if(data.status==='success'){

//      setNumOfCartItems(data.numOfCartItems);
//      setTotalCartPrice(data.data.totalCartPrice);
//      setCartProducts(data.data.products);
     
//      return true;
     
     
     
//    }
//   } 
//   catch (error) {
//    console.log("error",error);
   
//   }

// }


  async function removeCartProducts(id,count){
     try {
      const {data}=await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
      
      {headers:{token:localStorage.getItem('token')}}
      );
      if(data.status==='success'){
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        return true;
        
        
        
      }
     } 
     catch (error) {
      console.log("error",error);
      
     }

  }
  
  async function addProductToCart(proId) {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: proId },
        { headers: { token: localStorage.getItem('token') } }
      );

      if (data.status === 'success') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getCartProducts() {
    try {
      const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
        headers: { token: localStorage.getItem('token') }
      });
console.log(data.data._id);
      // console.log(data.numOfCartItems);
      // console.log(data.data.totalCartPrice);
      // console.log(data.data.products);

      if (data.status === 'success') {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setCartid(data.data._id);
      }
      
    } catch (error) { 
      if(error.response.status===404){
        $('.errorCart').fadeIn(500,function(){
          setTimeout(() => {
            $('.errorCart').fadeOut(500);
            <Link to="/home">
            </Link>
           
            
          }, 2000);
        })
      }
      
    }
  }

  useEffect(() => {
    getCartProducts();
  },);

  return (
    <cartContext.Provider
      value={{
        removeCartProducts,
        addProductToCart,
        updateCount,
        // clearCart,
        numOfcartItems,
        Cartproducts: cartProducts, // Corrected the spelling here
        totalCartPrice,
        cartid,
        

        
      }}
    >
      <div style={{'display':'none'}} className='alert alert-danger errorCart'>
        No Cart exits..
      </div>

      {children}
    </cartContext.Provider>
  );
}
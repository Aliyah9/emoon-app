
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useParams } from 'react-router-dom';
import $ from 'jquery'
import { cartContext } from '../Context/CartContext';

export default function ProductDetails() {
  
 

  async function addMyProduct(id){
    if(await addProductToCart(id)===true){
      $('.successMsg').fadeIn(1000,function(){

        setTimeout(()=>{
          $('.successMsg').fadeOut(1000)

        },2000);
      });
      $('#DelBtn').fadeIn(500);
      $('#addBtn').fadeOut(500);

    };


  }
 const{addProductToCart,removeCartProducts}=useContext(cartContext);

 const {id}= useParams();
 
  const [productDetails,setproductDetails]=useState([]);

  async function getProductDetails(){

    
    try {
      const {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
      setproductDetails(data.data);
    } 
    catch (e) {
      console.error('Error', e)
    }


    
  }


  useEffect(function(){


    getProductDetails()
  }
  );

  
  
  
  async function  removeMyProduct(id){
    if(await removeCartProducts(id)===true){
      $('.removeMsg').fadeIn(500,function(){

        setTimeout(()=>{
          $('.removeMsg').fadeOut(500)

        },2000);
      });

      $('#addBtn').fadeIn(500);
      $('#DelBtn').fadeOut(500);

    }

  }
  
  return <>
{productDetails ? <div className="container">
    <div className="row">
      <div className="col-md-3">
        <div className="container">

          <img src={productDetails.imageCover} className=" w-100" alt={productDetails.title} />
        </div>
      </div>

      <div className="col-md-9">
        <div className="container m-3">

          <h2 className='my-3  text-body-emphasis'>{productDetails.title}</h2>
          <p className='py-2'>{productDetails.description}</p>
          <ul className='list-unstyled'>
          

            {productDetails.priceAfterDiscount? <li>Price: {productDetails.priceAfterDiscount}</li>: <li>Price: {productDetails.price}</li>}
            <li>Quantity: {productDetails.quantity}</li>
            <li>Rate: {productDetails.ratingsAverage}</li>
          </ul>
          <button id='addBtn' onClick={function(){addMyProduct(productDetails.id)}} className='btn btn-success w-75 m-3'>Add to cart +</button>
          <button onClick={function(){
            removeMyProduct(productDetails.id)

          }} style={{'display':'none'}} id='DelBtn' className='btn btn-danger w-75'>Remove from cart -</button>

            <div style={{'display':'none'}} className="alert alert-success text-center successMsg m-5">

            product added successfully..
            </div>

            <div style={{'display':'none'}} className="alert alert-success text-center removeMsg m-5">

            product removed successfully..
            </div>

        </div>
      </div>
    </div>



  </div>:<LoadingScreen/>}

  
  
  
  </>
    
}

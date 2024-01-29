import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import MySlider from '../MySlider/MySlider';
import { useContext } from 'react';
import $ from 'jquery'
import { cartContext } from '../Context/CartContext';

export default function Home() {

 async function addMyProduct(id,index){
    if(await addProductToCart(id)===true){
      $('.successMsg').fadeIn(500,function(){
        setTimeout(() => {
          $('.successMsg').fadeOut(500)
        }, 2000);
        
      }
      )
   $(`#addBtn${index}`).fadeOut(500);
   $(`#removeBtn${index}`).fadeIn(500);
    }

  }
  const {addProductToCart}=useContext(cartContext)



  const[allProducts,setAllProducts]=useState(null);

  async function getAllProducts(){



   try{
    const {data}=await axios.get('https://route-ecommerce.onrender.com/api/v1/products');
    //console.log(data.data);
// set all products de ht8yrlk l values bta3tk we hat3mlk re render
    setAllProducts(data.data);
   }

   catch(e){
    console.log("Error!");
    return e;

   }


  }
  useEffect (function(){
    getAllProducts();
  },[]);

  // lazm nstkhdm use state ll all products ly hia array 3shan l re render myd3ysh l data fa lazm nstkhdm useState hook
  // use effect de btakhud mny 7agten... function and dependencies array kda sh8ala component did mount y3nhy a2dr a call feha function btrg3 data mn l api

  return <>

  {/* hn3ml loading screen l7ad ma l data tegy */}

  {allProducts? <div className=" container">

   <MySlider/>
   <div style={{'zIndex':'99999', 'display':'none'}} className="alert successMsg position-fixed bottom-0 end-0 start-0 alert-success text-center">Product added successfully..</div>


<div className="row gy-5 mt-3">


{allProducts.map(function(product,index){return  <div key={index} className="col-md-2">  






<div className="items rounded-2  text-black-50 mx-3 my-3 position-relative">

<Link to={`/productdetails/${product.id}`}>
 <div className="upper">
 <img src={product.imageCover}  className='w-100' alt={product.title} />
 <h5 className='text-center text-primary-emphasis w-100'>{product.title.slice(0, product.title.indexOf(' ',20))}</h5>
 <h6>{product.category.name}</h6>
 <h6>
  {product.priceAfterDiscount?
 
 <div className="p-2 text-black-50">
  <div className="div">price: < span   className=' text-decoration-line-through'>
  {product.price}
  </span></div>
  
  
 price after discount: <div className="">{product.priceAfterDiscount}
  </div> 

  
  
  
  </div> : <span>price: {product.price}</span>} </h6>

  
  


  <div className="position-absolute top-0 end-0 bg-primary">{product.ratingsAverage}</div>

 </div>
 </Link>
 <div className="lower">
  <button id={`addBtn${index}`} onClick={function(){

addMyProduct(product.id,index)

 }} 
 className='btn btn-primary m-3'>+</button>

<button id={`removeBtn${index}`} style={{'display':'none'}}
 className='btn btn-danger'>-</button>
 </div>

 

  
</div>


</div>
})}


{/*repeated element hwa l col-md-2 */}

</div>



</div>: <LoadingScreen/>}

 
  
  </>
    
  
}

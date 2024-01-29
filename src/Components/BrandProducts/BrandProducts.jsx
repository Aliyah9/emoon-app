
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link, useParams } from 'react-router-dom';

export default function BrandProducts() {
const {id}=useParams();

   const [allproducts,setall]=useState([]);

    async function getallBrandProducts(){
        try {
            const {data}=await axios.get("https://route-ecommerce.onrender.com/api/v1/products",{ 

            params:{'brand': id}
            });
            setall(data.data);
            
        } catch (e) {
            console.error('Error', e)
        }
        
    }

    useEffect(function(){

        getallBrandProducts();
    },[])
  return <>
  {allproducts.length===0 ?
  <div className="div text-body-tertiary">
  <h2 className='py-5 m-4'>I'am Sorry this brand products are not available at the moment.</h2>

  

  
  </div>: allproducts ?  <div className="container">
    <div className="row">

       { allproducts.map(function(product,index){
            return <div key={index} className="col-md-3">
            <Link to={`/productdetails/${product.id}`}>


<div className="items rounded-2 text-black-50 position-relative">
 <img src={product.imageCover}  className='w-100' alt={product.title} />
 <h5 className='text-center text-primary-emphasis w-100 py-3'>{product.title.slice(0, product.title.indexOf(' ',20))}</h5>
 <h6>{product.category.name}</h6>
 <h6>
  {product.priceAfterDiscount?
 
 <div className="p-2">
  <div className="div">price: < span   className=' text-decoration-line-through'>
  {product.price}
  </span></div>
  
  
 price after discount: <div className="">{product.priceAfterDiscount}
  </div> 

  
  
  
  </div> : <span className='py-3'>price: {product.price}</span>} </h6>
  


  <div className="position-absolute top-0 end-0 bg-primary text-black">{product.ratingsAverage}</div>



</div>

</Link>
        </div>
        })
        }

        
    </div>
  </div> : <LoadingScreen/>};
  
  
  
  
  
  
  </>
}

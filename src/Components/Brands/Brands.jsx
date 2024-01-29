import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';



export default function Brands() {



    let [allBrands,setAllbrands]=useState(null);

    async function getAllBrands(){
     try
        {
            const {data}= await axios.get('https://route-ecommerce.onrender.com/api/v1/brands');
            // console.log(data);
            setAllbrands(data.data);
     
          }
     
     catch(e){
        
        console.log("Error");
        return e;

     }
    }


     useEffect (function(){
        getAllBrands();
      },[]);


  return <>


  {allBrands? <div className="container">
    <div className="row">



        <div className="col-md-3">
            <div className="title">
                <h4 className='p-3 text-primary-emphasis w-100'>Our Brands</h4>
                <p className='text-black-50'>You can see our brands and each brand includes the products in it.</p>


            </div>
        </div>

        {allBrands.map(function(brand,index){

            return <div key={index} className="col-md-3">
                <Link to ={`/brandproducts/${brand._id}`}>


                <div className="brand">
                <img src={brand.image} className='w-100' alt={brand.name} />
                <h4 className='text-primary-emphasis w-100 p-3'>{brand.name}</h4>
                
            </div>



                </Link>
            
        </div>

        })}
        
    </div>






  </div> :<LoadingScreen/> }
{/* api https://route-ecommerce-app.vercel.app/api/v1/brands */}
  




  </>
}

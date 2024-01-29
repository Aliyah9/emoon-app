import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Orders({currentuser}) {
    const [allOrders, setAllOrders] = useState(null);
    
   
    async function getAllOrders(){
        try {
            const {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${currentuser.id}`)
            console.log(data);
            setAllOrders(data);
            
    
        } catch (error) {
           
            console.log("error",error);
            
        }
    }
     console.log(currentuser);




    useEffect(function(){
        getAllOrders();
    

    },[])
  return <>

{allOrders ? (
  <div className="container mt-4">
    <div className="row justify-content-center">
      {allOrders.map((order, idx) => (
        <div key={idx} className="col-md-8 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark-subtle text-white">
              <h5 className="mb-0">Order Details</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p><strong>Count:</strong> {order.cartItems.length}</p>
                  <p><strong>Total Price :</strong> {order.totalOrderPrice}</p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Shipping Address:</strong> {order.shippingAddress.details}, {order.shippingAddress.city}, Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              <div className="row">
                {order.cartItems.map((item, index) => (
                  <div key={index} className="col-md-3 mb-3">
                    <div className="card">
                      <img src={item.product.imageCover} alt={item.product.title} className="card-img-top" />
                      <div className="card-body">
                        <h6 className="card-title">{item.product.title.slice(0, 15)}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <LoadingScreen />
)}


  </>
}

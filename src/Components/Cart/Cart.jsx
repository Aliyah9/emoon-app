import React, { useContext, useState } from 'react';
import { cartContext } from '../Context/CartContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
export default function Cart() {

  
  const{totalCartPrice,Cartproducts,removeCartProducts,updateCount}= useContext(cartContext);

  const [productCounts, setProductCounts] = useState({});
  const [removeItemIntent, setRemoveItemIntent] = useState({});

  if (!Cartproducts) {
    return <LoadingScreen />;
  }

  // Initialize productCounts if Cartproducts is not null
  if (Object.keys(productCounts).length === 0) {
    const initialCounts = Cartproducts.reduce((counts, pro) => {
      counts[pro.product.id] = pro.count;
      return counts;
    }, {});
    setProductCounts(initialCounts);
  }

  const handleInputChange = (productId, event) => {
    let newCount = Number(event.target.value);
    
    // Ensure the input is not negative
    if (newCount < 0) {
      newCount = 0; // Set count to 0 if it's negative
    }

    const newCounts = { ...productCounts, [productId]: newCount };
    setProductCounts(newCounts);
    
    if (newCount === 0 && removeItemIntent[productId]) {
      
      setRemoveItemIntent({ ...removeItemIntent, [productId]: false });
      removeCartProducts(productId); // Reset removeItemIntent
    }
  };
  const handlePlusButtonClick = (productId) => {
    setRemoveItemIntent({ ...removeItemIntent, [productId]: true });
    // Perform other actions related to the + button click
    updateCount(productId, productCounts[productId]); // Update count
  };
  return <>
  


  {Cartproducts? <div className='container py-4 m-5'>
      <div className="d-flex justify-content-between align-content-center">
      <h4>
        total price: <span className='text-primary'>${totalCartPrice}</span>
      
      </h4>
    
      <Link to="/payment">
      <button className='btn btn-primary'>Confirm order </button>
      </Link>



      </div>
      {/* <h4>
        number of items <span className='text-primary m-2'>{numOfcartItems}</span>
        
      </h4> */}
      

        <div className="row ">

        {Cartproducts.map(function(pro,idx){
          return <div key={idx} className='col-md-6 py-4 '>
          
          <div className="product">
          <img src={pro.product.imageCover} className='w-50' alt={pro.product.title} />
          <h4>{pro.product.title}</h4>
            <h5>Count: <span className='text-primary'>{pro.count}</span></h5>
            <h5>Price per item: <span className='text-primary'>${pro.price}</span></h5>
            <input
                    type='number'
                    className='form-control w-50 active'
                    placeholder='count'
                    value={productCounts[pro.product.id]} // Use separate state for each product's count
                    onChange={(event) => handleInputChange(pro.product.id, event)} // Update specific product's count
                  />

            <button onClick={function(){
              removeCartProducts(pro.product.id)
            }} className='btn btn-danger m-3'>remove item</button>

                    <button
                     onClick={() => handlePlusButtonClick(pro.product.id)}
                     className='btn btn-success m-3'>
                    +
                  </button>
          </div>
         
          

          

        </div> 

        })}
  {/* <div className="d-flex justify-content-between align-content-center">
  <button onClick={() => clearCart()}  className='btn btn-primary w-25 m-4'>clear cart</button>
  </div> */}


        </div>
    </div>: <LoadingScreen/>}
  
  
  </>
}
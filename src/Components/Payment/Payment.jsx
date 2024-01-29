import axios from 'axios';
import React, { useContext, useState } from 'react';
import { cartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const { cartid } = useContext(cartContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const nav = useNavigate();

  async function ConfirmOrder() {
    // Validation logic
    if (!fullName || !email || !phone || !city || !address) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      if (paymentMethod === 'creditCard') {
        await ConfirmCreditOrder();
      } else {
        const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cartid}`, {
          shippingAddress: {
            details: address,
            phone: phone,
            city: city,
          },
        }, {
          headers: { 'token': localStorage.getItem('token') },
        });

        if (data.status === 'success') {
          nav('/Orders');
        }

        console.log(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function ConfirmCreditOrder() {
    // Validation logic
    if (!fullName || !email || !phone || !city || !address) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartid}`, {
        shippingAddress: {
          details: address,
          phone: phone,
          city: city,
        },
      }, {
        headers: { 'token': localStorage.getItem('token') },
        params: { "url": "http://localhost:3000" },
      });

      if (data.status === "success") {
        window.open(data.session.url);
      }
    } catch (error) {
      console.log("error", error);
    }
    
  }
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    // If payment method is "creditCard", automatically trigger ConfirmCreditOrder
    if (e.target.value === 'creditCard') {
      ConfirmCreditOrder();
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="my-4">Checkout</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <select className="form-select" id="city" value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">Select a city</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Egypt">Egypt</option>
            <option value="UAE">UAE</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea placeholder='Detailed Address..' className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows="3" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
          <select className="form-select" id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange} required>
            <option value="">Select payment method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="COD">Cash on Delivery</option>
          </select>
        </div>
        <button type="button" onClick={ConfirmOrder} className="btn btn-primary my-3 mx-3">Place Order</button>
        {/* <button type="button" onClick={ConfirmCreditOrder} className="btn btn-primary my-3 mx-3">Place Credit Order</button> */}
      </form>
    </div>
  );
}

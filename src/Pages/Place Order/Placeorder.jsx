import React, { useState, useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {
  const { getTotalCartAmount } = useContext(StoreContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('https://protien-backend-1.onrender.com/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getTotalCartAmount() * 100, // Convert to paise (10000 = ₹100)
          redirectUrl: 'https://rocketmeals.netlify.app/payment-success',
          message: 'Payment for food order'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        // Redirect to PhonePe payment page
        window.location.href = result.data
      } else {
        alert('Payment initiation failed: ' + result.message)
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='placeorder'>
      <div className='placeorder-container'>
        <h1>Complete Your Order</h1>
        <div className='order-summary'>
          <h2>Order Summary</h2>
          <p>Total Amount: ₹{getTotalCartAmount()}</p>
        </div>
        
        <button 
          className='payment-btn' 
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  )
}

export default Placeorder

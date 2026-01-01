import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/storeContext'
import { assets } from '../../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, validatePromoCode, removePromoCode, promoCode, discountApplied, promoCodes } = useContext(StoreContext)
  const [promoInput, setPromoInput] = useState("")
  const [promoMessage, setPromoMessage] = useState("")
  const navigate = useNavigate()

  let subtotal = 0

  // Calculate subtotal
  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      subtotal += item.price * cartItems[item._id]
    }
  })

  const deliveryFee = subtotal === 0 ? 0 : 2
  let discount = 0
  if (discountApplied && promoCode) {
    discount = Math.round((subtotal * promoCodes[promoCode]) / 100 * 100) / 100
  }
  const total = subtotal - discount + deliveryFee

  const handlePromoSubmit = () => {
    if (!promoInput.trim()) {
      setPromoMessage("Please enter a promo code")
      return
    }
    
    const result = validatePromoCode(promoInput)
    if (result.valid) {
      setPromoMessage(`✓ Promo code "${promoInput.toUpperCase()}" applied! ${result.discount}% off`)
      setPromoInput("")
    } else {
      setPromoMessage("Invalid promo code. Try UG20, UG10, or WELCOME")
    }
  }

  const handleRemovePromo = () => {
    removePromoCode()
    setPromoInput("")
    setPromoMessage("")
  }

  const handleCheckout = () => {
    if (Object.keys(cartItems).length === 0) {
      setPromoMessage("Your cart is empty!")
      return
    }
    navigate('/placeorder')
  }

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className='cart'>
        <div className='cart-empty-state'>
          <p className='empty-text'>Your cart is empty</p>
          <p className='empty-subtext'>Add some delicious items to get started!</p>
          <button className='cart-continue-btn' onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    )
  }

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-item'>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <div className='cart-item-quantity'>
                    <img
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt='remove'
                    />
                    <p>{cartItems[item._id]}</p>
                    <img
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_green}
                      alt='add'
                    />
                  </div>
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>
                    ✕
                  </p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className='cart-total-details discount-row'>
                  <p>Discount ({promoCode} - {promoCodes[promoCode]}%)</p>
                  <p className='discount-text'>-${discount.toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}
            <div className='cart-total-details final-total'>
              <p>
                <b>Total</b>
              </p>
              <p>
                <b>${total.toFixed(2)}</b>
              </p>
            </div>
          </div>
          <button className='cart-proceed-btn' onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>

        <div className='cart-promo-code'>
          <div>
            <p>Apply Promo Code</p>
            {discountApplied ? (
              <div className='promo-applied'>
                <div className='promo-success'>
                  <p>✓ {promoCode} applied</p>
                  <button className='promo-remove-btn' onClick={handleRemovePromo}>Remove</button>
                </div>
              </div>
            ) : (
              <>
                <div className='cart-promo-input'>
                  <input 
                    type='text' 
                    placeholder='e.g. UG20' 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePromoSubmit()}
                  />
                  <button onClick={handlePromoSubmit}>Apply</button>
                </div>
                {promoMessage && (
                  <p className={`promo-message ${promoMessage.includes('✓') ? 'success' : 'error'}`}>
                    {promoMessage}
                  </p>
                )}
                <p className='promo-hint'>Try: UG20 (20% off), UG10 (10% off), WELCOME (15% off)</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

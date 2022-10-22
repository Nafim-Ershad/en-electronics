import React, {useRef} from 'react';
import Link from 'next/link';
import {AiOutlineShopping, AiOutlineMinus, AiOutlinePlus, AiOutlineLeft} from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import toast from 'react-hot-toast';

import {useStateContext} from '../context/StateContext';
import {urlFor} from '../lib/client';
import getStripe from '../lib/getStripe';

function Cart() {
  const cartRef = useRef();
  const {totalPrice, totalQuantities, setShowCart, cartItems, toggleCartItemQuantity, onRemove} = useStateContext();
  
  const handleCheckout = async() => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button className="cart-heading" type='button' onClick={()=> setShowCart(false)}>
          <AiOutlineLeft/>
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        
        {
          cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150}/>
              <h3>Your Shopping Cart is Empty</h3>
              <Link href='/'>
                <button className="btn" type='button' onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          )
        }

        <div className="product-container">
          {
            cartItems.length >= 1 && cartItems.map((item, idx) => (
              <div className="product" key={item._id}>
                <img src={urlFor(item?.image[0])} alt="" className='cart-product-image'/>

                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                          <span className="minus" onClick={()=> toggleCartItemQuantity(item._id, 'dec')}>
                              <AiOutlineMinus/>
                          </span>
                          <span className="num">
                              {item.quantity}
                          </span>
                          <span className="plus" onClick={()=> toggleCartItemQuantity(item._id, 'inc')}>
                              <AiOutlinePlus/>
                          </span>
                      </p>
                    </div>
                    <button type='button' className='remove-item' onClick={ ()=> onRemove(item)}><TiDeleteOutline/></button>
                  </div>
                </div>
              </div>
            ))}
          {
            cartItems.length >= 1 && (
              <div className="cart-bottom">
                <div className="total">
                  <h3>Sub-Total:</h3>
                  <h3>${totalPrice}</h3>
                </div>
                <div className="btn-container">
                  <button className="btn" type='button' onClick={handleCheckout}>
                    Pay With Stripe
                  </button>
                  </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
};

export default Cart;
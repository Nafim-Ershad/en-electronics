import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';

import Cart from './Cart';
import {useStateContext} from '../context/StateContext';

function Navbar() {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  return (
    <div className='navbar-container'>
      <p>
        <Link href='/'>EN Sounds</Link>
      </p>

      <button className="cart-icon" type='button' onClick={() => setShowCart(!showCart)}>
        <AiOutlineShopping/>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart/>}
    </div>
  )
};

export default Navbar;
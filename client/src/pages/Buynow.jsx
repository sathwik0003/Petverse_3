// YourParentComponent.js

import React, { useState } from 'react';
import AddtoCart from './AddtoCart';
import PaymentForm from './Payment';

const Buynow = () => {
  const [cart, setCart] = useState(/* initial cart state */);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [orderData, setOrderData] = useState({ cartItems: [], totalPrice: 0 });

  const handleBuyNowClick = (cartItems, totalPrice) => {
    setOrderData({ cartItems, totalPrice });
    setShowPaymentForm(true);
    alert('Bought')
  };

  return (
    <div>
      {showPaymentForm ? (
        <PaymentForm orderData={orderData} />
      ) : (
        <AddtoCart cart={cart} onBuyNowClick={handleBuyNowClick} />
      )}
    </div>
  );
};

export default Buynow;

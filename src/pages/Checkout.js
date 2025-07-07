import React, { useState } from 'react';

import CheckoutStep1 from './Checkout/CheckoutStep1';
import CheckoutStep2 from './Checkout/CheckoutStep2';
import CheckoutStep3 from './Checkout/CheckoutStep3';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState(() => {
  const saved = JSON.parse(localStorage.getItem('checkoutProducts')) || {};
  return {
    address: {},
    card: {},
    products: saved.products || [],
    total: saved.total || 0,
    orderId: null,
    createdAt: null
  };
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  switch (step) {
    case 1:
      return (
        <CheckoutStep1
          nextStep={nextStep}
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      );
    case 2:
      return (
        <CheckoutStep2
          prevStep={prevStep}
          nextStep={nextStep}
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      );
    case 3:
      return <CheckoutStep3 checkoutData={checkoutData} />;
    default:
      return null;
  }
};

export default Checkout;

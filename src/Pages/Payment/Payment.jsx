import React, { useState } from 'react';
import useCart from '../../Hooks/useCart/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_PK_API_KEY);
const Payment = () => {
    const[cart]=useCart();
    const totalValue =   cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    // setTotal(totalValue);
    return (
        <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Checkout</h1>

      {/* Cart Summary */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <table className="w-full mt-3 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-3 py-2">Product</th>
              <th className="border border-gray-300 px-3 py-2">Quantity</th>
              <th className="border border-gray-300 px-3 py-2">Price</th>
              <th className="border border-gray-300 px-3 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-3 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  ${item.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-right mt-4 font-semibold">
          Total: ${totalValue.toFixed(2)}
        </h3>
      </div>

      {/* Payment Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm total={totalValue} />
        </Elements>
      </div>
    </div>
    );
};

export default Payment;
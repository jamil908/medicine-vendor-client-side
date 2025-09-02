import React, { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/useAuth/UseAuth";
import useCart from "../../Hooks/useCart/useCart";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ total }) => {
  const navigate = useNavigate();
  const [cart, refetch] = useCart();
  const { user } = UseAuth();
  const { setLoading } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecrete, setClientSecrete] = useState('');
  const [transactionId, setTransactionId] = useState();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: total })
      .then(res => {
        console.log('clientSecrete', res.data.clientSecrete);
        setClientSecrete(res.data.clientSecrete);
      });
  }, [axiosSecure, total]);

  const handleSaveSales = async (transactionId) => {
    try {
      const response = await axiosSecure.post('/sales', {
        cartData: cart, // Save the cart data
        transactionId,  // Save the transaction ID
        userEmail: user.email, // Save user email for reference
        date: new Date(), // Save the timestamp
      });

      console.log("Sales data saved:", response.data);
    } catch (error) {
      console.error("Error saving sales data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Payment error:", error.message);
      setIsProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecrete, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.log("Confirm error:", confirmError);
      setIsProcessing(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        console.log('Transaction ID:', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          name: user.displayName,
          email: user.email,
          price: total,
          date: new Date(),
          cartIds: cart.map(item => item._id),
          cartItemIds: cart.map(item => item.id),
          status: 'pending',
          transactionId: paymentIntent.id,
        };

        const res = await axiosSecure.post('/payments', payment);
        console.log("Payment saved:", res.data);
                
        // **Save the cart data in the sales collection**
        await handleSaveSales(paymentIntent.id);

        refetch();
        navigate(`/invoice/${paymentIntent.id}`);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Your ${total} has been paid`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setIsProcessing(false);
    }
  };

  // Custom styles for CardElement
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4',
        },
        iconColor: '#c4f0ff',
      },
      invalid: {
        iconColor: '#ef4444',
        color: '#ef4444',
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Secure Payment</h2>
        <p className="text-gray-600">Complete your purchase with confidence</p>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Order Summary Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 className="text-xl font-semibold">Payment Details</h3>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-sm">Total Amount</p>
              <p className="text-2xl font-bold">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Customer Info Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Customer Information
            </h4>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
                <span className="font-medium">Email:</span>
                <span className="ml-2">{user?.email || 'Not provided'}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="font-medium">Name:</span>
                <span className="ml-2">{user?.displayName || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Card Details Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              Card Information
            </h4>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 hover:border-orange-300 transition-colors duration-200">
                <CardElement 
                  options={cardElementOptions}
                  className="w-full"
                />
              </div>
              
              {/* Security badges */}
              <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span>256-bit Encryption</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={!stripe || !clientSecrete || isProcessing}
              className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center">
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Pay ${total.toFixed(2)}
                  </>
                )}
              </div>
            </button>
            
            {/* Transaction ID Display */}
            {transactionId && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <p className="text-green-800 font-semibold">Payment Successful!</p>
                    <p className="text-green-600 text-sm">Transaction ID: <span className="font-mono bg-green-100 px-2 py-1 rounded">{transactionId}</span></p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
              <span>Powered by Stripe</span>
              <span>•</span>
              <span>PCI DSS Compliant</span>
              <span>•</span>
              <span>Your data is protected</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
import React, { useState } from 'react';
import useCart from '../../Hooks/useCart/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PK_API_KEY);

const Payment = () => {
    const [cart] = useCart();
    const totalValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Checkout</h1>
                    <p className="text-gray-600 text-lg">Review your order and complete your purchase</p>
                    <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Order Summary and Price Breakdown - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Order Summary Section - Left Side */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        {/* Order Summary Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                </svg>
                                <h2 className="text-xl font-semibold">Order Summary</h2>
                                <span className="ml-auto bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm font-medium">
                                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m6 8a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0z"/>
                                    </svg>
                                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {cart.map((item, index) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-orange-600 font-bold text-sm">{index + 1}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 text-base">{item.name}</h3>
                                                    <p className="text-gray-500 text-xs">${item.price.toFixed(2)} each</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-center">
                                                    <div className="bg-white border border-gray-200 rounded px-2 py-1 min-w-[40px]">
                                                        <span className="font-semibold text-gray-800 text-sm">{item.quantity}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">Qty</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-base text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Price Breakdown Section - Right Side */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                                <h3 className="text-xl font-semibold">Price Breakdown</h3>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-semibold text-gray-800">${totalValue.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-600">Shipping:</span>
                                <span className="font-semibold text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-600">Tax:</span>
                                <span className="font-semibold text-gray-800">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-t-2 border-gray-300">
                                <span className="text-xl font-bold text-gray-800">Total:</span>
                                <span className="text-2xl font-bold text-orange-600">${totalValue.toFixed(2)}</span>
                            </div>
                            
                            {/* Benefits */}
                            <div className="pt-4 space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    Free shipping on all orders
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    30-day money back guarantee
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    24/7 customer support
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                {cart.length > 0 && (
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                                    </svg>
                                    <h3 className="text-2xl font-semibold">Payment Information</h3>
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm total={totalValue} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                )}

                {cart.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 mb-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Items to Checkout</h3>
                        <p className="text-gray-500">Please add items to your cart before proceeding</p>
                    </div>
                )}

                {/* Trust Indicators */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Shop with Confidence</h3>
                        <p className="text-gray-600">Your security and satisfaction are our top priorities</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Secure Payment</h4>
                            <p className="text-gray-600 text-sm">Your payment information is encrypted and secure</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Fast Delivery</h4>
                            <p className="text-gray-600 text-sm">Quick and reliable shipping to your doorstep</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"/>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">24/7 Support</h4>
                            <p className="text-gray-600 text-sm">Round-the-clock customer service assistance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
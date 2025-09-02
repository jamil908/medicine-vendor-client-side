import React from "react";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart/useCart";
import UseAuth from "../../Hooks/useAuth/UseAuth";
import useAxiosPublic from "../../Hooks/axiosPublic/useAxiosPublic";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosPublic = useAxiosPublic();
  const {user} = UseAuth();
  console.log(cart)

  // Handle API requests with axiosPublic
  const handleCartAction = async (url, method, data = null) => {
    try {
      const options = {
        method,
        url,
        data,
      };
      await axiosPublic(options);
      refetch(); // Refetch the updated cart
    } catch (error) {
      console.error("Error handling cart action:", error);
    }
  };

  // Increase quantity
  const handleIncrease = (item) => {
    handleCartAction(`/carts/increase/${item._id}`, "PUT");
  };
  
  // Decrease quantity
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
        console.log(item._id)
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      handleCartAction(`/carts/decrease/${item._id}`, "PUT", updatedItem);
    }
  };

  // Remove item
  const handleRemove = (id) => {
    console.log("Removing item with ID:", id); // Debugging
    handleCartAction(`/carts/${id}`, "DELETE");
  };

  // Clear cart
  const handleClearCart = async () => {
    try {
      // const user =  ; // Get the user's email (assume stored in localStorage)
      const email = user?.email;
  
      if (email) {
        await axiosPublic.delete(`/carts?email=${email}`); // Make DELETE request to the backend
        refetch(); // Refetch the updated cart items
        alert("Cart cleared successfully!");
      } else {
        alert("User email not found. Please log in again.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear the cart. Please try again.");
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m6 8a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Add some items to your cart to get started</p>
          <Link to="/shop" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full">
          
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <h2 className="text-2xl font-semibold flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
                  </svg>
                  Cart Items ({cart.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <div
                    key={item._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                         
                          <img src={item.image} className="w-20 h-20 p-2 border-2 border-emerald-400  rounded"/>
                            
                        
                          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                        </div>
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1"/>
                            </svg>
                            <span className="font-medium">Company:</span>
                            <span className="ml-1">{item.company}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                            </svg>
                            <span className="font-medium">Total Price:</span>
                            <span className="ml-1 text-green-600 font-bold">${item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="w-10 h-10 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 text-gray-600 hover:text-gray-800"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                            </svg>
                          </button>
                          <div className="w-16 text-center">
                            <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>
                            <div className="text-xs text-gray-500">qty</div>
                          </div>
                          <button
                            onClick={() => handleIncrease(item)}
                            className="w-10 h-10 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200 text-gray-600 hover:text-gray-800"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-semibold text-gray-800">{cart.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total Quantity:</span>
                    <span className="font-semibold text-gray-800">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                    <span className="text-xl font-semibold text-gray-800">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    {!cart.length ? (
                      <button className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                        </svg>
                        Checkout
                      </button>
                    ) : (
                      <Link 
                        to="/checkout" 
                        className="block w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                      >
                        <div className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                          </svg>
                          Proceed to Checkout
                        </div>
                      </Link>
                    )}
                    
                    <button
                      onClick={handleClearCart}
                      className="w-full py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center border border-red-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Clear All Items
                    </button>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Free shipping on orders over $50
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      Secure checkout guaranteed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
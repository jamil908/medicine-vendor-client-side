import React from "react";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart/useCart";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseAuth from "../../Hooks/useAuth/UseAuth";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const {user}=UseAuth();
  console.log(cart)

  // Handle API requests with axiosSecure
  const handleCartAction = async (url, method, data = null) => {
    try {
      const options = {
        method,
        url,
        data,
      };
      await axiosSecure(options);
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
        await axiosSecure.delete(`/carts?email=${email}`); // Make DELETE request to the backend
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
  

  if (!cart.length) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
      <div className="grid grid-cols-1 gap-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="p-4 border rounded-lg shadow bg-white flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">Company: {item.company}</p>
              <p className="text-gray-600">Price per Unit: ${item.price * item.quantity}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDecrease(item)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <button
                onClick={() => handleIncrease(item)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleRemove(item._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <button
          onClick={handleClearCart}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear Cart
        </button>
        {
          !cart.length ? <>
         
        <button className=" btn btn-primary">Checkout</button>
          </> : <> <Link  to="/checkout" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
          <button>Checkout</button>
        </Link></>
        }
      </div>
    </div>
  );
};

export default Cart;

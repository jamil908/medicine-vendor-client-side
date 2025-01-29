

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Modal from "../../Shared/Modal";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/useAuth/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart/useCart";

const Shop = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [ ,refetch]=useCart();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
 console.log(cart)
  const axiosSecure = useAxiosSecure();

  // Fetch medicines data
  const { data: medicines = [], isLoading, error } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const response = await axiosSecure.get("/medicines");
      return response.data;
    },
  });
  console.log(medicines)

  // Debugging API response structure
  console.log("Medicines data:", medicines);
  console.log("Cart data:", cart);

  // Safely log cart details
  console.log(cart[0]?.company || "No company data available");



  const handleSelectMedicine = (medicine) => {
    if (user && user.email) {
      if (!cart.find((item) => item.id === medicine.id)) {
        const updatedCart = [...cart, medicine];
        setCart(updatedCart);
  
        const cartItem = {
          ...medicine,
          userEmail: user.email,
          quantity: 1,
        };
  
        // Ensure `_id` is removed before sending to the server
        delete cartItem._id;
  
        axiosSecure
          .post('/carts', cartItem)
          .then((response) => {
            if (response.data.insertedId) {
              Swal.fire({
                title: `Your ${medicine.name} has been added to the cart.`,
                // SweetAlert configurations
              });
              refetch();
            }
          })
          .catch((error) => {
            console.error('Error adding to cart:', error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Failed to add item to the cart.',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${medicine.name} is already in the cart.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: 'You are not logged in',
        text: 'Please log in to add items to the cart.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };
  
  const handleViewDetails = (medicine) => setSelectedMedicine(medicine);
  const closeModal = () => setSelectedMedicine(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Medicines Shop</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Generic Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
            {medicines.map((medicine, index) => (
              <tr key={medicine.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{medicine.name}</td>
                <td className="border px-4 py-2">{medicine.genericName}</td>
                <td className="border px-4 py-2">${medicine.price}</td>
                <td className="border px-4 py-2">{medicine.company}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleViewDetails(medicine)}
                  >
                    Eye
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleSelectMedicine(medicine)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        
      </table>

      {/* Modal */}
      {selectedMedicine && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
            <img
              src={selectedMedicine.image}
              alt={selectedMedicine.name}
              className="mb-4"
            />
            <p>
              <strong>Generic Name:</strong> {selectedMedicine.genericName}
            </p>
            <p>
              <strong>Company:</strong> {selectedMedicine.company}
            </p>
            <p>
              <strong>Price:</strong> ${selectedMedicine.price}
            </p>
            <p>
              <strong>Description:</strong> {selectedMedicine.description}
            </p>
            <button className="btn btn-error mt-4" onClick={closeModal}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Shop;

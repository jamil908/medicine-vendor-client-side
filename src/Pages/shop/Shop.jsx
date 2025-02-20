

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../Shared/Modal";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/useAuth/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart/useCart";
import useAxiosPublic from "../../Hooks/axiosPublic/useAxiosPublic";
import { HiEye, HiShoppingCart } from "react-icons/hi";

const Shop = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [ ,refetch]=useCart();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
 console.log(cart)
  const axiosPublic = useAxiosPublic();

  // Fetch medicines data
  const { data: medicines = [], isLoading, error } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const response = await axiosPublic.get("/medicines");
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
  
        axiosPublic
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
     <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto w-fit  lg:grid-cols-4  gap-7">
     {medicines.map((medicine,index)=>(
      <div
  className="h-[20em] w-[20em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#1e7685] to-[rgba(46,165,176,0.95)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px] overflow-hidden"
>
  <div className="relative w-full h-[12em]">
    <img
      alt={medicine.name}
      src={medicine.image}
      className="w-full h-32 object-fill rounded-md"
    />
  </div>
  <div className="flex justify-between">
    <div>
      <h3 className="text-sm font-medium">name: {medicine.name}</h3>
      <h3 className="text-sm font-medium">company: {medicine.genericName}</h3>
    </div>
    <h3 className="text-sm font-medium">price: ${medicine.price}</h3>
  </div>
  <button
    className="btn btn-sm btn-primary"
    onClick={() => handleViewDetails(medicine)}
  ><HiEye></HiEye>
    Eye
  </button>
  <button
    className="btn btn-sm bg-teal-500 "
    onClick={() => handleSelectMedicine(medicine)}
  ><HiShoppingCart></HiShoppingCart>
    buy
  </button>
</div>

))}
     </div>

   
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
            <button className="btn btn-error bg-teal-500 mt-4" onClick={closeModal}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Shop;

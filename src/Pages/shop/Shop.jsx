import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../Shared/Modal";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/useAuth/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart/useCart";
import useAxiosPublic from "../../Hooks/axiosPublic/useAxiosPublic";
import { HiEye, HiShoppingCart } from "react-icons/hi";
import { X, Pill, Building, DollarSign } from "lucide-react";

const Shop = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const axiosPublic = useAxiosPublic();

  // Fetch medicines data
  const { data: medicines = [], isLoading, error } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const response = await axiosPublic.get("/medicines");
      return response.data;
    },
  });

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
                width: 600,
                padding: '3em',
                color: '#716add',
                background: '#fff url(/images/trees.png)',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">
            <p className="text-lg font-medium">Loading medicines...</p>
            <p className="text-blue-600 text-sm">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-emerald-600 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg border shadow-lg max-w-md">
          <p className="text-red-700 font-semibold text-lg mb-2">Failed to load medicines</p>
          <p className="text-red-600 text-sm mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-100 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Medicines Shop
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">{medicines.length}</span> medicines available
          </p>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicines.map((medicine, index) => (
            <div
              key={index}
              className="bg-emerald-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:border-blue-200 group"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300"></div>
                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold transform hover:scale-105 transition-transform duration-200">
                  ${medicine.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {medicine.name}
                </h3>
                
                <div className="space-y-1 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-blue-500" />
                    <span className="truncate">{medicine.genericName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-purple-500" />
                    <span className="truncate">{medicine.company}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleViewDetails(medicine)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-md group"
                  >
                    <HiEye className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    View
                  </button>
                  <button
                    onClick={() => handleSelectMedicine(medicine)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
                  >
                    <HiShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {medicines.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Pill className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No medicines available</h3>
            <p className="text-gray-600">Check back later for new medicines.</p>
          </div>
        )}
      </div>

      {/* Compact Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 pr-4 leading-tight">
                {selectedMedicine.name}
              </h3>
              <button 
                onClick={closeModal}
                className="flex-shrink-0 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

              {/* Modal Content */}
            <div className="p-4">
              {/* Image */}
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={selectedMedicine.image}
                  alt={selectedMedicine.name}
                  className="w-full h-40 object-cover border border-gray-200 rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Pill className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">Generic Name</p>
                    <p className="text-sm text-gray-600 truncate">{selectedMedicine.genericName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">Company</p>
                    <p className="text-sm text-gray-600 truncate">{selectedMedicine.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Price</p>
                    <p className="text-lg font-bold text-green-600">${selectedMedicine.price}</p>
                  </div>
                </div>
                
                {selectedMedicine.description && (
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900 mb-1">Description</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedMedicine.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-4 border-t border-gray-200">
              <button 
                onClick={closeModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSelectMedicine(selectedMedicine);
                  closeModal();
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
              >
                <HiShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
};

export default Shop;
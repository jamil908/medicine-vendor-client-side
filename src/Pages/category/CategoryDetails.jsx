import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Modal from '../../Shared/Modal';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/useAuth/UseAuth';
import useCart from '../../Hooks/useCart/useCart';
import { Eye, ShoppingCart, Pill, Building, DollarSign, Package, ArrowLeft, X } from 'lucide-react';

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const [, refetch] = useCart();

  // Fetch medicines data
  const { data: medicines = [], isLoading, error } = useQuery({
    queryKey: ['medicines', categoryName],
    queryFn: async () => {
      const res = await axiosSecure.get(`/medicines/${categoryName}`);
      return res.data;
    },
  });

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg border shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-500" />
          </div>
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

  // Handle adding medicine to the cart
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

        axiosSecure
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

  // Handle viewing details of a medicine
  const handleViewDetails = (medicine) => setSelectedMedicine(medicine);
  const closeModal = () => setSelectedMedicine(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
              <Pill className="w-4 h-4" />
              Category Medicines
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-blue-600">{medicines.length}</span> medicines available
          </p>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicines.map((medicine, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-full object-cover"
                />
                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${medicine.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
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
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(medicine)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleSelectMedicine(medicine)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
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
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600 mb-6">No medicines available in this category yet.</p>
            <button 
              onClick={() => navigate(-1)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Categories
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedMedicine.name}
              </h3>
              <button 
                onClick={closeModal}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <div>
                  <img
                    src={selectedMedicine.image}
                    alt={selectedMedicine.name}
                    className="w-full h-64 object-cover rounded-lg border border-gray-200"
                  />
                </div>
                
                {/* Details */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-900">Generic Name</span>
                    </div>
                    <p className="text-gray-700">{selectedMedicine.genericName}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-gray-900">Company</span>
                    </div>
                    <p className="text-gray-700">{selectedMedicine.company}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-gray-900">Price</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedMedicine.price}
                    </p>
                  </div>
                </div>
              </div>
              
              {selectedMedicine.description && (
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    Description
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{selectedMedicine.description}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button 
                onClick={closeModal}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSelectMedicine(selectedMedicine);
                  closeModal();
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
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

export default CategoryDetails;
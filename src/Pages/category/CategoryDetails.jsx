
// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Modal from '../../Shared/Modal';
// import Swal from 'sweetalert2';
// import UseAuth from '../../Hooks/useAuth/UseAuth';
// import useCart from '../../Hooks/useCart/useCart';

// const CategoryDetails = () => {
//   const { categoryName } = useParams();
//   const navigate = useNavigate()
//   console.log(categoryName)
//   const { user } = UseAuth();
//   const axiosSecure = useAxiosSecure();
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [ ,refetch]=useCart()

//   // Fetch medicines data
//   const { data: medicines = [], isLoading, error } = useQuery({
//     queryKey: ['medicines', categoryName],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/medicines/${categoryName}`);
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <p className="text-center text-blue-500">Loading medicines...</p>;
//   }

//   if (error) {
//     return (
//       <p className="text-center text-red-500">
//         Failed to load medicines: {error.message}
//       </p>
//     );
//   }

//   // Handle adding medicine to the cart
//   const handleSelectMedicine = (medicine) => {
//     if (user && user.email) {
//       if (!cart.find((item) => item.id === medicine.id)) {
//         const updatedCart = [...cart, medicine];
//         setCart(updatedCart);

//         const cartItem = {
//           ...medicine,
//           userEmail: user.email,
//           quantity:1
//         };

//         axiosSecure
//           .post('/carts', cartItem)
//           .then((response) => {
//             if (response.data.insertedId) {
//               Swal.fire({
//                 title: `Your ${medicine.name} has been added to the cart.`,
//                 width: 600,
//                 padding: '3em',
//                 color: '#716add',
//                 background: '#fff url(/images/trees.png)',
//                 backdrop: `
//                   rgba(0,0,123,0.4)
//                   url("/images/nyan-cat.gif")
//                   left top
//                   no-repeat
//                 `,
//               });
//               refetch()
//             }
//           })
//           .catch((error) => {
//             console.error('Error adding to cart:', error);
//             Swal.fire({
//               position: 'top-end',
//               icon: 'error',
//               title: 'Failed to add item to the cart.',
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           });
//       } else {
//         Swal.fire({
//           position: 'top-end',
//           icon: 'error',
//           title: `${medicine.name} is already in the cart.`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     } else {
//       Swal.fire({
//         title: 'You are not logged in',
//         text: 'Please log in to add items to the cart.',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, login',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/login', { state: { from: location } });
//         }
//       });
//     }
//   };

//   // Handle viewing details of a medicine
//   const handleViewDetails = (medicine) => setSelectedMedicine(medicine);
//   const closeModal = () => setSelectedMedicine(null);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold text-center mb-8">
//         Medicines in Category: {categoryName}
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">Image</th>
//               <th className="border border-gray-300 p-2">Medicine Name</th>
//               <th className="border border-gray-300 p-2">Generic Name</th>
//               <th className="border border-gray-300 p-2">Company</th>
//               <th className="border border-gray-300 p-2">Price</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>


        

//           <tbody>
//   {medicines.map((medicine, index) => (
//     <tr key={index}>
//       <td className="border border-gray-300 p-2">
//         <img
//           src={medicine.image}
//           alt={medicine.name}
//           className="w-16 h-16 object-cover"
//         />
//       </td>
//       <td className="border border-gray-300 p-2">{medicine.name}</td>
//       <td className="border border-gray-300 p-2">{medicine.genericName}</td>
//       <td className="border border-gray-300 p-2">{medicine.company}</td>
//       <td className="border border-gray-300 p-2">${medicine.price}</td>
//       <td className="border border-gray-300 p-2 space-x-2">
//         <button
//           className="btn btn-sm btn-primary"
//           onClick={() => handleViewDetails(medicine)}
//         >
//           Eye
//         </button>
//         <button
//           className="btn btn-sm btn-secondary"
//           onClick={() => handleSelectMedicine(medicine)}
//         >
//           Select
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>



//         </table>
//       </div>

//       {/* Modal */}
//       {selectedMedicine && (
//         <Modal isOpen={true} onRequestClose={closeModal}>
//           <div className="p-4">
//             <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
//             <img
//               src={selectedMedicine.image}
//               alt={selectedMedicine.name}
//               className="mb-4"
//             />
//             <p>
//               <strong>Generic Name:</strong> {selectedMedicine.genericName}
//             </p>
//             <p>
//               <strong>Company:</strong> {selectedMedicine.company}
//             </p>
//             <p>
//               <strong>Price:</strong> ${selectedMedicine.price}
//             </p>
//             <p>
//               <strong>Description:</strong> {selectedMedicine.description}
//             </p>
//             <button className="btn btn-error mt-4" onClick={closeModal}>
//               Close
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default CategoryDetails;


import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Modal from '../../Shared/Modal';
import Swal from 'sweetalert2';
import UseAuth from '../../Hooks/useAuth/UseAuth';
import useCart from '../../Hooks/useCart/useCart';
import { HiEye, HiShoppingBag, HiShoppingCart } from 'react-icons/hi';

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
    return <p className="text-center text-blue-500">Loading medicines...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Failed to load medicines: {error.message}
      </p>
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
    <div className="container  py-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Medicines in Category: {categoryName}
      </h2>
      <div className="grid grid-cols-1 mx-auto justify-between w-fit md:grid-cols-3 lg:grid-cols-4 gap-4">
        {medicines.map((medicine, index) => (
          <div
            key={index}
            // className="h-[16em] w-[18em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
            className="h-[20em] w-[18em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#1e7685] to-[rgba(42,128,136,0.81)] text-white  p-2 flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
          >
            <img
              alt={medicine.name}
              src={medicine.image}
              className="w-full h-32 object-fill rounded-md "
            />
            <div className="flex justify-between">
              <div>
                <h3 className="text-sm font-medium">{medicine.name}</h3>
                <h3 className="text-sm font-medium">{medicine.genericName}</h3>
              </div>
              <h3 className="text-sm font-medium">Price: ${medicine.price}</h3>
            </div>
            <div className="space-x-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleViewDetails(medicine)}
              ><HiEye></HiEye>
                Eye
              </button>
              <button
                className="btn btn-sm bg-teal-500"
                onClick={() => handleSelectMedicine(medicine)}
              ><HiShoppingCart></HiShoppingCart>
                buy
              </button>
            </div>
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
            <button className="btn bg-teal-500 btn-error mt-4" onClick={closeModal}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CategoryDetails;

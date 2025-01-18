import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Modal from "../../Shared/Modal"; // Ensure this is at the top
import Swal from "sweetalert2";

const Shop = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  console.log(cart)
  const axiosSecure = useAxiosSecure();

  const { data: medicines = [], isLoading, error } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const response = await axiosSecure.get("/medicines");
      return response.data;
    },
  });
console.log(medicines[0].medicines[0].company)
  const handleSelectMedicine = (medicine) => {
    if (!cart.find((item) => item.id === medicine.id)) {
      setCart([...cart, medicine]);
      Swal.fire({
        title:  (`your ${medicine.name} add in the cart.`),
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: (`${medicine.name} is already in the cart.`),
        showConfirmButton: false,
        timer: 1500
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
            <th className="px-4 py-2">no</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Generic Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
  {(() => {
    let serial = 1; // Initialize the serial counter
    return medicines.map((category) =>
      category.medicines.map((medicine) => (
        <tr key={medicine.id} className="hover:bg-gray-100">
          <td className="border px-4 py-2">{serial++}</td> {/* Serial Number */}
          <td className="border px-4 py-2">
            <img src={medicine.image} alt={medicine.name} className="w-12 h-12 object-cover" />
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
      ))
    );
  })()}
</tbody>
      </table>

      {selectedMedicine && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{selectedMedicine.name}</h3>
            <img src={selectedMedicine.image} alt={selectedMedicine.name} className="mb-4" />
            <p><strong>Generic Name:</strong> {selectedMedicine.genericName}</p>
            <p><strong>Company:</strong> {selectedMedicine.company}</p>
            <p><strong>Price:</strong> ${selectedMedicine.price}</p>
            <p><strong>Description:</strong> {selectedMedicine.description}</p>
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

const MedicineModal = ({ medicine, onClose, onAdd }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2">{medicine.name}</h2>
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-48 object-cover rounded mb-3"
        />
        <p className="text-gray-700 mb-2">{medicine.description}</p>
        <p className="text-blue-600 font-bold">${medicine.price}</p>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineModal;

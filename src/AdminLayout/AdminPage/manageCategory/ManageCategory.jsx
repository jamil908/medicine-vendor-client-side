import { useState } from "react";
import Swal from "sweetalert2";
import useCategory from "../../../Hooks/useCategory/useCategory";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/axiosPublic/useAxiosPublic";
import { imageUpload } from "../../../Hooks/utilities/utils";

const ManageCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: categories = [], refetch } = useCategory();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // Handle form submission
  const handleCategorySubmit = async (data) => {
    // Check if the file field is provided and contains at least one file
    const image = data.file && data.file.length > 0 ? data.file[0] : null;
    // If no image is selected, show an error message
    if (!image) {
      Swal.fire({
        icon: "error",
        title: "No image selected.",
        text: "Please select an image to upload.",
      });
      return;
    }
    const { categoryName, quantity } = data;
    console.log(data)

    try {
      const categoryImage = await imageUpload(image); // Upload the image
      console.log("Uploaded image URL: ", categoryImage); // Log the image URL

      // Now make the API request to add the category
      const response = await axiosPublic.post("/categories", {
        categoryName,
        categoryImage,
        quantity,
      });
      console.log(response.data)
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Category added successfully!",
          text: "The category has been added successfully.",
        });
        refetch(); // Refresh categories list
        setShowModal(false); // Close the modal
        reset(); // Reset the form
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add category.",
          text: "There was an issue adding the category.",
        });
        
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add category.",
        text: "An error occurred while adding the category.",
      });
    }
  };

  // Delete Category with SweetAlert2
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await axiosPublic.delete(`/category/${id}`);
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Category deleted successfully!",
            text: "The category has been deleted.",
          });
          refetch(); // Refresh categories after deletion
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to delete category.",
            text: res.data.message,
          });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to delete category.",
          text: "An error occurred while deleting the category.",
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

      <button onClick={() => setShowModal(true)} className="btn btn-primary">
        Add Category
      </button>

      {/* Modal for adding a new category */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-semibold">Add New Category</h2>
            <form onSubmit={handleSubmit(handleCategorySubmit)}>
              {/* Category Name Field */}
              <input
                {...register("categoryName", {
                  required: "Category Name is required",
                })}
                type="text"
                placeholder="Category Name"
                className="input input-bordered w-full mb-4"
              />

              {/* Category Image URL Field */}
              <input
                {...register("file", { required: "Please select a file" })} // Register the file input field properly
                type="file"
                className="input input-bordered w-full mb-4"
              />

              {/* Quantity Field */}
              <input
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-full mb-4"
              />

              {/* Submit Button */}
              <button type="submit" className="btn btn-success">
                Add Category
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn btn-danger ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {loading && <p className="text-center text-blue-500">Processing...</p>}

      {/* Categories Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Category Name</th>
            <th className="border px-4 py-2">Total Medicines</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{category.categoryName}</td>
              <td className="border px-4 py-2">{category.numberOfMedicines}</td>
              <td className="border px-4 py-2">{category.quantity}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategory;

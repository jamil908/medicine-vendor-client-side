
// import { useState } from "react";
// import Swal from "sweetalert2";
// import useCategory from "../../../Hooks/useCategory/useCategory";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../../Hooks/axiosPublic/useAxiosPublic";
// import { imageUpload } from "../../../Hooks/utilities/utils";
// import { Plus, Package, Pill, Trash2, X, Upload, Image, Hash, ShoppingCart, Eye, Edit, BarChart3 } from "lucide-react";

// const ManageCategory = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { data: categories = [], refetch } = useCategory();
//   const axiosPublic = useAxiosPublic();
//   const [loading, setLoading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);

//   // Initialize react-hook-form
//   const { register, handleSubmit, reset, watch } = useForm();

//   // Watch file input for preview
//   const watchedFile = watch("file");

//   // Handle form submission
//   const handleCategorySubmit = async (data) => {
//     // Check if the file field is provided and contains at least one file
//     const image = data.file && data.file.length > 0 ? data.file[0] : null;
//     // If no image is selected, show an error message
//     if (!image) {
//       Swal.fire({
//         icon: "error",
//         title: "No image selected.",
//         text: "Please select an image to upload.",
//       });
//       return;
//     }
//     const { categoryName, quantity } = data;
//     console.log(data)

//     try {
//       const categoryImage = await imageUpload(image); // Upload the image
//       console.log("Uploaded image URL: ", categoryImage); // Log the image URL

//       // Now make the API request to add the category
//       const response = await axiosPublic.post("/categories", {
//         categoryName,
//         categoryImage,
//         quantity,
//       });
//       console.log(response.data)
//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Category added successfully!",
//           text: "The category has been added successfully.",
//         });
//         refetch(); // Refresh categories list
//         setShowModal(false); // Close the modal
//         reset(); // Reset the form
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed to add category.",
//           text: "There was an issue adding the category.",
//         });
        
//       }
//     } catch (error) {
//       console.error("Error adding category:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to add category.",
//         text: "An error occurred while adding the category.",
//       });
//     }
//   };

//   // Delete Category with SweetAlert2
//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete this category?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       setLoading(true);
//       try {
//         const res = await axiosPublic.delete(`/category/${id}`);
//         if (res.data.success) {
//           Swal.fire({
//             icon: "success",
//             title: "Category deleted successfully!",
//             text: "The category has been deleted.",
//           });
//           refetch(); // Refresh categories after deletion
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Failed to delete category.",
//             text: res.data.message,
//           });
//         }
//       } catch (error) {
//         console.error("Error deleting category:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Failed to delete category.",
//           text: "An error occurred while deleting the category.",
//         });
//       }
//       setLoading(false);
//     }
//   };

//   // Handle drag events for file upload
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section with Glassmorphism */}
//         <div className="bg-white/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
//                 <Package className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Category Management
//                 </h1>
//                 <p className="text-gray-600 text-lg mt-1">Organize your medicine categories with style</p>
//               </div>
//             </div>
            
//             {/* Add Category Button - Floating Style */}
//             <button 
//               onClick={() => setShowModal(true)} 
//               className="group bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
//             >
//               <div className="flex items-center space-x-3">
//                 <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
//                 <span>Add Category</span>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           {/* Total Categories Card */}
//           <div className="group bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 transition-all duration-300">
//             <div className="flex items-center justify-between text-white">
//               <div>
//                 <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Categories</p>
//                 <p className="text-4xl font-bold mt-2">{categories.length}</p>
//                 <p className="text-blue-100 text-sm mt-1">Active categories</p>
//               </div>
//               <div className="p-3 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
//                 <Package className="w-8 h-8" />
//               </div>
//             </div>
//           </div>

//           {/* Total Medicines Card */}
//           <div className="group bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-2 transition-all duration-300">
//             <div className="flex items-center justify-between text-white">
//               <div>
//                 <p className="text-emerald-100 text-sm font-medium uppercase tracking-wide">Total Medicines</p>
//                 <p className="text-4xl font-bold mt-2">
//                   {categories.reduce((sum, cat) => sum + (cat.numberOfMedicines || 0), 0)}
//                 </p>
//                 <p className="text-emerald-100 text-sm mt-1">In inventory</p>
//               </div>
//               <div className="p-3 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
//                 <Pill className="w-8 h-8" />
//               </div>
//             </div>
//           </div>

//           {/* Total Quantity Card */}
//           <div className="group bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 transition-all duration-300">
//             <div className="flex items-center justify-between text-white">
//               <div>
//                 <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">Total Stock</p>
//                 <p className="text-4xl font-bold mt-2">
//                   {categories.reduce((sum, cat) => sum + (cat.quantity || 0), 0)}
//                 </p>
//                 <p className="text-purple-100 text-sm mt-1">Units available</p>
//               </div>
//               <div className="p-3 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
//                 <ShoppingCart className="w-8 h-8" />
//               </div>
//             </div>
//           </div>

//           {/* Analytics Card */}
//           <div className="group bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-2 transition-all duration-300">
//             <div className="flex items-center justify-between text-white">
//               <div>
//                 <p className="text-orange-100 text-sm font-medium uppercase tracking-wide">Avg per Category</p>
//                 <p className="text-4xl font-bold mt-2">
//                   {categories.length > 0 ? Math.round(categories.reduce((sum, cat) => sum + (cat.numberOfMedicines || 0), 0) / categories.length) : 0}
//                 </p>
//                 <p className="text-orange-100 text-sm mt-1">Medicines each</p>
//               </div>
//               <div className="p-3 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
//                 <BarChart3 className="w-8 h-8" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Categories Grid */}
//         <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
//           <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-6">
//             <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
//               <Package className="w-6 h-6" />
//               <span>All Categories</span>
//             </h2>
//           </div>

//           {categories.length === 0 ? (
//             /* Empty State */
//             <div className="text-center py-20">
//               <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
//                 <Package className="w-12 h-12 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">No Categories Yet</h3>
//               <p className="text-gray-600 mb-8">Get started by adding your first medicine category</p>
//               <button 
//                 onClick={() => setShowModal(true)}
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
//               >
//                 Create First Category
//               </button>
//             </div>
//           ) : (
//             /* Categories Grid */
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
//               {categories.map((category, index) => (
//                 <div key={category._id} className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
//                   {/* Category Header */}
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
//                           {category.categoryName}
//                         </h3>
//                         <p className="text-gray-500 text-sm">ID: {category._id.slice(-8)}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Category Stats */}
//                   <div className="space-y-3 mb-6">
//                     <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
//                       <div className="flex items-center space-x-2">
//                         <Pill className="w-5 h-5 text-blue-500" />
//                         <span className="text-gray-700 font-medium">Medicines</span>
//                       </div>
//                       <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-bold">
//                         {category.numberOfMedicines || 0}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
//                       <div className="flex items-center space-x-2">
//                         <ShoppingCart className="w-5 h-5 text-emerald-500" />
//                         <span className="text-gray-700 font-medium">Stock</span>
//                       </div>
//                       <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg font-bold">
//                         {category.quantity}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex space-x-2">
//                     <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
//                       <Eye className="w-4 h-4" />
//                       <span>View</span>
//                     </button>
//                     <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
//                       <Edit className="w-4 h-4" />
//                       <span>Edit</span>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(category._id)}
//                       disabled={loading}
//                       className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Modal for adding a new category */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform scale-100 animate-pulse">
//               {/* Modal Header */}
//               <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-3xl">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 bg-white/20 rounded-xl">
//                       <Plus className="w-6 h-6 text-white" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-white">Add New Category</h2>
//                   </div>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="p-2 hover:bg-white/20 rounded-xl transition-colors"
//                   >
//                     <X className="w-6 h-6 text-white" />
//                   </button>
//                 </div>
//               </div>

//               {/* Modal Body */}
//               <div className="p-6 space-y-6">
//                 {/* Category Name Field */}
//                 <div>
//                   <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-3">
//                     <Package className="w-5 h-5 text-purple-500" />
//                     <span>Category Name</span>
//                   </label>
//                   <input
//                     {...register("categoryName", {
//                       required: "Category Name is required",
//                     })}
//                     type="text"
//                     placeholder="Enter category name"
//                     className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-lg"
//                   />
//                 </div>

//                 {/* File Upload Field */}
//                 <div>
//                   <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-3">
//                     <Image className="w-5 h-5 text-purple-500" />
//                     <span>Category Image</span>
//                   </label>
//                   <div 
//                     className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
//                       dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
//                     }`}
//                     onDragEnter={handleDrag}
//                     onDragLeave={handleDrag}
//                     onDragOver={handleDrag}
//                   >
//                     <input
//                       {...register("file", { required: "Please select a file" })}
//                       type="file"
//                       accept="image/*"
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     />
//                     <div className="text-center">
//                       <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                       <p className="text-lg text-gray-600 font-medium">
//                         Drop your image here, or <span className="text-purple-500 font-bold">browse</span>
//                       </p>
//                       <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
//                     </div>
//                     {watchedFile && watchedFile[0] && (
//                       <div className="mt-4 p-3 bg-purple-50 rounded-xl border border-purple-200">
//                         <p className="text-sm text-purple-700 font-medium truncate">
//                           📁 {watchedFile[0].name}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Quantity Field */}
//                 <div>
//                   <label className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-3">
//                     <Hash className="w-5 h-5 text-purple-500" />
//                     <span>Initial Quantity</span>
//                   </label>
//                   <input
//                     {...register("quantity", {
//                       required: "Quantity is required",
//                       valueAsNumber: true,
//                     })}
//                     type="number"
//                     placeholder="Enter quantity"
//                     min="0"
//                     className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-lg"
//                   />
//                 </div>

//                 {/* Modal Footer */}
//                 <div className="flex space-x-3 pt-6">
//                   <button
//                     onClick={handleSubmit(handleCategorySubmit)}
//                     className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
//                   >
//                     Create Category
//                   </button>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {loading && (
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//             <div className="bg-white rounded-3xl p-8 shadow-2xl">
//               <div className="flex items-center space-x-4">
//                 <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
//                 <p className="text-xl font-bold text-gray-700">Processing...</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageCategory;


import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useCategory from "../../../Hooks/useCategory/useCategory";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/axiosPublic/useAxiosPublic";
import { imageUpload } from "../../../Hooks/utilities/utils";
import { Plus, Package, Pill, Trash2, X, Upload, Image, Hash, ShoppingCart, Eye, Edit, BarChart3, ChevronLeft } from "lucide-react";

// Placeholder for the single category view component
const ViewCategoryPage = ({ category, onBack }) => {
  if (!category) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full transform scale-100 transition-all duration-300 animate-fadeIn">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-8 rounded-t-3xl text-white flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Package className="w-8 h-8" />
            <h2 className="text-3xl font-extrabold">{category.categoryName}</h2>
          </div>
          <button onClick={onBack} className="p-2 rounded-full hover:bg-white/20 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="relative overflow-hidden rounded-2xl w-full h-64">
            <img src={category.categoryImage} alt={category.categoryName} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white text-lg font-bold">Category Image</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-sm flex items-center space-x-4 text-white">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Medicines</p>
                <p className="text-2xl font-bold">{category.numberOfMedicines || 0}</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 shadow-sm flex items-center space-x-4 text-white">
              <div className="p-3 bg-emerald-600 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Stock Quantity</p>
                <p className="text-2xl font-bold">{category.quantity}</p>
              </div>
            </div>
          </div>
          <div className="pt-4 text-gray-400">
            <h3 className="text-xl font-bold mb-2 text-white">Details</h3>
            <p><strong>Category ID:</strong> {category._id}</p>
            <p><strong>Created At:</strong> {new Date(category.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showViewPage, setShowViewPage] = useState(false);

  const { data: categories = [], refetch } = useCategory();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const watchedFile = watch("file");
  const watchedCategoryName = watch("categoryName");
  const watchedQuantity = watch("quantity");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleCategorySubmit = async (data) => {
    setLoading(true);
    const image = data.file && data.file.length > 0 ? data.file[0] : null;

    if (!image) {
      Swal.fire({
        icon: "error",
        title: "No image selected.",
        text: "Please select an image to upload.",
      });
      setLoading(false);
      return;
    }

    const { categoryName, quantity } = data;

    try {
      const categoryImage = await imageUpload(image);
      const response = await axiosPublic.post("/categories", {
        categoryName,
        categoryImage,
        quantity,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Category added successfully!",
        });
        refetch();
        setShowModal(false);
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add category.",
          text: response.data.message || "There was an issue adding the category.",
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add category.",
        text: "An error occurred while adding the category.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setValue("categoryName", category.categoryName);
    setValue("quantity", category.quantity);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (data) => {
    setLoading(true);
    let categoryImage = selectedCategory.categoryImage;

    if (data.file && data.file.length > 0) {
      try {
        categoryImage = await imageUpload(data.file[0]);
      } catch (error) {
        console.error("Error uploading new image:", error);
        Swal.fire({
          icon: "error",
          title: "Image upload failed.",
          text: "An error occurred while uploading the new image.",
        });
        setLoading(false);
        return;
      }
    }

    const { categoryName, quantity } = data;
    const updateData = { categoryName, quantity, categoryImage };

    try {
      const res = await axiosPublic.put(`/category/${selectedCategory._id}`, updateData);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Category updated successfully!",
        });
        refetch();
        setShowEditModal(false);
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update category.",
          text: res.data.message,
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update category.",
        text: "An error occurred while updating the category.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
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
          refetch();
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
      } finally {
        setLoading(false);
      }
    }
  };

  if (showViewPage && selectedCategory) {
    return <ViewCategoryPage category={selectedCategory} onBack={() => {
      setShowViewPage(false);
      setSelectedCategory(null);
    }} />;
  }

  const totalMedicines = categories.reduce((sum, cat) => sum + (cat.numberOfMedicines || 0), 0);
  const totalStock = categories.reduce((sum, cat) => sum + (cat.quantity || 0), 0);
  const avgMedicines = categories.length > 0 ? Math.round(totalMedicines / categories.length) : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="bg-gray-800/80 backdrop-blur-3xl rounded-[3rem] border border-gray-700/80 shadow-3xl p-8 lg:p-12 transform hover:scale-[1.01] transition-transform duration-500 will-change-transform">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="p-5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full shadow-2xl">
                <Package className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                  Category Dashboard
                </h1>
                <p className="text-gray-400 text-lg mt-2 font-medium">Manage and organize all your medicine categories efficiently.</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="group relative w-full lg:w-auto px-10 py-5 overflow-hidden font-bold text-gray-900 transition-all duration-300 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 rounded-full shadow-2xl hover:shadow-cyan-400/50"
            >
              <div className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                <span>Add New Category</span>
              </div>
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Categories Card */}
          <div className="relative group bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-700/80">
            <div className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex items-center justify-between text-gray-50">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Categories</p>
                <p className="text-5xl font-extrabold mt-2 text-teal-400">{categories.length}</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-full group-hover:rotate-12 transition-transform duration-500">
                <Package className="w-10 h-10 text-teal-400" />
              </div>
            </div>
          </div>

          {/* Total Medicines Card */}
          <div className="relative group bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-700/80">
            <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex items-center justify-between text-gray-50">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Medicines</p>
                <p className="text-5xl font-extrabold mt-2 text-cyan-400">{totalMedicines}</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-full group-hover:rotate-12 transition-transform duration-500">
                <Pill className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Total Quantity Card */}
          <div className="relative group bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-700/80">
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex items-center justify-between text-gray-50">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Stock</p>
                <p className="text-5xl font-extrabold mt-2 text-blue-400">{totalStock}</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-full group-hover:rotate-12 transition-transform duration-500">
                <ShoppingCart className="w-10 h-10 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="relative group bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-700/80">
            <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex items-center justify-between text-gray-50">
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Avg per Category</p>
                <p className="text-5xl font-extrabold mt-2 text-indigo-400">{avgMedicines}</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-full group-hover:rotate-12 transition-transform duration-500">
                <BarChart3 className="w-10 h-10 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-gray-800/80 backdrop-blur-3xl rounded-[3rem] border border-gray-700/80 shadow-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-6 rounded-t-[3rem]">
            <h2 className="text-3xl font-bold text-white flex items-center space-x-4">
              <Pill className="w-8 h-8" />
              <span>All Categories</span>
            </h2>
          </div>

          {categories.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="mx-auto w-28 h-28 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-xl">
                <Package className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-200 mb-2">No Categories Yet</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">Get started by adding your first medicine category to organize your inventory.</p>
              <button
                onClick={() => setShowModal(true)}
                className="group relative px-8 py-4 overflow-hidden font-bold text-gray-900 transition-all duration-300 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full shadow-2xl hover:shadow-cyan-400/50"
              >
                <div className="absolute inset-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                  <span>Create First Category</span>
                </div>
              </button>
            </div>
          ) : (
            /* Categories Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {categories.map((category) => (
                <div key={category._id} className="relative group bg-gray-800 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transform hover:scale-[1.03] transition-all duration-500 border border-gray-700 will-change-transform overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl z-0"></div>

                  {/* Category Image */}
                  <div className="relative w-full h-40 rounded-2xl mb-4 overflow-hidden shadow-md border-2 border-gray-700">
                    <img src={category.categoryImage} alt={category.categoryName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-white text-center p-4">
                      <div className="space-y-2">
                        <p className="text-2xl font-bold drop-shadow-md">{category.categoryName}</p>
                        <p className="text-sm text-gray-300">Click for details</p>
                      </div>
                    </div>
                  </div>

                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-200 group-hover:text-cyan-400 transition-colors duration-300">
                      {category.categoryName}
                    </h3>
                    <div className="p-2 rounded-full bg-gray-700 group-hover:bg-cyan-900 transition-colors">
                      <Package className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </div>

                  {/* Category Stats */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-400 font-medium">
                        <Pill className="w-5 h-5 text-blue-500" />
                        <span>Medicines</span>
                      </div>
                      <span className="text-lg font-bold text-gray-200">{category.numberOfMedicines || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-400 font-medium">
                        <ShoppingCart className="w-5 h-5 text-emerald-500" />
                        <span>Total Stock</span>
                      </div>
                      <span className="text-lg font-bold text-gray-200">{category.quantity}</span>
                    </div>
                    {/* Stock Progress Bar */}
                    <div className="bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, (category.quantity / totalStock) * 100)}%` }}
                        ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowViewPage(true);
                      }}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleEditClick(category)}
                      className="flex-1 bg-blue-700 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit className="w-5 h-5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for adding a new category */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modalFadeIn">
            <div className="bg-gray-800/80 backdrop-blur-3xl rounded-3xl shadow-3xl max-w-md w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300 animate-slideUp">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Add New Category</h2>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit(handleCategorySubmit)} className="p-6 space-y-6">
                {/* Category Name Field */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                    <Package className="w-5 h-5 text-teal-500" />
                    <span>Category Name</span>
                  </label>
                  <input
                    {...register("categoryName", { required: "Category Name is required" })}
                    type="text"
                    placeholder="Enter category name"
                    className="w-full px-4 py-4 border-2 border-gray-700 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-lg bg-gray-900 text-gray-200"
                  />
                </div>

                {/* File Upload Field */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                    <Image className="w-5 h-5 text-teal-500" />
                    <span>Category Image</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                      dragActive ? 'border-teal-500 bg-gray-700' : 'border-gray-700 bg-gray-800'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                  >
                    <input
                      {...register("file", { required: "Please select a file" })}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-lg text-gray-400 font-medium">
                        Drop your image here, or <span className="text-teal-400 font-bold">browse</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                    </div>
                    {watchedFile && watchedFile[0] && (
                      <div className="mt-4 p-3 bg-gray-700 rounded-xl border border-gray-600">
                        <p className="text-sm text-gray-300 font-medium truncate">
                          📁 {watchedFile[0].name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Field */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                    <Hash className="w-5 h-5 text-teal-500" />
                    <span>Initial Quantity</span>
                  </label>
                  <input
                    {...register("quantity", {
                      required: "Quantity is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Enter quantity"
                    min="0"
                    className="w-full px-4 py-4 border-2 border-gray-700 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-lg bg-gray-900 text-gray-200"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex space-x-3 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-900 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  >
                    Create Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-4 border-2 border-gray-700 text-gray-300 rounded-2xl font-bold hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for editing a category */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modalFadeIn">
            <div className="bg-gray-800/80 backdrop-blur-3xl rounded-3xl shadow-3xl max-w-md w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300 animate-slideUp">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Edit className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Edit Category</h2>
                  </div>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit(handleEditSubmit)} className="p-6 space-y-6">
                {/* Category Name Field */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                    <Package className="w-5 h-5 text-blue-500" />
                    <span>Category Name</span>
                  </label>
                  <input
                    {...register("categoryName", { required: "Category Name is required" })}
                    type="text"
                    defaultValue={selectedCategory?.categoryName}
                    placeholder="Enter category name"
                    className="w-full px-4 py-4 border-2 border-gray-700 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg bg-gray-900 text-gray-200"
                  />
                </div>

                {/* File Upload Field */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                    <Image className="w-5 h-5 text-blue-500" />
                    <span>Category Image</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                      dragActive ? 'border-blue-500 bg-gray-700' : 'border-gray-700 bg-gray-800'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                  >
                    <input
                      {...register("file")}
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-lg text-gray-400 font-medium">
                        Drop a new image here, or <span className="text-blue-400 font-bold">browse</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                    </div>
                    {(watchedFile && watchedFile[0]) || selectedCategory?.categoryImage ? (
                      <div className="mt-4 p-3 bg-gray-700 rounded-xl border border-gray-600">
                        <p className="text-sm text-gray-300 font-medium truncate">
                          📁 {watchedFile && watchedFile[0] ? watchedFile[0].name : "Current Image"}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Quantity Field */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-gray-300 mb-3">
                    <Hash className="w-5 h-5 text-blue-500" />
                    <span>Total Stock</span>
                  </label>
                  <input
                    {...register("quantity", {
                      required: "Quantity is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    defaultValue={selectedCategory?.quantity}
                    placeholder="Enter quantity"
                    min="0"
                    className="w-full px-4 py-4 border-2 border-gray-700 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg bg-gray-900 text-gray-200"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex space-x-3 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-900 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-4 border-2 border-gray-700 text-gray-300 rounded-2xl font-bold hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-gray-800/80 rounded-3xl p-8 shadow-2xl animate-pulse transform scale-105">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
                <p className="text-xl font-bold text-gray-300">Processing...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCategory;
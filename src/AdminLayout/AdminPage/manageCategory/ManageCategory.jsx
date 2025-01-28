import { useState } from "react";
import { toast } from "react-toastify";
import useCategory from "../../../Hooks/useCategory/useCategory";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageCategory = () => {
    const { data: categories = [], refetch } = useCategory()
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    // Delete Category
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        setLoading(true);
        try {
            const res = await axiosSecure.delete(`/category/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Category deleted successfully!");
                refetch();
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category!");
        }
        setLoading(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>
            {loading && <p className="text-center text-blue-500">Processing...</p>}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Category Name</th>
                        <th className="border px-4 py-2">Total Medicines</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category._id} className="text-center">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{category.categoryName}</td>
                            <td className="border px-4 py-2">{category.numberOfMedicines}</td>
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

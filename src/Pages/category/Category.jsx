import React from 'react';
import useCategory from '../../Hooks/useCategory/useCategory';
import { Link } from 'react-router-dom';

const Category = () => {
    const { data: categories = [], isLoading, error } = useCategory();

    if (isLoading) return <p className="text-center text-blue-500">Loading categories...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load categories: {error.message}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">Medicine Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link to={`/category/${category.categoryName}`}>
                    <div
                        key={category._id}
                        className="p-4 border rounded-lg shadow hover:shadow-lg transition duration-200 bg-white"
                    >
                        <img
                            src={category.categoryImage}
                            alt={category.categoryName}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">{category.categoryName}</h3>
                        <p className="text-gray-600 mt-2">Number of Medicines: {category.numberOfMedicines}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;


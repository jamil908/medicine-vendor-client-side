import React from 'react';
import useCategory from '../../Hooks/useCategory/useCategory';
import { Link } from 'react-router-dom';

const Category = () => {
  const { data: categories = [], isLoading, error } = useCategory();

  if (isLoading) return <span className="loading justify-center flex mx-auto items-center loading-bars text-cyan-500 loading-lg"></span>;
  if (error) return <p className="text-center text-red-500">Failed to load categories: {error.message}</p>;

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-3xl font-bold text-center mb-8">Medicine Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link to={`/category/${category.categoryName}`} key={category._id}>
            <div 
              className="h-[20rem] w-full max-w-xs border-2 border-[rgba(75,30,133,0.5)] bg-gradient-to-br from-[#1e7685] to-[rgba(42,128,136,0.81)] rounded-2xl bg-transparent border-e-slate-800 text-white font-nunito p-4 flex flex-col justify-between items-center backdrop-blur-lg overflow-hidden shadow-lg"
            >
              <img
                src={category.categoryImage}
                alt={category.categoryName}
                className="w-full h-48 object-cover rounded-xl"
              />
              <h3 className="text-lg font-semibold text-gray-100 text-center mt-4">{category.categoryName}</h3>
              <p className="text-gray-100 text-sm text-center">Number of Medicines: {category.numberOfMedicines || 0}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

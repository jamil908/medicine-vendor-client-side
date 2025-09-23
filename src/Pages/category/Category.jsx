import React from 'react';
import useCategory from '../../Hooks/useCategory/useCategory';
import { Link } from 'react-router-dom';
import { Pill, ArrowRight, Package } from 'lucide-react';

const Category = () => {
  const { data: categories = [], isLoading, error } = useCategory();
// const isLoading = false;
//   let error = null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
          <Pill className="absolute inset-0 m-auto w-6 h-6 text-emerald-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-700 font-semibold">Failed to load categories</p>
          <p className="text-red-600 text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Pill className="w-4 h-4" />
            Trusted Healthcare
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent mb-4">
            Medicine Categories
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Browse our comprehensive collection of medicines and healthcare products, 
            carefully organized for your convenience
          </p>
        </div>

        {/* Categories Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
  {categories.map((category, index) => (
    <Link to={`/category/${category.categoryName}`} key={category._id}>
      <div
        className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        style={{
          animationDelay: `${index * 100}ms`,
          animation: "fadeInUp 0.6s ease-out forwards",
        }}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
    
          <img
            src={category.categoryImage} alt={category.categoryName} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-slate-700 shadow-lg">
            {category.numberOfMedicines || 0} items
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
            {category.categoryName}
          </h3>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            Explore our selection of quality{" "}
            {category.categoryName.toLowerCase()} products
          </p>

          {/* Action Button */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">
              {category.numberOfMedicines || 0} medicines available
            </span>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all duration-300">
              <span className="text-sm">Shop Now</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  ))}
</div>

        {/* Bottom CTA */}
        <div className="text-center mt-5">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-800">Need help finding something?</p>
                <p className="text-sm text-slate-600">Our pharmacy experts are here to assist you</p>
              </div>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Category;

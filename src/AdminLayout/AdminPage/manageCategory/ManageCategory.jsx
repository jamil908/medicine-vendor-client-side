
import React, { useState } from 'react';
import { 
  Plus, 
  Package, 
  Pill, 
  Trash2, 
  X, 
  Upload, 
  Image as ImageIcon, 
  Hash, 
  ShoppingCart, 
  Eye, 
  Edit, 
  BarChart3,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  TrendingUp,
  Users,
  AlertCircle
} from 'lucide-react';

const ViewCategoryPage = ({ category, onBack }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 rounded-t-3xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{category.categoryName}</h2>
                <p className="text-blue-100 mt-1">Category Details & Statistics</p>
              </div>
            </div>
            <button 
              onClick={onBack} 
              className="p-3 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Category Image */}
          <div className="relative">
            <img 
              src={category.categoryImage} 
              alt={category.categoryName} 
              className="w-full h-64 object-cover rounded-2xl border border-slate-200 shadow-lg"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="font-medium text-slate-800">Category Image</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Total Medicines</p>
                  <p className="text-3xl font-bold text-blue-800">{category.numberOfMedicines || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600 uppercase tracking-wide">Stock Quantity</p>
                  <p className="text-3xl font-bold text-green-800">{category.quantity}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600 uppercase tracking-wide">Category ID</p>
                  <p className="text-sm font-mono text-purple-800 mt-1">{category._id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Category Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">Created Date:</span>
                <span className="text-slate-600">{new Date(category.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">Last Updated:</span>
                <span className="text-slate-600">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">Status:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
              </div>
            </div>
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
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock data - replace with your actual hooks
  const categories = [
    {
      _id: '1',
      categoryName: 'Pain Relief',
      categoryImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      quantity: 150,
      numberOfMedicines: 12,
      createdAt: new Date()
    },
    {
      _id: '2',
      categoryName: 'Antibiotics',
      categoryImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      quantity: 89,
      numberOfMedicines: 8,
      createdAt: new Date()
    },
    {
      _id: '3',
      categoryName: 'Vitamins & Supplements',
      categoryImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop',
      quantity: 234,
      numberOfMedicines: 25,
      createdAt: new Date()
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setShowModal(false);
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      console.log('Delete category:', id);
    }
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalMedicines = categories.reduce((sum, cat) => sum + (cat.numberOfMedicines || 0), 0);
  const totalStock = categories.reduce((sum, cat) => sum + (cat.quantity || 0), 0);
  const avgMedicines = categories.length > 0 ? Math.round(totalMedicines / categories.length) : 0;

  if (showViewPage && selectedCategory) {
    return <ViewCategoryPage category={selectedCategory} onBack={() => {
      setShowViewPage(false);
      setSelectedCategory(null);
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 lg:p-10 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-100/50 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Medicine Categories
                </h1>
                <p className="text-slate-600 text-lg mt-2">Organize and manage your medicine inventory</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Users className="w-4 h-4" />
                    <span>{categories.length} Categories</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Category</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Categories */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Categories</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{categories.length}</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Active
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Medicines */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Medicines</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{totalMedicines}</p>
                <p className="text-sm text-blue-600 mt-1">In inventory</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300">
                <Pill className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Stock */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Stock</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{totalStock}</p>
                <p className="text-sm text-purple-600 mt-1">Units available</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Average per Category */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Avg per Category</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{avgMedicines}</p>
                <p className="text-sm text-orange-600 mt-1">Medicines each</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors duration-300">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200 flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              <div className="flex border border-slate-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">All Categories</h2>
                  <p className="text-slate-600">Manage your medicine categories</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Live data</span>
              </div>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No Categories Found</h3>
              <p className="text-slate-500 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first medicine category'}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Add First Category
              </button>
            </div>
          ) : (
            /* Categories Grid/List */
            <div className={`p-8 ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {filteredCategories.map((category) => (
                <div key={category._id} className={`group bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                  viewMode === 'list' ? 'flex items-center space-x-6 p-6' : 'p-6'
                }`}>
                  {/* Category Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-20 h-20 rounded-xl flex-shrink-0' : 'w-full h-48 rounded-xl mb-4'
                  }`}>
                    <img 
                      src={category.categoryImage} 
                      alt={category.categoryName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="flex-1">
                    {/* Category Header */}
                    <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : 'mb-4'}`}>
                      <div>
                        <h3 className={`font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 ${
                          viewMode === 'list' ? 'text-lg' : 'text-xl'
                        }`}>
                          {category.categoryName}
                        </h3>
                        <p className="text-slate-500 text-sm">ID: {category._id.slice(-8)}</p>
                      </div>
                    </div>

                    {/* Category Stats */}
                    <div className={`${
                      viewMode === 'list' 
                        ? 'flex items-center space-x-6 my-4' 
                        : 'space-y-3 mb-6'
                    }`}>
                      <div className={`flex items-center ${
                        viewMode === 'list' ? 'space-x-2' : 'justify-between p-3 bg-blue-50 rounded-xl'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <Pill className="w-4 h-4 text-blue-500" />
                          <span className="text-slate-700 font-medium text-sm">
                            {viewMode === 'list' ? `${category.numberOfMedicines || 0} medicines` : 'Medicines'}
                          </span>
                        </div>
                        {viewMode === 'grid' && (
                          <span className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                            {category.numberOfMedicines || 0}
                          </span>
                        )}
                      </div>

                      <div className={`flex items-center ${
                        viewMode === 'list' ? 'space-x-2' : 'justify-between p-3 bg-green-50 rounded-xl'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <ShoppingCart className="w-4 h-4 text-green-500" />
                          <span className="text-slate-700 font-medium text-sm">
                            {viewMode === 'list' ? `${category.quantity} stock` : 'Stock'}
                          </span>
                        </div>
                        {viewMode === 'grid' && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                            {category.quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex ${
                      viewMode === 'list' ? 'space-x-2' : 'space-x-2'
                    }`}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowViewPage(true);
                        }}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleEditClick(category)}
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Category Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 rounded-t-3xl">
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
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Category Name */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-slate-700 mb-3">
                    <Package className="w-5 h-5 text-blue-500" />
                    <span>Category Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-slate-700 mb-3">
                    <ImageIcon className="w-5 h-5 text-blue-500" />
                    <span>Category Image</span>
                  </label>
                  <div 
                    className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <div className="text-center">
                      <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 font-medium">
                        Drop image here or <span className="text-blue-500 font-bold">browse</span>
                      </p>
                      <p className="text-sm text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-slate-700 mb-3">
                    <Hash className="w-5 h-5 text-blue-500" />
                    <span>Initial Stock</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg"
                  >
                    Create Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {showEditModal && selectedCategory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-3xl">
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
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Category Name */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-slate-700 mb-3">
                    <Package className="w-5 h-5 text-purple-500" />
                    <span>Category Name</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCategory.categoryName}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-slate-700 mb-3">
                    <ImageIcon className="w-5 h-5 text-purple-500" />
                    <span>Category Image</span>
                  </label>
                  <div 
                    className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                      dragActive ? 'border-purple-500 bg-purple-50' : 'border-slate-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                      <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 font-medium">
                        Drop new image or <span className="text-purple-500 font-bold">browse</span>
                      </p>
                      <p className="text-sm text-slate-400 mt-1">Leave empty to keep current image</p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-bold text-slate-700 mb-3">
                    <Hash className="w-5 h-5 text-purple-500" />
                    <span>Stock Quantity</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedCategory.quantity}
                    min="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors duration-200"
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-xl font-bold text-slate-700">Processing...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCategory;
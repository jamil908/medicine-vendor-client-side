import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Upload, 
  RotateCcw, 
  AlertCircle,
  Star,
  ShoppingCart,
  ChevronDown,
  Pill,
  Heart,
  Zap,
  Clock
} from 'lucide-react';
import UseAuth from '../../Hooks/useAuth/UseAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart/useCart';
import useAxiosPublic from '../../Hooks/axiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const HomepageSearchSection = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useCart();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [cart, setCart] = useState([]);
  const axiosPublic = useAxiosPublic();

  // Fetch medicines data
  const { data: medicines = [], isLoading, error } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const response = await axiosPublic.get("/medicines");
      return response.data;
    },
  });

  const handleSelectMedicine = (product) => {
    if (user && user.email) {
      if (!cart.find((item) => item.id === product.id)) {
        const updatedCart = [...cart, product];
        setCart(updatedCart);

        const cartItem = {
          ...product,
          userEmail: user.email,
          quantity: 1,
        };

        // Ensure `_id` is removed before sending to the server
        delete cartItem._id;

        axiosPublic
          .post('/carts', cartItem)
          .then((response) => {
            if (response.data.insertedId) {
              Swal.fire({
                title: `Your ${product.name} has been added to the cart.`,
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
          title: `${product.name} is already in the cart.`,
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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const quickAccessItems = [
    {
      icon: Upload,
      title: "Upload Prescription",
      description: "Get medicines prescribed by your doctor",
      bgColor: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      icon: RotateCcw,
      title: "Reorder",
      description: "Quickly reorder your regular medicines",
      bgColor: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
      icon: AlertCircle,
      title: "Emergency Medicines",
      description: "Urgent delivery for critical medications",
      bgColor: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      brand: "Square Pharmaceuticals",
      price: 45,
      originalPrice: 55,
      discount: 18,
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
      badge: "Popular",
      inStock: true
    },
    {
      id: 2,
      name: "Vitamin D3 Tablets",
      brand: "Beximco Pharmaceuticals",
      price: 120,
      originalPrice: 150,
      discount: 20,
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      badge: "Bestseller",
      inStock: true
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      brand: "Incepta Pharmaceuticals",
      price: 85,
      originalPrice: 100,
      discount: 15,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop",
      badge: "Doctor Recommended",
      inStock: true
    },
    {
      id: 4,
      name: "Calcium + Magnesium",
      brand: "Drug International",
      price: 95,
      originalPrice: 110,
      discount: 14,
      rating: 4.5,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=300&fit=crop",
      badge: "New Arrival",
      inStock: false
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'otc', label: 'Over-the-Counter' },
    { value: 'supplements', label: 'Supplements' },
    { value: 'brand', label: 'Brand Medicines' },
    { value: 'generic', label: 'Generic Medicines' }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Advanced Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
            Find Your Medicines
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Main Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by medicine name, brand, or condition..."
                className="w-full px-6 py-4 pl-14 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full lg:w-64 px-6 py-4 bg-slate-100 border border-slate-300 rounded-xl hover:bg-slate-200 transition-colors duration-200 text-slate-700"
              >
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>{filterOptions.find(f => f.value === selectedFilter)?.label}</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-10">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedFilter(option.value);
                        setShowFilters(false);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-semibold shadow-md flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Quick Access Pills */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
            Quick Actions
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {quickAccessItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  className={`group relative bg-gradient-to-r ${item.bgColor} ${item.hoverColor} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">Featured Products</h3>
              <p className="text-slate-600">Popular medicines with special discounts</p>
            </div>
            <button className="px-6 py-2 text-blue-600 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium">
              View All
            </button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      product.badge === 'Popular' ? 'bg-blue-500 text-white' :
                      product.badge === 'Bestseller' ? 'bg-green-500 text-white' :
                      product.badge === 'Doctor Recommended' ? 'bg-purple-500 text-white' :
                      'bg-orange-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                  {/* Discount */}
                  {product.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h4 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h4>
                  <p className="text-sm text-slate-500 mb-3">{product.brand}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-slate-700 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({product.reviews} reviews)</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600">৳{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-slate-500 line-through">৳{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    disabled={!product.inStock}
                    onClick={() => handleSelectMedicine(product)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      product.inStock 
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 shadow-md hover:shadow-lg' 
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Quick Features */}
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <h4 className="text-xl font-bold text-slate-800 mb-4 text-center">Why Choose MediBazer?</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">Authentic Medicines</div>
                <div className="text-sm text-slate-600">100% genuine products</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-green-50 transition-colors duration-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">Licensed Pharmacy</div>
                <div className="text-sm text-slate-600">Certified professionals</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-purple-50 transition-colors duration-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">Fast Delivery</div>
                <div className="text-sm text-slate-600">Same day delivery</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-orange-50 transition-colors duration-200">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-800">24/7 Support</div>
                <div className="text-sm text-slate-600">Always here to help</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageSearchSection;
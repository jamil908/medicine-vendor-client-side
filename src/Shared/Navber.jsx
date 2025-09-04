import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useCart from "../Hooks/useCart/useCart";
import useAdmin from "../Hooks/isAdmin/useAdmin";
import useSeller from "../Hooks/isSeller/useSeller";
import "./Navber.css";
import {
  ShoppingCart,
  User,
  Search,
  Phone,
  MapPin,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navber = () => {
  // Use your actual context and hooks
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("User logged out successfully."))
      .catch((error) => console.error("Error during logout:", error));
  };

  // const NavLink = ({ to, children, className, onClick }) => (
  //   <a href={to} className={className} onClick={onClick}>
  //     {children}
  //   </a>
  // );

  // const Link = ({ to, children, className }) => (
  //   <a href={to} className={className}>
  //     {children}
  //   </a>
  // );

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Emergency: +880-1XXX-XXXXXX</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Free Delivery in Chattogram</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Licensed Pharmacy</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  MediBazer
                </span>
                <div className="text-xs text-slate-500">Trusted Pharmacy</div>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search medicines, brands, conditions..."
                  className="w-full px-4 py-2 pl-10 pr-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
           
              <NavLink
                to="/"
                className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                Shop
              </NavLink>
              <NavLink
                to="/prescriptions"
                className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                Prescriptions
              </NavLink>
              <NavLink
                to="/health-info"
                className="font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                Health Info
              </NavLink>
            </div>

            {/* Cart & User Section */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <NavLink
                to="/cart"
                className="relative flex p-2 text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                Cart
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {cart.length}
                  </span>
                )}
              </NavLink>

              {/* User Profile & Auth */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full border-2 border-blue-200"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <span className="hidden md:block text-slate-700 font-medium">
                      {user.displayName || "User"}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-4 border-b border-slate-100">
                      <div className="font-semibold text-slate-800">
                        {user.displayName || "Anonymous User"}
                      </div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        Order History
                      </Link>
                      <Link
                        to="/prescriptions"
                        className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        My Prescriptions
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border-t border-slate-100"
                        >
                          Admin Dashboard
                        </Link>
                      )}

                      {isSeller && (
                        <Link
                          to="/seller"
                          className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border-t border-slate-100"
                        >
                          Seller Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 p-2">
                      <button
                        onClick={handleLogOut}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-medium shadow-md"
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-slate-700 p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden px-4 py-3 border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
              <div className="px-4 py-2 space-y-1">
                <NavLink
                  to="/"
                  className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Shop
                </NavLink>
                <NavLink
                  to="/prescriptions"
                  className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Prescriptions
                </NavLink>
                <NavLink
                  to="/health-info"
                  className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Health Info
                </NavLink>
                <NavLink
                  to="/cart"
                  className="block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span>Cart</span>
                    {cart.length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </NavLink>

                {/* Mobile User Section */}
                {user ? (
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <div className="px-3 py-2 flex items-center space-x-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full border-2 border-blue-200"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">
                          {user.displayName || "User"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 mt-2">
                      <Link
                        to="/profile"
                        className="block px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                      >
                        Order History
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                        >
                          Admin Dashboard
                        </Link>
                      )}

                      {isSeller && (
                        <Link
                          to="/seller"
                          className="block px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                        >
                          Seller Dashboard
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          handleLogOut();
                          setMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-slate-100 pt-4 mt-4 space-y-2">
                    <NavLink
                      to="/login"
                      className="block px-3 py-2 text-center text-blue-600 font-medium hover:bg-blue-50 rounded-md transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className="block px-3 py-2 text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-md hover:from-blue-700 hover:to-green-700 transition-all duration-200 font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navber;

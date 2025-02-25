
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useCart from '../Hooks/useCart/useCart';
import useAdmin from '../Hooks/isAdmin/useAdmin';
import { HiOutlineMenu, HiX } from 'react-icons/hi'; // Import icons
import useSeller from '../Hooks/isSeller/useSeller';

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isSeller] = useSeller()
  const [isAdmin] = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu

  console.log(isSeller)
  const handleLogOut = () => {
    logOut()
      .then(() => console.log('User logged out successfully.'))
      .catch((error) => console.error('Error during logout:', error));
  };

  return (
    <nav className="navbar  bg-teal-500 text-white   backdrop-blur-md container sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-4 ">
        {/* Logo */}
        <Link to="/" className="text-teal-200 font-bold text-xl">
          +MediBazer
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/shop" className="hover:text-blue-600">Shop</NavLink>
          <NavLink to="/cart" className="relative hover:text-blue-600">
            Cart
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>

        {/* User Profile & Auth */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="relative">
            <div className="dropdown dropdown-end">
          <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {user &&<div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.photoURL || 'https://via.placeholder.com/150'} // Fallback if photoURL is unavailable
                  />
                </div>}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <span className="text-gray-600 font-bold">
                    {user?.displayName || 'Anonymous User'}
                  </span>
                </li>
                {user && isAdmin &&  <li>
                    <Link to='/admin'>Admin Dashboard</Link>
                  </li>}
                {user && isSeller &&  <li>
                    <Link to='/seller'>seller Dashboard</Link>
                  </li>}
                <li>
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>

              <div className="absolute bg-transparent bg-cyan-400 opacity-35 shadow-lg p-3 rounded-md right-0 top-12 w-48 hidden group-hover:block">
                <span className="block font-bold text-gray-600">
                  {user?.displayName || 'Anonymous User'}
                </span>
                {isAdmin && <NavLink to="/admin">Admin Dashboard</NavLink>}
                <button className="btn btn-sm btn-primary mt-2 w-full" onClick={handleLogOut}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-sm">Login</NavLink>
              <NavLink to="/signup" className="btn btn-sm">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden flex flex-col items-center bg-transparent bg-white text-teal-500 shadow-md absolute top-16 left-0 w-full z-50 py-2">
          <NavLink to="/" className="py-2" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/shop" className="py-2" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/cart" className="relative py-2" onClick={() => setMenuOpen(false)}>
            Cart
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          </NavLink>
          {user ? (
            <>
              <span className="py-2 font-bold text-gray-600">{user?.displayName || 'Anonymous User'}</span>
              {isAdmin && <NavLink to="/admin" className="py-2">Admin Dashboard</NavLink>}
              <button className="btn btn-sm btn-primary mt-2" onClick={handleLogOut}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn text-teal-500 border-2 border-teal-500 btn-sm my-2">Login</NavLink>
              <NavLink to="/signup" className="btn text-teal-500 border-2 border-teal-500 btn-sm my-2">Sign Up</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navber;

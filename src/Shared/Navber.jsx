// import React, { useContext } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import './Navber.css';
// import { AuthContext } from '../Providers/AuthProvider';
// import useCart from '../Hooks/useCart/useCart';
// import useAdmin from '../Hooks/isAdmin/useAdmin';

// const Navber = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [cart] = useCart()
//   const [isAdmin,isAdminLoading]=useAdmin();

//   const handleLogOut = () => {
//     logOut()
//       .then(() => {
//         console.log('User logged out successfully.');
//       })
//       .catch((error) => console.error('Error during logout:', error));
//   };

//   const navOption = (
//     <>
//       <NavLink
//         to="/"
//         className="text-center items-center flex justify-center md:mr-2"
//       >
//         <button>Home</button>
//       </NavLink>
//       <NavLink
//         to="/shop"
//         className="text-center items-center flex justify-center"
//       >
//         <button>Shop</button>
//       </NavLink>
//       <NavLink
//         to="/cart"
//         className="text-center items-center flex justify-center"
//       >
//         <div className="btn btn-ghost btn-circle">
//           <div className="indicator">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//               />
//             </svg>
//             <span className="badge badge-sm indicator-item">{cart.length}</span>
//           </div>
//         </div>
//       </NavLink>
//     </>
//   );

//   return (
//     <div className="navbar bg-transparent backdrop-blur-md items-center container text-center sticky z-50 top-0">
//       <div className="navbar-start">
//         <Link to="/" className="text-red-600 font-bold text-xl">
//           Med For You
//         </Link>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {navOption}
//         </ul>
//       </div>
//       <div className="navbar-end flex items-center gap-3">
//         {user ? (
//           <>
//             {/* Display user's profile picture and name */}
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle avatar"
//               >
//                 <div className="w-10 rounded-full">
//                   <img
//                     alt="User Avatar"
//                     src={user?.photoURL || 'https://via.placeholder.com/150'} // Fallback if photoURL is unavailable
//                   />
//                 </div>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//               >
//                 <li>
//                   <span className="text-gray-600 font-bold">
//                     {user?.displayName || 'Anonymous User'}
//                   </span>
//                 </li>
//                 {user && isAdmin &&  <li>
//                     <Link to='/admin'>Admin Dashboard</Link>
//                   </li>}
//                 <li>
//                   <button
//                     className="btn btn-sm btn-primary mt-2"
//                     onClick={handleLogOut}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </>
//         ) : (
//           <>
//             <NavLink
//               to="/login"
//               className="text-center items-center flex justify-center"
//             >
//               <button>Login</button>
//             </NavLink>
//             <NavLink
//               to="/signup"
//               className="text-center items-center flex justify-center"
//             >
//               <button>Sign Up</button>
//             </NavLink>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navber;


//_______________________________________________________________------------------------------_____________________________________

import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useCart from '../Hooks/useCart/useCart';
import useAdmin from '../Hooks/isAdmin/useAdmin';
import { HiOutlineMenu, HiX } from 'react-icons/hi'; // Import icons

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu

  const handleLogOut = () => {
    logOut()
      .then(() => console.log('User logged out successfully.'))
      .catch((error) => console.error('Error during logout:', error));
  };

  return (
    <nav className="navbar bg-transparent backdrop-blur-md container sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-red-600 font-bold text-xl">
          Med For You
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
              <div className="btn btn-ghost btn-circle avatar">
                <img
                  alt="User Avatar"
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  className="w-10 rounded-full"
                />
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
        <div className="lg:hidden flex flex-col items-center bg-transparent bg-cyan-400 o  shadow-md absolute top-16 left-0 w-full z-50 py-4">
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
              <NavLink to="/login" className="btn btn-sm my-2">Login</NavLink>
              <NavLink to="/signup" className="btn btn-sm my-2">Sign Up</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navber;

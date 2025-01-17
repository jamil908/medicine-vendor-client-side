import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navber.css'

const Navber = () => {
    const navOption = <>
        <NavLink to='/' className=' text-center items-center flex justify-center md:mr-2'><button>Home</button></NavLink>
        <NavLink to='/shop'  className=' text-center items-center flex justify-center '><button>Shop</button></NavLink>
        <NavLink to='/login'  className=' text-center items-center flex justify-center md:hidden'><button>login</button></NavLink>
        <NavLink to='/signup'  className=' text-center items-center flex justify-center  md:hidden'><button>sign up</button></NavLink>
        <Link to='/cart'  className=' text-center items-center'> <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
</Link>
        
    </>
    return (
        <div className="navbar bg-transparent  backdrop-blur-md items-center container text-center sticky z-50 top-0 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       {navOption}
      </ul>
    </div>
    <a className=" text-red-600  font-bold  text-xl">Med For you</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

{navOption}
    </ul>
  </div>
  <div className="navbar-end flex gap-3">
  <NavLink to='/login'  className=' text-center items-center    hidden md:block   justify-center'><button>login</button></NavLink>
        <NavLink to='/signup'  className=' text-center items-center  hidden md:block  justify-center'><button>sign up</button></NavLink>
       
  <div className="dropdown dropdown-end f">

      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    );
};

export default Navber;
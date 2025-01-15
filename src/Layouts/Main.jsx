import React from 'react';
import { Outlet } from 'react-router-dom';
import Navber from '../Shared/Navber';
import Footer from '../Shared/Footer';

const Main = () => {
    return (
        <div className='container mx-auto'>
        <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
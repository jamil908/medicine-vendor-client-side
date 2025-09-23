import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSeller from '../Hooks/isSeller/useSeller';
import UseAuth from '../Hooks/useAuth/UseAuth';

const SellerRoute = ({children}) => {
    const {user,loading}=UseAuth()
    const [isSeller,isSellerLoading]=useSeller()
    const location = useLocation()
    if(loading || isSellerLoading){
        return <span className="loading items-center text-center text-red-600  flex justify-center mx-auto loading-bars loading-lg"></span>
    }
    if(user && isSeller){
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default SellerRoute;
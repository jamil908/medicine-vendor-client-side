import React from 'react';
import useAdmin from '../../Hooks/isAdmin/useAdmin';
import UseAuth from '../../Hooks/useAuth/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user,loading}=UseAuth()
    const [isAdmin,isAdminLoading]=useAdmin()
    const location = useLocation()
    if(loading || isAdminLoading){
        return <span className="loading items-center text-center text-red-600  flex justify-center mx-auto loading-bars loading-lg"></span>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;
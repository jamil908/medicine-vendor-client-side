import React from 'react';
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {data: cart = []}= useQuery({
        queryKey: ['carts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/carts');
            return res.data;
        },
        
    });
    return[cart]

};

export default useCart;
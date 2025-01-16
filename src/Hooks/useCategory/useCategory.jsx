

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';

const useCategory = () => {
    const axiosSecure = useAxiosSecure();
    return useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosSecure.get('/category');
            return res.data;
        },
    });
};

export default useCategory;

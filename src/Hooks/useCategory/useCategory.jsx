

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';

const useCategory = () => {
    const axiosSecure = useAxiosSecure();
    return useQuery({
  queryKey: ["category"],
  queryFn: async () => {
    const res = await axiosSecure.get("/category");
    return res.data;
  },
  staleTime: 1000 * 60 * 5, // 5 মিনিট cache থাকবে
  cacheTime: 1000 * 60 * 10, // 10 মিনিট পরে garbage collect হবে
});

};

export default useCategory;

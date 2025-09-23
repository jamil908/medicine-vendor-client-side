import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../axiosPublic/useAxiosPublic"; // তোমার Axios hook

const useMedicines = () => {
  const axiosPublic = useAxiosPublic();

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicines");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 মিনিট cache থাকবে
    cacheTime: 1000 * 60 * 10, // 10 মিনিট পরে garbage collect হবে
  });

  return { medicines: data, isLoading, error };
};

export default useMedicines;

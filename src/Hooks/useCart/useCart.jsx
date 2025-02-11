import { useQuery } from "@tanstack/react-query";
import UseAuth from "../useAuth/UseAuth";
import useAxiosPublic from "../axiosPublic/useAxiosPublic";

const useCart = () => {
    const axiosPublic = useAxiosPublic()
    const {user}=UseAuth();
    const {refetch, data: cart =[] } = useQuery({
        queryKey:['cart',user?.email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/carts?email=${user.email}`);
            return res.data
        }
    })
    return [cart, refetch]
  };
  
  

export default useCart;
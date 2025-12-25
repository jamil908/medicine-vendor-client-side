import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../Hooks/axiosPublic/useAxiosPublic";

const SellerRevenueChart = () => {
  const [data, setData] = useState([]);
 const axiosPublic = useAxiosPublic()
 const { user } = useContext(AuthContext);
    const email = user?.email
  useEffect(() => {
    if (email) {
      axiosPublic.get(`/seller-monthly-revenue/${email}`).then((res) => setData(res.data.monthlyRevenue));
    }
  }, [email]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Monthly Revenue</h3>
      {data.map((d) => (
        <div key={d._id} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
          <span>{d._id}</span>
          <span>${d.revenue}</span>
        </div>
      ))}
    </div>
  );
};

export default SellerRevenueChart;

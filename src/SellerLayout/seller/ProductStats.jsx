import React, { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/axiosPublic/useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";

const SellerProductStats = () => {
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic()
 const { user } = useContext(AuthContext);
    const email = user?.email
      useEffect(() => {
    if (email) {
      axiosPublic.get(`/seller-product-stats/${email}`).then((res) => setProducts(res.data.productStats));
    }
  }, [email]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Top Products</h3>
      {products.slice(0, 5).map((p) => (
        <div key={p._id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "6px 0" }}>
          <span>{p.productName}</span>
          <span>${p.totalRevenue}</span>
        </div>
      ))}
    </div>
  );
};

export default SellerProductStats;

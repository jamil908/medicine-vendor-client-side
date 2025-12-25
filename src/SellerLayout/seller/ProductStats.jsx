import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SellerProductStats = ({ email }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (email) {
      useAxiosSecure.get(`/seller-product-stats/${email}`).then((res) => setProducts(res.data.productStats));
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

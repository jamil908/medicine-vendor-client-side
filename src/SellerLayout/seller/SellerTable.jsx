import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SellerSalesTable = ({ email }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (email) {
      useAxiosSecure.get(`/seller-sales/${email}`).then((res) => setSales(res.data.sales));
    }
  }, [email]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Recent Sales</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>{new Date(item.soldAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerSalesTable;

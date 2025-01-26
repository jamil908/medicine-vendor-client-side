import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import jsPDF from "jspdf";

const Invoice = () => {
  const { transactionId } = useParams(); // Get transaction ID from URL
  const [paymentInfo, setPaymentInfo] = useState({});
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Fetch payment details using transactionId
    axiosSecure.get(`/payments/${transactionId}`).then((res) => {
      setPaymentInfo(res.data);
    });
  }, [transactionId, axiosSecure]);

  // Function to download the invoice as a PDF
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text("Invoice", 10, 10);
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${paymentInfo.transactionId || "N/A"}`, 10, 20);
    doc.text(`Name: ${paymentInfo.name || "N/A"}`, 10, 30);
    doc.text(`Email: ${paymentInfo.email || "N/A"}`, 10, 40);
    doc.text(`Total Paid: $${paymentInfo.price || "0.00"}`, 10, 50);
    doc.text(
      `Date: ${
        paymentInfo.date
          ? new Date(paymentInfo.date).toLocaleString()
          : "N/A"
      }`,
      10,
      60
    );

    // Save the PDF
    doc.save("invoice.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Invoice</h1>
      <div className="border p-4 mt-4 rounded-md shadow-md">
        <p>
          <strong>Transaction ID:</strong> {paymentInfo.transactionId}
        </p>
        <p>
          <strong>Name:</strong> {paymentInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {paymentInfo.email}
        </p>
        <p>
          <strong>Total Paid:</strong> ${paymentInfo.price}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {paymentInfo.date
            ? new Date(paymentInfo.date).toLocaleString()
            : "N/A"}
        </p>
      </div>
      <div className="mt-4 space-x-4">
        {/* Print Button */}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => window.print()} // Print the invoice
        >
          Print Invoice
        </button>

        {/* Download PDF Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleDownloadInvoice}
        >
          Download Invoice as PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;

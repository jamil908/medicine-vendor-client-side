import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import jsPDF from "jspdf";

const Invoice = () => {
  const { transactionId } = useParams(); // Get transaction ID from URL 
  const [paymentInfo, setPaymentInfo] = useState({});   
  const axiosSecure = useAxiosSecure();  

  // Replace this with your actual API call
  useEffect(() => {
    axiosSecure.get(`/payments/${transactionId}`).then((res) => {
      setPaymentInfo(res.data);
    });
    console.log("Fetching payment data for:", transactionId);
  }, [transactionId, axiosSecure]);

  // Custom Logo Component
  const CompanyLogo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">MediBazer</h2>
        <p className="text-sm text-gray-500">Payment Solutions</p>
      </div>
    </div>
  );

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Header with blue background
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 35, 'F');
    
    // Company name in white
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("MediBazer", 15, 20);
    doc.setFontSize(10);
    doc.text("Payment Solutions", 15, 28);

    // Invoice title
    doc.setFontSize(18);
    doc.text("INVOICE", 150, 20);

    // Reset text color to black
    doc.setTextColor(0, 0, 0);

    // Invoice details
    doc.setFontSize(12);
    doc.text(`Invoice #: ${paymentInfo.transactionId || "N/A"}`, 15, 50);
    doc.text(`Date: ${paymentInfo.date ? new Date(paymentInfo.date).toLocaleDateString() : "N/A"}`, 15, 60);

    // Bill to section
    doc.setFontSize(14);
    doc.text("Bill To:", 15, 80);
    doc.setFontSize(11);
    doc.text(`Name: ${paymentInfo.name || "N/A"}`, 15, 90);
    doc.text(`Email: ${paymentInfo.email || "N/A"}`, 15, 100);

    // Payment details box
    doc.setFillColor(248, 250, 252);
    doc.rect(15, 115, 180, 35, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, 115, 180, 35, 'S');
    
    doc.setFontSize(12);
    doc.text("Payment Details:", 20, 125);
    doc.setFontSize(16);
    doc.text(`Total Amount Paid: ${paymentInfo.price || "0.00"}`, 20, 135);
    doc.setFontSize(10);
    doc.text("Status: Payment Completed ✓", 20, 145);

    // Transaction information
    doc.setFontSize(12);
    doc.text("Transaction Information:", 15, 165);
    doc.setFontSize(10);
    doc.text(`Transaction ID: ${paymentInfo.transactionId || "N/A"}`, 15, 175);
    doc.text(`Payment Method: Credit Card`, 15, 185);
    doc.text(`Processing Time: ${paymentInfo.date ? new Date(paymentInfo.date).toLocaleTimeString() : "N/A"}`, 15, 195);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your payment!", 15, 220);
    doc.text("For support, contact: support@medibazer.com", 15, 230);

    // Save the PDF
    doc.save(`invoice-${paymentInfo.transactionId || "download"}.pdf`);
  };

  return (
    <>
      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-invoice, .printable-invoice * {
            visibility: visible;
          }
          .printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            max-height: 100vh;
            overflow: hidden;
            page-break-after: avoid;
          }
          .print-compact {
            padding: 1rem !important;
          }
          .print-header {
            padding: 0.5rem 1rem !important;
          }
          .print-content {
            padding: 1rem !important;
          }
          .print-small {
            font-size: 0.8rem !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Invoice Container */}
          <div className="printable-invoice bg-white rounded-2xl shadow-2xl overflow-hidden print-container">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-6 print-header">
              <div className="flex justify-between items-start">
                <CompanyLogo />
                <div className="text-right">
                  <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                    <p className="text-sm opacity-90">Invoice #</p>
                    <p className="font-semibold">{paymentInfo.transactionId || "Loading..."}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Content */}
            <div className="p-8 print-content print-compact">
              {/* Date and Status */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Invoice Date</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {paymentInfo.date ? new Date(paymentInfo.date).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Paid
                  </span>
                </div>
              </div>

              {/* Bill To Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                    Bill To
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-gray-800 print-small">{paymentInfo.name || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-800 print-small">{paymentInfo.email || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-purple-200 pb-2">
                    Payment Details
                  </h3>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Total Amount</p>
                      <p className="text-3xl font-bold text-green-600">
                        ${paymentInfo.price || "0.00"}
                      </p>
                      <div className="mt-2 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-sm text-green-700">Payment Completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="border-t border-gray-200 pt-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Transaction Information</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Transaction ID</p>
                      <p className="font-mono bg-white px-2 py-1 rounded border text-xs">
                        {paymentInfo.transactionId || "Loading..."}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Payment Method</p>
                      <p className="font-semibold">Credit Card</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Processing Time</p>
                      <p className="font-semibold">
                        {paymentInfo.date ? new Date(paymentInfo.date).toLocaleTimeString() : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-8 py-6 border-t no-print">
              <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Print Invoice</span>
                </button>
                
                <button
                  onClick={handleDownloadInvoice}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-600 no-print">
            <p className="text-sm">
              Thank you for your business! For any questions, contact us at{" "}
              <a href="mailto:support@medibazer.com" className="text-blue-600 hover:underline">
                support@medibazer.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
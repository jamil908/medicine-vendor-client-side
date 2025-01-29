import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CSVLink } from "react-csv"; // For CSV export
import * as XLSX from 'xlsx'; // For XLSX export
import { jsPDF } from "jspdf"; // For PDF export
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const { data: cart = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const response = await axiosSecure.get("/carts/all");
            return response.data;
        },
    });

    if (isLoading) return <div> <span className="loading loading-bars text-cyan-500 loading-lg"></span></div>;
    if (isError) return <div>Error: {error.message}</div>;

    // Function to export to XLSX
    const exportToXLSX = () => {
        const ws = XLSX.utils.json_to_sheet(cart);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SalesReport");
        XLSX.writeFile(wb, "SalesReport.xlsx");
    };

    // Function to export to PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Sales Report", 20, 10);
        let y = 20;
        cart.forEach((item, index) => {
            doc.text(`${item.name} | ${item.seller} | ${item.userEmail} | $${item.quantity * item.price}`, 20, y);
            y += 10;
        });
        doc.save("SalesReport.pdf");
    };

    

    return (
        <div>
            <h2>Sales Report</h2>
            <div className="mb-4">
                <button onClick={exportToPDF} className="bg-blue-500 text-white px-4 py-2 mr-2">Export to PDF</button>
                <CSVLink data={cart} filename={"SalesReport.csv"}>
                    <button className="bg-yellow-500 text-white px-4 py-2 mr-2">Export to CSV</button>
                </CSVLink>
                <button onClick={exportToXLSX} className="bg-red-500 text-white px-4 py-2">Export to XLSX</button>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                        <th className="border border-gray-300 px-4 py-2">Seller</th>
                        <th className="border border-gray-300 px-4 py-2">Buyer</th>
                        <th className="border border-gray-300 px-4 py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.seller}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.userEmail}</td>
                            <td className="border border-gray-300 px-4 py-2">${item.quantity * item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReport;

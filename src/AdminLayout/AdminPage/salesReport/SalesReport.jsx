import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'; // Import jspdf-autotable for table support
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Download, FileText, FileSpreadsheet, DollarSign, BarChart2, TrendingUp, ShoppingBag, User } from 'lucide-react';
import Swal from 'sweetalert2';

const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const { data: cart = [], isLoading, isError, error } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const response = await axiosSecure.get("/carts/all");
            return response.data;
        },
    });

    // Calculate sales metrics
    const totalSales = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const totalTransactions = cart.length;
    const uniqueBuyers = [...new Set(cart.map(item => item.userEmail))].length;
    const totalProductsSold = cart.reduce((sum, item) => sum + item.quantity, 0);

    const exportToXLSX = () => {
        if (cart.length === 0) {
            Swal.fire('No Data to Export', 'There is no sales data to export to XLSX.', 'info');
            return;
        }
        const ws = XLSX.utils.json_to_sheet(cart.map(item => ({
            "Product Name": item.name,
            "Seller": item.seller,
            "Buyer Email": item.userEmail,
            "Quantity": item.quantity,
            "Price": item.price,
            "Total": item.quantity * item.price
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SalesReport");
        XLSX.writeFile(wb, "SalesReport.xlsx");
    };

    const exportToPDF = () => {
        if (cart.length === 0) {
            Swal.fire('No Data to Export', 'There is no sales data to export to PDF.', 'info');
            return;
        }
        const doc = new jsPDF();
        
        doc.setFontSize(22);
        doc.setTextColor(2, 132, 199); // Tailwind's cyan-600
        doc.text("Sales Report", 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139); // Tailwind's slate-500
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
        doc.text(`Total Sales: $${totalSales.toFixed(2)}`, 14, 34);

        const tableColumn = ["Product Name", "Seller", "Buyer Email", "Quantity", "Price ($)", "Total ($)"];
        const tableRows = cart.map(item => [
            item.name,
            item.seller,
            item.userEmail,
            item.quantity,
            item.price.toFixed(2),
            (item.quantity * item.price).toFixed(2)
        ]);
        
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            styles: { fontSize: 8, cellPadding: 2, textColor: [55, 65, 81] },
            headStyles: { fillColor: [2, 132, 199], textColor: [255, 255, 255] },
            theme: 'striped',
        });
        
        doc.save("SalesReport.pdf");
    };

    const csvData = cart.map(item => ({
        "Product Name": item.name,
        "Seller": item.seller,
        "Buyer Email": item.userEmail,
        "Quantity": item.quantity,
        "Price": item.price,
        "Total": item.quantity * item.price
    }));

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <span className="loading loading-bars text-cyan-500 loading-lg"></span>
        </div>
    );
    if (isError) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-400">
            <p>Error loading sales data: {error.message}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl p-8 lg:p-12 transform hover:scale-[1.01] transition-transform duration-500 will-change-transform">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
                        <div className="flex items-center space-x-6">
                            <div className="p-5 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full shadow-2xl">
                                <BarChart2 className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                                    Sales Report
                                </h1>
                                <p className="text-gray-400 text-lg mt-2 font-medium">Detailed overview of all sales transactions.</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                            <button
                                onClick={exportToPDF}
                                className="group relative w-full sm:w-auto px-6 py-3 overflow-hidden font-bold text-gray-900 transition-all duration-300 bg-red-500 rounded-full shadow-lg hover:shadow-red-400/50 flex items-center justify-center space-x-2"
                            >
                                <FileText className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
                                <span>PDF</span>
                            </button>
                            <CSVLink data={csvData} filename={"SalesReport.csv"} className="w-full sm:w-auto">
                                <button className="group relative w-full px-6 py-3 overflow-hidden font-bold text-gray-900 transition-all duration-300 bg-yellow-500 rounded-full shadow-lg hover:shadow-yellow-400/50 flex items-center justify-center space-x-2">
                                    <FileSpreadsheet className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-700" />
                                    <span>CSV</span>
                                </button>
                            </CSVLink>
                            <button
                                onClick={exportToXLSX}
                                className="group relative w-full sm:w-auto px-6 py-3 overflow-hidden font-bold text-gray-900 transition-all duration-300 bg-green-500 rounded-full shadow-lg hover:shadow-green-400/50 flex items-center justify-center space-x-2"
                            >
                                <Download className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                                <span>XLSX</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sales Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {/* Total Sales Card */}
                    <div className="relative group bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-800">
                        <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
                        <div className="relative z-10 flex items-center justify-between text-gray-50">
                            <div>
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Revenue</p>
                                <p className="text-4xl md:text-5xl font-extrabold mt-2 text-cyan-400">${totalSales.toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-full group-hover:rotate-12 transition-transform duration-500">
                                <DollarSign className="w-10 h-10 text-cyan-400" />
                            </div>
                        </div>
                    </div>

                    {/* Total Transactions Card */}
                    <div className="relative group bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-800">
                        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
                        <div className="relative z-10 flex items-center justify-between text-gray-50">
                            <div>
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Transactions</p>
                                <p className="text-4xl md:text-5xl font-extrabold mt-2 text-blue-400">{totalTransactions}</p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-full group-hover:rotate-12 transition-transform duration-500">
                                <TrendingUp className="w-10 h-10 text-blue-400" />
                            </div>
                        </div>
                    </div>

                    {/* Total Products Sold Card */}
                    <div className="relative group bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-800">
                        <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
                        <div className="relative z-10 flex items-center justify-between text-gray-50">
                            <div>
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Products Sold</p>
                                <p className="text-4xl md:text-5xl font-extrabold mt-2 text-purple-400">{totalProductsSold}</p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-full group-hover:rotate-12 transition-transform duration-500">
                                <ShoppingBag className="w-10 h-10 text-purple-400" />
                            </div>
                        </div>
                    </div>

                    {/* Unique Buyers Card */}
                    <div className="relative group bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-800">
                        <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
                        <div className="relative z-10 flex items-center justify-between text-gray-50">
                            <div>
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Unique Buyers</p>
                                <p className="text-4xl md:text-5xl font-extrabold mt-2 text-emerald-400">{uniqueBuyers}</p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-full group-hover:rotate-12 transition-transform duration-500">
                                <User className="w-10 h-10 text-emerald-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Table Section */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 rounded-t-3xl">
                        <h2 className="text-3xl font-bold text-white flex items-center space-x-4">
                            <ShoppingBag className="w-8 h-8 text-cyan-400" />
                            <span>Sales Overview</span>
                        </h2>
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl font-semibold text-gray-400">No sales data available yet.</p>
                            <p className="text-gray-500 mt-2">Check back later for sales information.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-800 border-b border-gray-700">
                                    <tr className="text-gray-400 uppercase text-sm">
                                        <th scope="col" className="px-6 py-4 font-semibold">Product Name</th>
                                        <th scope="col" className="px-6 py-4 font-semibold">Seller</th>
                                        <th scope="col" className="px-6 py-4 font-semibold">Buyer</th>
                                        <th scope="col" className="px-6 py-4 font-semibold text-right">Quantity</th>
                                        <th scope="col" className="px-6 py-4 font-semibold text-right">Price</th>
                                        <th scope="col" className="px-6 py-4 font-semibold text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-200">
                                            <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">{item.name}</td>
                                            <td className="px-6 py-4 text-gray-400">{item.seller}</td>
                                            <td className="px-6 py-4 text-gray-400">{item.userEmail}</td>
                                            <td className="px-6 py-4 text-gray-300 text-right">{item.quantity}</td>
                                            <td className="px-6 py-4 text-gray-300 text-right">${item.price.toFixed(2)}</td>
                                            <td className="px-6 py-4 font-bold text-teal-400 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesReport;
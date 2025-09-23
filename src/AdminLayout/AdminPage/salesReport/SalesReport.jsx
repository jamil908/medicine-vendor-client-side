import React from 'react';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  DollarSign, 
  BarChart2, 
  TrendingUp, 
  ShoppingBag, 
  User,
  Calendar,
  Eye,
  Filter,
  RefreshCw
} from 'lucide-react';

const SalesReport = () => {
    // Mock data - replace with your actual useQuery and hooks
    const cart = [
        {
            name: "Paracetamol 500mg",
            seller: "PharmaCorp Ltd",
            userEmail: "john.doe@email.com",
            quantity: 2,
            price: 45.50
        },
        {
            name: "Vitamin D3 Tablets",
            seller: "HealthMed Inc",
            userEmail: "jane.smith@email.com",
            quantity: 1,
            price: 120.00
        },
        {
            name: "Omeprazole 20mg",
            seller: "MediSupply Co",
            userEmail: "mike.wilson@email.com",
            quantity: 3,
            price: 85.75
        }
    ];
    
    const isLoading = false;
    const isError = false;

    // Calculate sales metrics
    const totalSales = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const totalTransactions = cart.length;
    const uniqueBuyers = [...new Set(cart.map(item => item.userEmail))].length;
    const totalProductsSold = cart.reduce((sum, item) => sum + item.quantity, 0);

    const exportToPDF = () => {
        if (cart.length === 0) {
            alert('No data to export');
            return;
        }
        
        // Create PDF content
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Sales Report</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 20px; 
                        color: #333;
                        line-height: 1.6;
                    }
                    .header { 
                        text-align: center; 
                        margin-bottom: 30px; 
                        border-bottom: 2px solid #2563eb;
                        padding-bottom: 20px;
                    }
                    .header h1 { 
                        color: #2563eb; 
                        margin: 0;
                        font-size: 28px;
                    }
                    .header p { 
                        color: #666; 
                        margin: 5px 0;
                    }
                    .metrics {
                        display: flex;
                        justify-content: space-around;
                        margin: 30px 0;
                        background: #f8fafc;
                        padding: 20px;
                        border-radius: 8px;
                    }
                    .metric {
                        text-align: center;
                        padding: 10px;
                    }
                    .metric h3 {
                        margin: 0;
                        color: #2563eb;
                        font-size: 24px;
                    }
                    .metric p {
                        margin: 5px 0 0 0;
                        color: #666;
                        font-size: 12px;
                    }
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin-top: 20px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    }
                    th, td { 
                        border: 1px solid #e2e8f0; 
                        padding: 12px 8px; 
                        text-align: left;
                    }
                    th { 
                        background-color: #2563eb; 
                        color: white; 
                        font-weight: bold;
                        text-align: center;
                    }
                    tr:nth-child(even) { 
                        background-color: #f8fafc; 
                    }
                    tr:hover { 
                        background-color: #e2e8f0; 
                    }
                    .total-cell {
                        font-weight: bold;
                        color: #059669;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        color: #666;
                        font-size: 12px;
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Sales Report</h1>
                    <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    <p>Report Period: ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="metrics">
                    <div class="metric">
                        <h3>$${totalSales.toFixed(2)}</h3>
                        <p>TOTAL REVENUE</p>
                    </div>
                    <div class="metric">
                        <h3>${totalTransactions}</h3>
                        <p>TRANSACTIONS</p>
                    </div>
                    <div class="metric">
                        <h3>${totalProductsSold}</h3>
                        <p>PRODUCTS SOLD</p>
                    </div>
                    <div class="metric">
                        <h3>${uniqueBuyers}</h3>
                        <p>UNIQUE BUYERS</p>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Seller</th>
                            <th>Buyer Email</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.seller}</td>
                                <td>${item.userEmail}</td>
                                <td style="text-align: center">${item.quantity}</td>
                                <td style="text-align: right">$${item.price.toFixed(2)}</td>
                                <td style="text-align: right" class="total-cell">$${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="footer">
                    <p>This report was generated automatically by MediBazer Sales System</p>
                    <p>For questions, contact: support@medibazar.com</p>
                </div>
            </body>
            </html>
        `;

        // Create a new window and print
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Wait for content to load then print
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    const exportToXLSX = () => {
        if (cart.length === 0) {
            alert('No data to export');
            return;
        }
        
        const csvContent = [
            ["Product Name", "Seller", "Buyer Email", "Quantity", "Price", "Total"],
            ...cart.map(item => [
                item.name,
                item.seller,
                item.userEmail,
                item.quantity,
                item.price,
                (item.quantity * item.price).toFixed(2)
            ])
        ].map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SalesReport.csv';
        a.click();
        window.URL.revokeObjectURL(url);
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-600 font-medium">Loading sales data...</p>
            </div>
        </div>
    );

    if (isError) return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-200">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h3>
                <p className="text-red-600">Unable to load sales report data</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-green-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 lg:p-10 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-100/50 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
                        <div className="flex items-center space-x-6">
                            <div className="p-4 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl shadow-lg">
                                <BarChart2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                    Sales Dashboard
                                </h1>
                                <p className="text-slate-600 text-lg mt-2">Comprehensive analytics and reporting</p>
                                <div className="flex items-center space-x-4 mt-3">
                                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                                        <Calendar className="w-4 h-4" />
                                        <span>Updated: {new Date().toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                                        <Eye className="w-4 h-4" />
                                        <span>Live Data</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 flex items-center space-x-2 group">
                                <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                                <span>Filters</span>
                            </button>
                            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 flex items-center space-x-2 group">
                                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                                <span>Refresh</span>
                            </button>
                            <button
                                onClick={exportToPDF}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-red-500/25 group"
                            >
                                <FileText className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                <span>PDF</span>
                            </button>
                            <button
                                onClick={exportToXLSX}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-green-500/25 group"
                            >
                                <FileSpreadsheet className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                <span>Excel</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sales Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Revenue */}
                    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                                    <DollarSign className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500">+12.5% vs last month</p>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-1">${totalSales.toFixed(2)}</h3>
                            <p className="text-slate-500 font-medium">Total Revenue</p>
                        </div>
                    </div>

                    {/* Total Transactions */}
                    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500">+8.2% vs last month</p>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-1">{totalTransactions}</h3>
                            <p className="text-slate-500 font-medium">Total Transactions</p>
                        </div>
                    </div>

                    {/* Products Sold */}
                    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                                    <ShoppingBag className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500">+15.1% vs last month</p>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-1">{totalProductsSold}</h3>
                            <p className="text-slate-500 font-medium">Products Sold</p>
                        </div>
                    </div>

                    {/* Unique Buyers */}
                    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors duration-300">
                                    <User className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500">+6.8% vs last month</p>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800 mb-1">{uniqueBuyers}</h3>
                            <p className="text-slate-500 font-medium">Unique Buyers</p>
                        </div>
                    </div>
                </div>

                {/* Sales Table Section */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Sales Transactions</h2>
                                    <p className="text-slate-600">Detailed view of all sales activity</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span>Real-time data</span>
                            </div>
                        </div>
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-12 h-12 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Sales Data Yet</h3>
                            <p className="text-slate-500 mb-6">Your sales transactions will appear here once you start making sales.</p>
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium">
                                Refresh Data
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr className="text-left">
                                        <th className="px-6 py-4 font-semibold text-slate-700">Product</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Seller</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Buyer</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700 text-center">Qty</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700 text-right">Price</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {cart.map((item, index) => (
                                        <tr key={index} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{item.seller}</td>
                                            <td className="px-6 py-4 text-slate-600">{item.userEmail}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium text-slate-700">
                                                ${item.price.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-green-600">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Summary Footer */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <div className="text-center sm:text-left">
                            <h4 className="font-semibold text-slate-800">Report Summary</h4>
                            <p className="text-sm text-slate-600">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                        </div>
                        <div className="flex items-center space-x-6 text-center">
                            <div>
                                <div className="text-2xl font-bold text-blue-600">{((totalSales / totalTransactions) || 0).toFixed(2)}</div>
                                <div className="text-sm text-slate-500">Avg. Order Value</div>
                            </div>
                            <div className="w-px h-12 bg-slate-200"></div>
                            <div>
                                <div className="text-2xl font-bold text-green-600">${totalSales.toFixed(2)}</div>
                                <div className="text-sm text-slate-500">Total Revenue</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesReport;
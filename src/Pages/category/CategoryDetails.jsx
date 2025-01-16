import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CategoryDetails = () => {
    const { categoryName } = useParams();
    console.log(categoryName);
    const axiosSecure = useAxiosSecure();

    const { data: medicines = [], isLoading, error } = useQuery({
        queryKey: ['medicines', categoryName],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines/${categoryName}`);
            return res.data;
        },
    });
    console.log(medicines)
    if (isLoading) {
        return <p className="text-center text-blue-500">Loading medicines...</p>;
    }
    if (error) {
        return (
            <p className="text-center text-red-500">
                Failed to load medicines: {error.message}
            </p>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-8">
                Medicines in Category: {categoryName}
            </h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Image</th>
                            <th className="border border-gray-300 p-2">Medicine Name</th>
                            <th className="border border-gray-300 p-2">Generic Name</th>
                            <th className="border border-gray-300 p-2">Company</th>
                            <th className="border border-gray-300 p-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines[0]?.medicines?.map((medicine,index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                    <img
                                        src={medicine.image}
                                        alt={medicine.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {medicine.name}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {medicine.genericName}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {medicine.company}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    ${medicine.price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryDetails;







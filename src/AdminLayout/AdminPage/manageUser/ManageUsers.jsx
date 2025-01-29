

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users using TanStack Query
  const { data: users = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"], // Unique key for this query
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  // Update role functionality remains the same
  const updateRole = (id, role) => {
    axiosSecure
      .put(`/users/${id}`, { role })
      .then(() => {
        // Refetch users after successful role update
        refetch();
      })
      .catch((error) => console.error("Error updating user role:", error));
  };

  if (isLoading) {
    return <span className="loading loading-bars text-cyan-500 loading-lg"></span>
  }

  if (isError) {
    return <p>Error fetching users: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Manage Users</h2>
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                {/* Dropdown for role selection */}
                <select
                  className="border rounded px-2 py-1"
                  value={user.role}
                  onChange={(e) => updateRole(user._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;

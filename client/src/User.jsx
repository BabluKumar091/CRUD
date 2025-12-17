import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteUser/${id}`) 
      .then(() => {
        setUser((prev) => prev.filter((u) => u._id !== id));
      })
      .catch((err) => console.error("Error deleting user", err));
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center mb-6">
          <Link
            to="/create"
            className="bg-blue-600 p-3 rounded-sm text-white hover:bg-blue-700 transition-colors"
          >
            Add +
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.map((data) => {
            return (
              <div key={data._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{data.name}</h3>
                <p className="text-gray-600 mb-1">Email: {data.email}</p>
                <p className="text-gray-600 mb-4">Age: {data.age}</p>
                <div className="flex space-x-2">
                  <Link to={`/update/${data._id}`}>
                    <button className="bg-blue-400 p-2 rounded-sm text-white hover:bg-blue-500 transition-colors">
                      Update
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 p-2 rounded-sm text-white hover:bg-red-600 transition-colors"
                    onClick={() => handleDelete(data._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default User;

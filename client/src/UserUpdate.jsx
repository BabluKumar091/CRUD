import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserUpdate = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/getUser/"+id)
        .then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setEmail(res.data.email);
            setAge(res.data.age);
        }).catch((err) => {
            console.error("Error fetching users", err);
        });
    }, [])

    const updateUser = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3000/updateUser/"+id, {
            name,
            email,
            age
        }).then(() => {
            alert("User Updated Successfully");
            navigate("/");
        }).catch((err) => {
            console.error("Error updating user", err);
        });
    }
  return (
     <>
            <div className='container flex justify-center mx-auto'>
                <div className='w-1/2 bg-white rounded-lg shadow-lg p-6 mt-10'>
                    <form onSubmit={updateUser}>
                        <h2 className='text-xl font-bold'>Update User</h2>
                        <div className='mt-4'>
                            <label className='block'>Name</label>
                            <input type="text" className='w-full border border-gray-300 p-2 rounded-lg mt-1' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='mt-4'>
                            <label className='block'>Email</label>
                            <input type="email" className='w-full border border-gray-300 p-2 rounded-lg mt-1' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='mt-4'>
                            <label className='block'>Age</label>
                            <input type="number" className='w-full border border-gray-300 p-2 rounded-lg mt-1' value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <button className='bg-green-500 p-2 rounded-sm text-black mt-4 cursor-pointer'>Update</button>
                    </form>

                </div>
            </div>
        </>
  )
}

export default UserUpdate
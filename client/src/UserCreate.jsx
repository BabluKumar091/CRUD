import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/createUser", {
            name,
            email,
            age
        }).then(() => {
            alert("User Created Successfully");
            navigate("/");
        }).catch((err) => {
            console.error("Error creating user", err);
        });
    }
    return (
        <>
            <div className='container flex justify-center mx-auto'>
                <div className='w-1/2 bg-white rounded-lg shadow-lg p-6 mt-10'>
                    <form onSubmit={Submit} action='./'>
                        <h2 className='text-xl font-bold'>Add User</h2>
                        <div className='mt-4'>
                            <label className='block'>Name</label>
                            <input type="text" className='w-full border border-gray-300 p-2 rounded-lg mt-1'  onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className='mt-4'>
                            <label className='block'>Email</label>
                            <input type="email" className='w-full border border-gray-300 p-2 rounded-lg mt-1' onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='mt-4'>
                            <label className='block'>Age</label>
                            <input type="number" className='w-full border border-gray-300 p-2 rounded-lg mt-1' onChange={(e) => setAge(e.target.value)}/>
                        </div>
                        <button type='submit' className='bg-green-500 p-2 rounded-sm text-black mt-4 cursor-pointer'>Submit</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default UserCreate
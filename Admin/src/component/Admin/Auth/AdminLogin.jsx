import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Context } from '../../../main';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/admin/login', { email, password }, { headers: { "Content-Type": "application/json" }, withCredentials: true });
            setUser(data.user);
            setIsAuthorized(true);
            setEmail("");
            setPassword("");
            toast.success("Login Done!!");
        } catch (error) {
            console.log(error);
            toast.error("Login Failed");
        }
    };

  
    if (!isAuthorized) {
        return <Navigate to="/admin"  />;
    }

    return (


        <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494783367193-149034c05e8f')" }}
      >
        <form onSubmit={handleSubmit} className="space-y-6 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className='text-2xl text-center font-bold text-gray-900 mb-4'>Admin Login Only</h2>
          <div className="border border-gray-300 bg-red-50 p-4 rounded-lg">
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="border border-gray-300 bg-red-50 p-4 rounded-lg">
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Submit
          </button>
        </form>
      </div>
      

  );

}

export default AdminLogin;

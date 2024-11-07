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

  
    if (isAuthorized) {
        return <Navigate to="/admin"  />;
    }

    return (
        <div className='flex justify-center items-center my-auto max-w-sm'>
            <form onSubmit={handleSubmit}>
                <div className='border bg-red-500'>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='border bg-red-500'>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default AdminLogin;

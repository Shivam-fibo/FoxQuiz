import React, { useContext, useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {  setIsAuthorized, setUser, setUserToken } = useContext(Context);

  const [redirect, setRedirect] = useState(false);

  
  useEffect(() => {
    const storedToken = sessionStorage.getItem("accessToken");
    if (storedToken) {
      setIsAuthorized(true);
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setUserToken(storedToken);
      setRedirect(true); 
    }
  }, [setIsAuthorized, setUser, setUserToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);

      // Store data in sessionStorage
      sessionStorage.setItem("accessToken", data.data.accessToken);
      sessionStorage.setItem("user", JSON.stringify(data.data.user));

      // Set context state
      setUser(data.data.user);
      setUserToken(data.data.accessToken);
      setIsAuthorized(true);

      setEmail("");
      setPassword("");

      setRedirect(true); 
      console.log(data)
    } catch (error) {
      console.log("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };


  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow-lg dark:border dark:border-gray-700 sm:max-w-md xl:p-0 dark:bg-gray-800">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Login to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
          
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                required
              />
              <MdOutlineMailOutline className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                required
              />
              <RiLock2Fill className="absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-gray-900 hover:bg-gray-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-600">
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? 
            <Link to="/register" className="font-medium text-gray-900 hover:underline dark:text-gray-100">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

  );
};

export default Login;

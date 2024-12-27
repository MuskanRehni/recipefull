import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data  = await axios.post('http://localhost:5000/api/users/login', { email, password });
        localStorage.setItem('authToken', data.token); // Save JWT token to local storage
        navigate('/'); // Redirect to home page after login
      } else {
        await axios.post('http://localhost:5000/api/users/register', { email, password, firstName, lastName });
        setIsLogin(true); // Switch to login form after successful signup
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <>
              <div className="mb-6">
                <label htmlFor="firstName" className="block mb-2 font-medium">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-3 border rounded"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="lastName" className="block mb-2 font-medium">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-3 border rounded"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

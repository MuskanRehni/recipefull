import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-3 border rounded"
                placeholder="Confirm your password"
              />
            </div>
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

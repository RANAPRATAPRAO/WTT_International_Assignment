import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateUsername = (name) => {
    // Ensure username doesn't contain numbers
    return !/\d/.test(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUsername(username)) {
      setError('Username should not contain numbers');
      return;
    }
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <motion.div
      className="w-full max-w-sm p-6 bg-black rounded-lg shadow-2xl shadow-gray-800"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </motion.div>
  );
};

export default Login;


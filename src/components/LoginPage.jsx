import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, UserIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const validateUsername = (name) => {
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
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dark/Light Mode Toggle */}
      <motion.button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-3 rounded-full shadow-xl z-50 ${
          isDarkMode
            ? 'bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
            : 'bg-gradient-to-br from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-200" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-800" />
        )}
      </motion.button>

      <motion.div
        className={`w-full max-w-sm p-8 rounded-2xl backdrop-blur-lg border ${
          isDarkMode
            ? 'bg-gray-800/30 border-gray-700'
            : 'bg-white/30 border-gray-200'
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Welcome Message */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to WTT International
          </h1>
          <p className={`mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Please log in to access the dashboard
          </p>
        </motion.div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Username
            </label>
            <motion.div
              className={`flex items-center p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700/30 border-gray-600'
                  : 'bg-gray-100/50 border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <UserIcon className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full bg-transparent focus:outline-none ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
                placeholder="Enter your username"
              />
            </motion.div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <motion.div
              className={`flex items-center p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700/30 border-gray-600'
                  : 'bg-gray-100/50 border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <LockClosedIcon className={`h-5 w-5 mr-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-transparent focus:outline-none ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
                placeholder="Enter your password"
              />
            </motion.div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center p-3 bg-red-500/20 rounded-lg text-red-500 text-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Sign In</span>
            <ArrowRightIcon className="h-4 w-4 mt-0.5" />
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
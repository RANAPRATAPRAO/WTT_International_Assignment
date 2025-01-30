import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, HashtagIcon, ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const MembraneSelection = ({ onSelect }) => {
  const [membranes, setMembranes] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!value || /^[0-9]+$/.test(value)) {
      setMembranes(value);
      setError('');
    } else {
      setError('Please enter a valid number.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (membranes > 0) {
      onSelect(Number(membranes));
      setMembranes('');
    } else {
      setError('Please enter a number greater than 0.');
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
        className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-lg border ${
          isDarkMode
            ? 'bg-gray-800/30 border-gray-700 hover:border-purple-500'
            : 'bg-white/30 border-gray-200 hover:border-blue-400'
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className={`absolute -inset-8 opacity-20 blur-xl ${
            isDarkMode ? 'bg-purple-500/30' : 'bg-blue-400/30'
          }`} />
        </div>

        {/* Header */}
        <motion.div
          className="text-center mb-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Membrane Selection
          </h1>
          <motion.p
            className={`mt-3 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            Enter the number of membranes to monitor
          </motion.p>
        </motion.div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div>
            <motion.div
              className={`flex items-center p-3 rounded-lg border transition-all ${
                isDarkMode
                  ? 'bg-gray-700/30 border-gray-600'
                  : 'bg-gray-100/50 border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <HashtagIcon className={`h-5 w-5 mr-3 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <input
                type="text"
                value={membranes}
                onChange={handleInputChange}
                className={`w-full bg-transparent focus:outline-none placeholder-${
                  isDarkMode ? 'gray-500' : 'gray-400'
                } ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
                placeholder="Enter number of membranes"
              />
            </motion.div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center p-3 bg-red-500/20 rounded-lg text-red-500 text-sm gap-2"
              >
                <ExclamationCircleIcon className="h-5 w-5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl hover:shadow-lg relative overflow-hidden transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Proceed</span>
            <ArrowRightIcon className="h-4 w-4 mt-0.5 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-20 transition-opacity" />
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MembraneSelection;
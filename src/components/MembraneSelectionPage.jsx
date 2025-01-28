import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MembraneSelection = ({ onSelect }) => {
  const [membranes, setMembranes] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Validate that input is a number
    if (!value || /^[0-9]+$/.test(value)) {
      setMembranes(value);
      setError(''); // Clear error if valid
    } else {
      setError('Please enter a valid number.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (membranes > 0) {
      onSelect(Number(membranes));
      setMembranes(''); // Reset the input field
    } else {
      setError('Please enter a number greater than 0.');
    }
  };

  return (
    <motion.div
      className="w-full max-w-md p-6 bg-gray-900 text-white rounded-lg shadow-md"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center mb-6">Membrane Selection</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Number of Membranes</label>
          <input
            type="text"
            value={membranes}
            onChange={handleInputChange}
            placeholder="Enter number of membranes"
            className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded hover:from-purple-600 hover:to-pink-600 transition-colors"
        >
          Proceed
        </button>
      </form>
    </motion.div>
  );
};

export default MembraneSelection;

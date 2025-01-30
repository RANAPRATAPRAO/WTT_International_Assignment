import React, { useEffect, useState } from 'react';
import { generateRandomValue } from '../utils/GenerateRandomData';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, ArrowPathIcon, BeakerIcon, ClockIcon, ChartBarIcon, TruckIcon, SwatchIcon } from '@heroicons/react/24/solid';

const Dashboard = ({ membranes }) => {
  const [liveData, setLiveData] = useState([]);
  const [inputs, setInputs] = useState({ ActualCIPHours: '', CirculationSetTime: '', SoakingSetTime: '' });
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const data = Array.from({ length: membranes }, (_, index) => ({
        NTFlowLive: generateRandomValue(10, 100),
        NTPHLive: generateRandomValue(6, 9),
        PreInletPressure: generateRandomValue(20, 40),
        PreOutletPressure: generateRandomValue(10, 30),
        TotalMembraneWeight: generateRandomValue(50, 200),
        CirculationLiveTime: generateRandomValue(0, 24),
        SoakingLiveTime: generateRandomValue(0, 12),
        ActualCIPHours: inputs.ActualCIPHours || '-',
        CirculationSetTime: inputs.CirculationSetTime || '-',
        SoakingSetTime: inputs.SoakingSetTime || '-'
      }));
      setLiveData(data);
    }, 1000);

    return () => clearInterval(interval);
  }, [membranes, inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const metricIcons = {
    NTFlowLive: <ArrowPathIcon className="w-5 h-5 mr-2" />,
    NTPHLive: <SwatchIcon className="w-5 h-5 mr-2" />,
    PreInletPressure: <ChartBarIcon className="w-5 h-5 mr-2" />,
    PreOutletPressure: <ChartBarIcon className="w-5 h-5 mr-2" />,
    TotalMembraneWeight: <TruckIcon className="w-5 h-5 mr-2" />,
    CirculationLiveTime: <ClockIcon className="w-5 h-5 mr-2" />,
    SoakingLiveTime: <BeakerIcon className="w-5 h-5 mr-2" />
  };

  return (
    <motion.div
      className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Dark/Light Mode Toggle */}
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

      {/* Animated Title */}
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Membrane Performance Dashboard
      </motion.h1>

      {/* Glassmorphic Input Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 mx-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {Object.entries(inputs).map(([key, value], index) => (
          <motion.div
            key={key}
            className={`backdrop-blur-lg rounded-xl p-1 shadow-lg ${
              isDarkMode 
                ? 'bg-gray-800/30 border border-gray-700' 
                : 'bg-white/30 border border-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center p-3">
              <BeakerIcon className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <input
                type="number"
                name={key}
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                className={`w-full bg-transparent focus:outline-none text-lg ${
                  isDarkMode ? 'text-gray-200 placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                }`}
                value={value}
                onChange={handleInputChange}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <AnimatePresence>
          {liveData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group backdrop-blur-lg rounded-2xl p-6 shadow-xl ${
                isDarkMode 
                  ? 'bg-gray-800/30 border border-gray-700 hover:border-purple-500' 
                  : 'bg-white/30 border border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-purple-400' : 'text-blue-600'
                }`}>
                  Membrane #{index + 1}
                </h2>
                <div className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-purple-500/20' : 'bg-blue-500/20'
                }`}>
                  <TruckIcon className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-blue-500'}`} />
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(data).map(([key, value]) => (
                  <motion.div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-400/10 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <span className={`mr-2 ${isDarkMode ? 'text-purple-400' : 'text-blue-500'}`}>
                        {metricIcons[key]}
                      </span>
                      <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <span className={`font-semibold text-lg ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {typeof value === 'number' ? Math.round(value * 10) / 10 : value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Dashboard;
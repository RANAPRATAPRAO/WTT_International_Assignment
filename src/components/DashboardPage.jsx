import React, { useEffect, useState } from 'react';
import { generateRandomValue } from '../utils/GenerateRandomData';
import { motion } from 'framer-motion';

const Dashboard = ({ membranes }) => {
  const [liveData, setLiveData] = useState([]);
  const [inputs, setInputs] = useState({ ActualCIPHours: '', CirculationSetTime: '', SoakingSetTime: '' });

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

  return (
    <motion.div
      className="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-100">Dashboard</h1>
      
      {/* Input fields section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <input
          type="number"
          name="ActualCIPHours"
          placeholder="Actual CIP Hours"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
          value={inputs.ActualCIPHours}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="CirculationSetTime"
          placeholder="Circulation Set Time"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
          value={inputs.CirculationSetTime}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="SoakingSetTime"
          placeholder="Soaking Set Time"
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200"
          value={inputs.SoakingSetTime}
          onChange={handleInputChange}
        />
      </div>

      {/* Table section */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border animate-fadeIn">
          <thead>
            <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100">
              <th className="p-2 border">Membrane</th>
              <th className="p-2 border">NT Flow Live</th>
              <th className="p-2 border">NT pH Live</th>
              <th className="p-2 border">Pre-Inlet Pressure</th>
              <th className="p-2 border">Pre-Outlet Pressure</th>
              <th className="p-2 border">Total Membrane Weight</th>
              <th className="p-2 border">Circulation Live Time</th>
              <th className="p-2 border">Soaking Live Time</th>
              <th className="p-2 border">Actual CIP Hours</th>
              <th className="p-2 border">Circulation Set Time</th>
              <th className="p-2 border">Soaking Set Time</th>
            </tr>
          </thead>
          <tbody>
            {liveData.map((data, index) => (
              <motion.tr
                key={index}
                className="odd:bg-gray-800 even:bg-gray-700 text-gray-200 hover:bg-gray-600"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <td className="p-2 border font-medium text-blue-400">{index + 1}</td>
                <td className="p-2 border">{data.NTFlowLive}</td>
                <td className="p-2 border">{data.NTPHLive}</td>
                <td className="p-2 border">{data.PreInletPressure}</td>
                <td className="p-2 border">{data.PreOutletPressure}</td>
                <td className="p-2 border">{data.TotalMembraneWeight}</td>
                <td className="p-2 border">{data.CirculationLiveTime}</td>
                <td className="p-2 border">{data.SoakingLiveTime}</td>
                <td className="p-2 border">{data.ActualCIPHours}</td>
                <td className="p-2 border">{data.CirculationSetTime}</td>
                <td className="p-2 border">{data.SoakingSetTime}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Dashboard;

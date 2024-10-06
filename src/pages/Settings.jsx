import React from 'react';

const Settings = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Sensitivity Control</h3>
        <input type="range" className="w-full" min="1" max="100" />

        <h3 className="text-xl font-semibold mt-4 mb-2">Alert Frequency</h3>
        <select className="w-full p-2 border rounded">
          <option>Every 5 minutes</option>
          <option>Every 10 minutes</option>
          <option>Every 15 minutes</option>
        </select>

        <h3 className="text-xl font-semibold mt-4 mb-2">Camera Settings</h3>
        <input type="text" className="w-full p-2 border rounded" placeholder="Camera Resolution" />
      </div>
    </div>
  );
};

export default Settings;

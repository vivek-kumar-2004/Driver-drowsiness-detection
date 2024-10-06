import React, { useState } from 'react';
import CameraFeed from '../components/CameraFeed';

const Dashboard = () => {
  const [drowsinessPrediction, setDrowsinessPrediction] = useState(null); // State for prediction

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Live Camera Feed */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Live Camera Feed</h3>
          <CameraFeed setDrowsinessPrediction={setDrowsinessPrediction} /> {/* Pass state updater function */}
        </div>

        {/* Drowsiness Indicator */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Drowsiness Indicator</h3>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full border-4 border-green-400 flex items-center justify-center text-lg">
              {/* Display the prediction value */}
              {drowsinessPrediction !== null ? (
                <span>{Math.round(drowsinessPrediction * 100)}%</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            <div>
              {drowsinessPrediction !== null && drowsinessPrediction > 0.5 ? ( // Adjust the threshold as necessary
                <p className="text-lg font-bold text-red-600">Driver is Drowsy</p>
              ) : (
                <p className="text-lg font-bold text-green-600">Driver is Alert</p>
              )}
              <p className="text-gray-500">Last checked: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <div className="bg-white mt-4 p-4 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Alerts</h3>
        {drowsinessPrediction > 0.5 ? (
          <p className="text-red-600">Drowsiness detected! Take action!</p>
        ) : (
          <p className="text-yellow-600">No drowsiness detected yet!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

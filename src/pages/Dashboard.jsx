import React, { useEffect, useState } from 'react';
import CameraFeed from '../components/CameraFeed';

const Dashboard = () => {
  const [drowsinessPrediction, setDrowsinessPrediction] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (drowsinessPrediction !== null) {
      setLoading(false);  // Set loading to false once data is received
    }
  }, [drowsinessPrediction]);

  return (
    <div className="container mx-auto mt-8 p-4 bg-[#F8E4EB] ">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">Driver Drowsiness Detection Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Camera Feed */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col">
          <CameraFeed setDrowsinessPrediction={setDrowsinessPrediction} />
        </div>

        {/* Drowsiness Indicator */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Drowsiness Indicator</h3>
          <div className="flex items-center justify-center flex-grow">
            <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center border-4 transition-all duration-300 
                            ${loading ? 'border-gray-400 animate-spin' : (drowsinessPrediction > 0.6 ? 'border-red-800' : 'border-green-600')}`}>
              {loading ? (
                <span className="text-lg text-gray-500">Loading...</span>
              ) : (
                <span className="text-2xl font-bold">{Math.round(drowsinessPrediction * 100)}%</span>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            {drowsinessPrediction !== null && !loading && (
              <p className={`text-xl font-bold ${drowsinessPrediction > 0.6 ? 'text-red-800' : 'text-green-600'}`}>
                {drowsinessPrediction > 0.6 ? 'Driver is Drowsy' : 'Driver is Alert'}
              </p>
            )}
            <p className="text-gray-500">Last checked: {loading ? '...' : new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <div className="bg-gray-100 mt-6 p-6 rounded-lg shadow-lg border border-gray-200 w-full mb-[19%]">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Alerts</h3>
        <p className={`text-lg font-bold ${drowsinessPrediction > 0.6 ? 'text-red-800' : 'text-yellow-600'}`}>
          {drowsinessPrediction > 0.6 ? 'Drowsiness detected! Please take action!' : 'No drowsiness detected yet.'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

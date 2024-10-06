import React from 'react';

const Help = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Help</h2>

      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
        <p className="text-gray-700">How does the system detect drowsiness?</p>
        <p className="text-gray-500 mb-4">The system uses a camera to track eye movements...</p>

        <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
        <p className="text-gray-500">If you need help, contact us at support@drowsiness-system.com.</p>
      </div>
    </div>
  );
};

export default Help;

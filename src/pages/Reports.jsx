import React from 'react';

const Reports = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      <div className="bg-white p-4 shadow-lg rounded-lg overflow-x-auto">
        <h3 className="text-xl font-semibold mb-2">Drowsiness History</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Action Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">2024-10-06</td>
              <td className="border px-4 py-2">10:30 AM</td>
              <td className="border px-4 py-2">5 minutes</td>
              <td className="border px-4 py-2">Driver Stopped</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

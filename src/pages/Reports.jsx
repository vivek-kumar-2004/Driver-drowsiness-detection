import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Reports = () => {
  // State to hold the drowsiness reports
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch reports from the backend
  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_reports');
      setReports(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reports');
      toast.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch reports when the component mounts
  useEffect(() => {
    fetchReports();
  }, []);

  // Function to reset reports
  const resetReports = async () => {
    try {
      await axios.delete('http://localhost:5000/reset_reports');
      fetchReports(); // Refresh the reports after resetting
      toast.success("Reports reset successfully");
    } catch (err) {
      setError('Failed to reset reports');
      toast.error("Failed to reset reports");
    }
  };

  // Function to reset the entire database
  const resetDatabase = async () => {
    try {
      await axios.delete('http://localhost:5000/reset_database');
      fetchReports(); // Refresh the reports after resetting
      toast.success("Database reset successfully");
    } catch (err) {
      setError('Failed to reset database');
      toast.error("Failed to reset database");
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-black mb-4">Drowsiness Reports</h2>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="mb-4 flex flex-col md:flex-row md:justify-start md:space-x-2">
            <button
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded shadow-md hover:bg-red-700 transition duration-300 mb-2 md:mb-0" // Add margin bottom on mobile
              onClick={resetReports}
            >
              Reset Reports
            </button>
            <button
              className="bg-red-700 text-white font-semibold px-4 py-2 rounded shadow-md hover:bg-red-800 transition duration-300"
              onClick={resetDatabase}
            >
              Reset Database
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-red-900 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Action Taken</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="border px-4 py-2 text-center">Loading...</td>
                  </tr>
                ) : reports.length > 0 ? (
                  reports.map((report, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{report.date}</td>
                      <td className="border px-4 py-2">{report.time}</td>
                      <td className="border px-4 py-2">{report.duration}</td>
                      <td className="border px-4 py-2">{report.action}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border px-4 py-2 text-center">No reports available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

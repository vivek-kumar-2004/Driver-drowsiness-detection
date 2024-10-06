import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Importing icons from Heroicons v2
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Optionally close the menu when a link is clicked
  };

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img
            src="https://ideogram.ai/assets/image/lossless/response/JDC37BrSQRKL6eyWk2LCiQ" // Replace with your logo image path
            alt="Logo"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold text-gray-800">Driver Drowsiness Detection</h1>
        </div>

        {/* Links for larger screens */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              onClick={() => handleLinkClick('Dashboard')}
              className={`text-gray-600 font-semibold hover:text-blue-500 transition duration-200 relative ${activeLink === 'Dashboard' ? 'font-bold text-blue-500' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              onClick={() => handleLinkClick('Settings')}
              className={`text-gray-600 font-semibold hover:text-blue-500 transition duration-200 relative ${activeLink === 'Settings' ? 'font-bold text-blue-500' : ''}`}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              onClick={() => handleLinkClick('Reports')}
              className={`text-gray-600 font-semibold hover:text-blue-500 transition duration-200 relative ${activeLink === 'Reports' ? 'font-bold text-blue-500' : ''}`}
            >
              Reports
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              onClick={() => handleLinkClick('Help')}
              className={`text-gray-600 font-semibold hover:text-blue-500 transition duration-200 relative ${activeLink === 'Help' ? 'font-bold text-blue-500' : ''}`}
            >
              Help
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <li>
            <Link
              to="/"
              onClick={() => handleLinkClick('Dashboard')}
              className={`text-gray-600 font-semibold hover:text-blue-500 transition duration-200 relative ${activeLink === 'Dashboard' ? 'font-bold text-blue-500' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              onClick={() => handleLinkClick('Settings')}
              className={`text-gray-600 font-semibold hover:text-blue-500 transition duration-200 relative ${activeLink === 'Settings' ? 'font-bold text-blue-500' : ''}`}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              onClick={() => handleLinkClick('Reports')}
              className={`text-gray-600 font-semibold hover:text-blue-500 transition duration-200 relative ${activeLink === 'Reports' ? 'font-bold text-blue-500' : ''}`}
            >
              Reports
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              onClick={() => handleLinkClick('Help')}
              className={`text-gray-600 font-semibold hover:text-blue-500 transition duration-200 relative ${activeLink === 'Help' ? 'font-bold text-blue-500' : ''}`}
            >
              Help
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

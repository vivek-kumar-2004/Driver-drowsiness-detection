import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#4F0341] shadow-lg p-4 mb-[-2%]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="https://ideogram.ai/assets/image/lossless/response/JDC37BrSQRKL6eyWk2LCiQ" 
            alt="Logo"
            className="h-10 w-10 rounded-full shadow-lg"
          />
          <h1 className="text-2xl font-bold text-white">Driver Drowsiness Detection</h1>
        </div>

        {/* Links for larger screens */}
        <ul className="hidden md:flex space-x-8 ">
          {['Dashboard', 'Reports', 'Help'].map((link) => (
            <li key={link}>
              <Link
                to={`/${link.toLowerCase()}`}
                onClick={() => handleLinkClick(link)}
                className={`text-white font-semibold hover:text-yellow-400 transition duration-300 relative ${activeLink === link ? 'font-bold underline' : ''}`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden " >
          <button onClick={toggleMenu}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-[#4F0341] rounded-lg p-4 ">
          {['Dashboard', 'Reports', 'Help'].map((link) => (
            <li key={link}>
              <Link
                to={`/${link.toLowerCase()}`}
                onClick={() => handleLinkClick(link)}
                className={`text-white font-semibold hover:text-yellow-400 transition duration-300 relative ${activeLink === link ? 'font-bold underline' : ''}`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

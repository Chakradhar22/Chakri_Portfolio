import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Toggle from './ThemeToggle';
import LightLogo from '../assets/images/light_icon.png';
import DarkLogo from '../assets/images/dark_icon.png';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768); // Sidebar opens for tablets and larger screens
  const [logoSrc, setLogoSrc] = useState(LightLogo);

  const handleSidebarToggle = () => {
    // Allow sidebar toggle only for mobile view (screen width < 768px)
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  useEffect(() => {
    // Function to update the logo based on the theme
    const updateLogo = () => {
      if (document.documentElement.classList.contains('dark')) {
        setLogoSrc(DarkLogo);
      } else {
        setLogoSrc(LightLogo);
      }
    };

    // Initial theme check
    updateLogo();

    // Listen for theme changes
    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Handle window resize to dynamically adjust sidebar based on screen width
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Open sidebar on tablets and larger screens
      } else {
        setSidebarOpen(false); // Close sidebar on mobile view
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 w-full flex justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={handleSidebarToggle}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <img src={logoSrc} alt="Logo" className="h-10 pl-4" />
          </div>
          <div>
            <Toggle />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />

      {/* Page Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

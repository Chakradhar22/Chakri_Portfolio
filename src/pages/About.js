import React, { useState, useEffect } from 'react';
import { fetchAboutData, fetchGlobalData } from '../data';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [globalData, setGlobalData] = useState(null);

  // Fetch both About and Global data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch About and Global data concurrently
        const [fetchedAboutData, fetchedGlobalData] = await Promise.all([
          fetchAboutData(),
          fetchGlobalData(),
        ]);

        // Set the fetched data in the state
        setAboutData(fetchedAboutData);
        setGlobalData(fetchedGlobalData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="about-container container mx-auto p-6 md:p-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md min-h-screen overflow-x-hidden z-10">
      {/* Heading Section */}
      <div className="heading-section text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white underline decoration-gray-400">
          About
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="text-section md:w-1/2 p-4">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">
            {aboutData && aboutData["Description1"]}
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">
            {aboutData && aboutData["Description2"]}
          </p>

          {/* Academic Details Section */}
          <div className="academic-details mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Academic Details
            </h2>
            {aboutData && aboutData["AcademicDetails"] && (
              <>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Degree:</strong> {aboutData["AcademicDetails"]["Degree"]}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Institution:</strong> {aboutData["AcademicDetails"]["Institution"]}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Year:</strong> {aboutData["AcademicDetails"]["Year"]}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Marks:</strong> {aboutData["AcademicDetails"]["Marks"]}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Description:</strong> {aboutData["AcademicDetails"]["Description"]}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="image-section md:w-1/2 p-4">
          <img
            src={globalData && globalData["main_bg"]}
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

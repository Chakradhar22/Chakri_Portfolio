import React, { useEffect, useState } from 'react';
import { fetchCertificationsData } from '../data'; // Importing data fetching function

const CertificationCard = ({ certification }) => (
  <div className="border rounded-lg shadow-md p-6 bg-white dark:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
    <img
      src={certification.imageUrl}
      alt={certification.name}
      className="w-full h-40 object-cover mb-4 rounded-lg"
    />
    <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{certification.name}</h2>
    <a
      href={certification.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-blue-500 dark:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition-colors hover:bg-blue-600 dark:hover:bg-blue-500"
    >
      View Certification
    </a>
  </div>
);

const Certifications = () => {
  const [certificationsData, setCertificationsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchCertificationsData(); // Fetching data
      setCertificationsData(fetchedData.certifications); // Ensure correct structure
    };
    getData();
  }, []);

  return (
    <div className="certifications-container container mx-auto p-6 md:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-md min-h-screen overflow-x-hidden z-10">
      <div className="heading-section text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white underline decoration-gray-400">
          Certifications
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.length > 0 ? (
          certificationsData.map((certification) => (
            <CertificationCard key={certification.id} certification={certification} />
          ))
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
            No certifications available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Certifications;

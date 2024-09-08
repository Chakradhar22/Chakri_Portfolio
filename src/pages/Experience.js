import React, { useState, useEffect } from 'react';
import { fetchExperiencesData } from '../data';

const ExperiencePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchExperiencesData();
        setData(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error fetching data: {error.message}</div>;
  }

  return (
    <div className="experience-container container mx-auto p-6 md:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-md min-h-screen overflow-x-hidden z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white underline decoration-gray-400">
          Experience
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {data.experiences.map((experience) => (
          <div
            key={experience.id}
            className="experience-card border rounded-lg shadow-md p-6 bg-white dark:bg-gray-700 transition-transform transform hover:scale-105 duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{experience.role}</h2>
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">{experience.company}</p>
            <p className="text-gray-500 dark:text-gray-400 italic mb-4">{experience.duration}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{experience.description}</p>
            <div className="flex flex-wrap space-x-4">
              {experience.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;

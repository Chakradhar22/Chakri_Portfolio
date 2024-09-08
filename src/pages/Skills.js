import React, { useState, useEffect } from 'react';
import { fetchSkillsData } from '../data'; // Assume this fetches data from an API or a file

const SkillBar = ({ name, percentage }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="font-semibold text-gray-900 dark:text-white">{name}</span>
      <span className="text-gray-700 dark:text-gray-300">{percentage}%</span>
    </div>
    <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-400 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchSkillsData();
        setSkills(fetchedData.skills); // Assuming the response has a `skills` key
      } catch (err) {
        setError('Failed to fetch skills data');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div className="text-center text-gray-700 dark:text-gray-300">Loading skills...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="skills-container container mx-auto p-6 md:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-md min-h-screen overflow-x-hidden z-10">
      <div className="heading-section text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white underline decoration-gray-400">
          Skills
        </h1>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <SkillBar key={skill.id} name={skill.name} percentage={skill.percentage} />
          ))
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No skills data found.</p>
        )}
      </div>
    </div>
  );
};

export default Skills;

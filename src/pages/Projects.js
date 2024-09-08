import React, { useState, useEffect } from 'react';
import { fetchProjectsData } from '../data'; // Assuming this is your data fetching function

const ProjectCard = ({ project }) => {
    return (
      <div className="relative overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105 bg-white dark:bg-gray-700 hover:shadow-lg hover:shadow-indigo-500/50">
        {/* Image */}
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
  
        {/* Content */}
        <div className="p-6">
          {/* Name */}
          <h2 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
            {project.name}
          </h2>
  
          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {project.description}
          </p>
  
          {/* Category */}
          <span className="inline-block bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {project.category}
          </span>
  
          {/* Button */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            View Project
          </a>
        </div>
      </div>
    );
  };
  

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project data on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchProjectsData();
        const projectsData = fetchedData.projects;

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(projectsData.map((project) => project.category))];

        setProjects(projectsData);
        setFilteredProjects(projectsData);
        setCategories(uniqueCategories);
      } catch (error) {
        setError('Failed to fetch projects data');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Filter projects when search query or category changes
  useEffect(() => {
    const filterProjects = () => {
      let filtered = projects;

      // Search filter
      if (searchQuery) {
        filtered = filtered.filter((project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Category filter
      if (selectedCategory !== 'All') {
        filtered = filtered.filter((project) => project.category === selectedCategory);
      }

      setFilteredProjects(filtered);
    };

    filterProjects();
  }, [searchQuery, selectedCategory, projects]);

  if (loading) return <div className="text-center text-gray-700 dark:text-gray-300">Loading projects...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!projects.length) return <div className="text-center text-gray-700 dark:text-gray-300">No projects available.</div>;

  return (
    <div className="projects-container container mx-0 my-0 p-6 md:p-12 bg-white-50 dark:bg-gray-800 rounded-lg shadow-md min-h-screen overflow-x-hidden z-10">
      {/* Heading Section */}
      <div className="heading-section text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white underline decoration-gray-400">
          Projects
        </h1>
      </div>

      {/* Search Bar */}
      <div className="search-section mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-md p-3 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
        />
      </div>
      {/* Category Filter (Grid of buttons with dynamic width) */}
<div className="filter-section mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`inline-block px-4 py-2 rounded-md border whitespace-nowrap ${
        selectedCategory === category
          ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white'
          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300'
      } border-gray-300 dark:border-gray-600 text-center`}
    >
      {category}
    </button>
  ))}
</div>


      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;

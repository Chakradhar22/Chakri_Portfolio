import React, { useEffect, useState } from 'react';
import { fetchProfilesData } from '../data';

const ProfileCard = ({ profile }) => (
  <div className="border rounded-lg shadow-md p-6 bg-white dark:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
    <img
      src={profile.imageUrl}
      alt={profile.name}
      className="w-full h-40 object-cover mb-4 rounded-lg"
    />
    <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{profile.name}</h2>
    <a
      href={profile.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-blue-500 dark:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md transition-colors hover:bg-blue-600 dark:hover:bg-blue-500"
    >
      View Profile
    </a>
  </div>
);

const BadgeCard = ({ badge }) => (
  <div className="border rounded-lg shadow-md p-6 bg-white dark:bg-gray-700 transition-transform transform hover:scale-105 duration-300">
    <img
      src={badge.imageUrl}
      alt={badge.name}
      className="w-full h-40 object-cover mb-4 rounded-lg"
    />
    <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{badge.name}</h2>
    <a
      href={badge.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-green-500 dark:bg-green-400 text-white font-semibold py-2 px-4 rounded-md transition-colors hover:bg-green-600 dark:hover:bg-green-500"
    >
      Verify Badge
    </a>
  </div>
);

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchProfilesData();
        setProfiles(fetchedData.profiles || []);
        setBadges(fetchedData.badges || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
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
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="profiles-container container mx-auto p-6 md:p-12 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md min-h-screen overflow-x-hidden z-10">
      <div className="heading-section text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white underline decoration-gray-400">
          Coding Profiles
        </h1>
      </div>

      {/* Coding Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      <div className="heading-section text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white underline decoration-gray-400">
          Badges
        </h1>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
};

export default ProfilesPage;

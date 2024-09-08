import React, { useState, useEffect } from 'react';
import LightLogo from '../assets/images/developer-dark.svg';
import DarkLogo from '../assets/images/developer.svg';
import Typewriter from '../components/Typewriter';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import CustomButton from '../assets/CustomButton';
import Experience from './Experience';  // Import Experience component
import { fetchHomeData } from '../data';

const Home = () => {
  const [data, setData] = useState(null);
  const [logoSrc, setLogoSrc] = useState(LightLogo);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchHomeData();
      setData(fetchedData);
    };
    getData();
  }, []);

  useEffect(() => {
    const updateLogo = () => {
      if (document.documentElement.classList.contains('dark')) {
        setLogoSrc(DarkLogo);
      } else {
        setLogoSrc(LightLogo);
      }
    };

    updateLogo();
    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const texts = data && data['Texts'];

  const handleResumeClick = () => {
    if (data && data['Resume']) {
      window.location.href = data['Resume'];
    }
  };

  return (
    <div>
      <div className="container mx-auto p-1 pt-6 md:p-12 flex flex-col md:flex-row rounded-lg min-h-screen overflow-x-hidden z-10">
        <div className="text-section md:w-1/2 p-4 mx-auto ml-1 mt-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Hi,</h1>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            I am {data && data['Name']}
          </h1>
          <p className="flex flex-row text-lg md:text-xl text-gray-700 dark:text-gray-300 mx-auto">
            <span className="pr-2 text-lg md:text-xl text-gray-700 dark:text-gray-300">A</span>{' '}
            <Typewriter texts={texts} typingSpeed={100} delay={3000} />
          </p>
          <CustomButton onClick={handleResumeClick} label="Get Resume" icon={AiOutlineCloudDownload} />
        </div>

        <div className="image-section md:w-1/2 p-4">
          <img src={logoSrc} alt="Descriptive Alt Text" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="mt-0 w-full"> {/* Reduced margin-top value */}
        <Experience /> {/* Rendering the Experience component below the home section */}
      </div>
    </div>
  );
};

export default Home;

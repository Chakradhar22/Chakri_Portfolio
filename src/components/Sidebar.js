// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineFileSearch, AiFillPieChart, AiOutlineMessage, AiOutlineSafetyCertificate, AiOutlineHome } from 'react-icons/ai'
import { DiCodeBadge} from 'react-icons/di'
import { CgProfile } from 'react-icons/cg'
import {fetchGlobalData} from '../data';

const Sidebar = ({ sidebarOpen, handleSidebarToggle }) => {
  const [data, setData] = useState(null);

  // Fetch data from Firestore on component mount
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchGlobalData();
      setData(fetchedData);
    };
    getData();
  }, []);

  const [open] = useState(true)
  const location = useLocation()
  const Menus = [
    { title: 'Home', path: '/', src: <AiOutlineHome /> },
    { title: 'About', path: '/About', src: <CgProfile /> },
    { title: 'Projects', path: '/Projects', src: <DiCodeBadge /> },
    { title: 'Skills', path: '/Skills', src: <AiFillPieChart /> },
    { title: 'Certifications', path: '/Certifications', src: <AiOutlineSafetyCertificate /> },
    { title: 'Coding Profiles', path: '/Profiles', src: <AiOutlineFileSearch  /> },
    { title: 'Hire Me ', path: '/Contact', src: <AiOutlineMessage /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className={`flex flex-col bg-opacity-25 p-4 rounded-xl mt-20 wl-60 items-center pointer-events-none`}>
            <div className='relative'>
            <img src={data && (data["main_bg"])} alt='' className='pl-0 h-20  rounded-full border-4 border-[#facc15]' />
            <span className='bottom-0 left-14 absolute w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
            </div>
            <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
            {data && (data["Name"])}
              </span>

              <span className='text-xm font-small whitespace-nowrap dark:text-white'>
                FullStack Developer
              </span>

          </div>
      <div className="h-full px-3 py-4 overflow-y-auto">
      <ul className='pt-0'>
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${
                  location.pathname === menu.path &&
                  'bg-gray-200 dark:bg-gray-700'
                }`}
                onClick={handleSidebarToggle}
              >
                <span className='text-2xl'>{menu.src}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                  
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

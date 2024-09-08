import React from 'react';

const CustomButton = ({ onClick, label, icon: Icon }) => {
  return (
    <button
      className='flex flex-row space-x-4 justify-center items-center text-xs md:text-base mt-4 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
      onClick={onClick}
    >
      {/* Render the Icon if it's passed as a prop */}
      {Icon && <Icon className='mr-1 sm:mr-2 text-lg md:text-xl' />}
      {label} {/* Display the button label */}
    </button>
  );
};

export default CustomButton;

// src/icons.js
export const loadIcon = async (iconName) => {
    return (await import('react-icons/fa')).iconName;

};
  
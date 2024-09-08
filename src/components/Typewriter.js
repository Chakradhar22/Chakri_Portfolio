import React, { useState, useEffect } from 'react';

const Typewriter = ({ texts, typingSpeed = 150, delay = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (charIndex < texts[textIndex].length) {
        setDisplayedText((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayedText('');
          setCharIndex(0);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, delay);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, textIndex, texts, typingSpeed, delay]);

  return (
    <div className="text-xl font-mono border-r-4 border-gray-700 pr-2 animate-cursor dark:border-gray-300">
      {displayedText}
    </div>
  );
};

export default Typewriter;
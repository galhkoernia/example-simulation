/*
 * Created on Sat Dec 27 2025
 *
 * Copyright (c) 2025 Your Company
 */

import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);
  
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };
  
  return (
    <div className="flex items-center space-x-2 p-2 bg-surface rounded-lg">
      <button
        onClick={() => toggleTheme('light')}
        className={`p-2 rounded ${theme === 'light' ? 'bg-navy-500 text-white' : 'hover:bg-navy-100'}`}
        title="Light Mode"
      >
        <FaSun />
      </button>
      <button
        onClick={() => toggleTheme('dark')}
        className={`p-2 rounded ${theme === 'dark' ? 'bg-navy-500 text-white' : 'hover:bg-navy-100'}`}
        title="Dark Mode"
      >
        <FaMoon />
      </button>
      <button
        onClick={() => toggleTheme('contrast')}
        className={`p-2 rounded ${theme === 'contrast' ? 'bg-navy-500 text-white' : 'hover:bg-navy-100'}`}
        title="High Contrast"
      >
        <FaAdjust />
      </button>
    </div>
  );
};

export default ThemeToggle;
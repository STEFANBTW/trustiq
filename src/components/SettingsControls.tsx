import React, { useState, useEffect } from 'react';
import { Moon, Sun, Type } from 'lucide-react';

export function SettingsControls() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: light)').matches);
    }
    return false;
  });

  const [isAccessibleFonts, setIsAccessibleFonts] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessibleFonts') === 'true';
    }
    return false;
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    window.dispatchEvent(new Event('theme-changed'));
  };

  const toggleFonts = () => {
    const newFonts = !isAccessibleFonts;
    setIsAccessibleFonts(newFonts);
    if (newFonts) {
      document.documentElement.classList.add('accessible-fonts');
      localStorage.setItem('accessibleFonts', 'true');
    } else {
      document.documentElement.classList.remove('accessible-fonts');
      localStorage.setItem('accessibleFonts', 'false');
    }
    window.dispatchEvent(new Event('font-changed'));
  };

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem('theme') === 'dark');
    };
    const handleFontChange = () => {
      setIsAccessibleFonts(localStorage.getItem('accessibleFonts') === 'true');
    };

    window.addEventListener('theme-changed', handleThemeChange);
    window.addEventListener('font-changed', handleFontChange);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      window.removeEventListener('font-changed', handleFontChange);
    };
  }, []);

  return (
    <div className="flex gap-2">
      <button 
        onClick={toggleTheme}
        className="p-3 bg-bg-secondary border border-border-custom rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:border-accent transition-colors text-text-secondary hover:text-text-primary"
        title="Toggle Theme"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button 
        onClick={toggleFonts}
        className={`p-3 bg-bg-secondary border border-border-custom rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:border-accent transition-colors ${isAccessibleFonts ? 'text-accent border-accent' : 'text-text-secondary hover:text-text-primary'}`}
        title="Toggle Accessible Fonts"
      >
        <Type size={18} />
      </button>
    </div>
  );
}

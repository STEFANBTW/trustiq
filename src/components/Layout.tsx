import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Beer, Menu, X, Moon, Sun, ShoppingCart, Type, UserCircle } from 'lucide-react';
import { UserProfileModal } from './UserProfileModal';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isAccessibleFonts, setIsAccessibleFonts] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessibleFonts') === 'true';
    }
    return false;
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: light)').matches);
    }
    return false;
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isAccessibleFonts) {
      document.documentElement.classList.add('accessible-fonts');
      localStorage.setItem('accessibleFonts', 'true');
    } else {
      document.documentElement.classList.remove('accessible-fonts');
      localStorage.setItem('accessibleFonts', 'false');
    }
  }, [isAccessibleFonts]);

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

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');
    
    if (isAuth) {
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  const navItems = [
    { name: 'Shop', path: '/' },
    { name: 'Fridge', path: '/products' },
    { name: 'Wholesale', path: '/wholesale' },
    { name: 'Meetups', path: '/meetups' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-bg-secondary border-b border-border-custom transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="p-2 bg-accent text-white group-hover:rotate-12 transition-transform shadow-lg shadow-accent/20 rounded-sm">
                <Beer size={24} />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic">Trust Liq Palace</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-2 text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-accent group ${
                    location.pathname === item.path ? 'text-accent' : 'text-text-secondary'
                  }`}
                >
                  {item.name}
                  <motion.div
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-accent origin-left transition-transform duration-300 ${
                      location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                    }`}
                  />
                </Link>
              ))}
              
              <div className="flex items-center gap-4 border-l border-border-custom pl-8 ml-4">
                <Link to="/cart" className="p-2 hover:bg-bg-primary transition-colors text-text-secondary relative group">
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white dark:text-black text-xs font-black flex items-center justify-center rounded-full shadow-lg">0</span>
                </Link>
                <button onClick={handleProfileClick} className="p-2 hover:bg-bg-primary transition-colors text-text-secondary group" aria-label="User Profile">
                  <UserCircle size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Tablet/Mobile Actions */}
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
              <Link to="/cart" className="p-2 text-text-secondary relative group">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white dark:text-black text-xs font-black flex items-center justify-center rounded-full shadow-lg">0</span>
              </Link>
              <button onClick={handleProfileClick} className="p-2 hover:bg-bg-primary transition-colors text-text-secondary" aria-label="User Profile">
                <UserCircle size={20} />
              </button>
              <button 
                className="p-2 text-text-secondary relative z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                  <motion.span 
                    animate={isMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-current rounded-full"
                  />
                  <motion.span 
                    animate={isMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                    className="w-full h-0.5 bg-current rounded-full"
                  />
                  <motion.span 
                    animate={isMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-current rounded-full"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 lg:hidden bg-bg-secondary/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-colors duration-300"
            >
              <div className="flex flex-col items-center gap-8 p-12">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-3xl sm:text-4xl font-black uppercase italic tracking-tighter transition-all hover:text-accent ${
                        location.pathname === item.path ? 'text-accent' : 'text-text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 flex flex-col items-center gap-6"
                >
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="px-12 py-4 btn-cta text-white dark:text-black text-xs font-black uppercase tracking-widest rounded-full shadow-xl shadow-accent/20"
                  >
                    Sign In
                  </Link>
                  <div className="w-12 h-1 bg-accent mb-4" />
                  <p className="text-xs font-bold uppercase tracking-[0.5em] text-text-secondary">Trust The Process</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content - Full Width */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 dark:bg-black text-stone-400 py-12 sm:py-20 border-t border-stone-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 text-white mb-6">
                <Beer size={20} className="text-amber-500" />
                <span className="text-xl font-black uppercase italic">Trust Liq Palace</span>
              </div>
              <p className="text-sm leading-relaxed opacity-70">
                The most trusted spot for your favorite drinks and snacks. Quality you can taste, service you can trust.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-3 text-sm">
                {navItems.map(item => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:text-amber-500 transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Visit Us</h4>
              <p className="text-sm opacity-70">
                Shop No. 3, Grace Plaza<br />
                Beside Rayfield Medical Services<br />
                Jos South, Plateau State, Nigeria<br /><br />
                07033846108<br />
                07069692467
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 text-xs text-center opacity-50">
            &copy; {new Date().getFullYear()} Trust Liq Palace. All rights reserved.
          </div>
        </div>
      </footer>

      {/* User Profile Modal */}
      <UserProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isAccessibleFonts={isAccessibleFonts}
        setIsAccessibleFonts={setIsAccessibleFonts}
      />
    </div>
  );
}

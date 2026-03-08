import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, LogOut, Sun, Moon, Type } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isAccessibleFonts: boolean;
  setIsAccessibleFonts: (value: boolean) => void;
}

export const UserProfileModal = ({ 
  isOpen, 
  onClose,
  isDarkMode,
  setIsDarkMode,
  isAccessibleFonts,
  setIsAccessibleFonts
}: UserProfileModalProps) => {
  // Mock auth state for now
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const currentUser = {
    name: "Guest User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
          onClick={onClose} 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full h-full md:h-auto md:max-h-[80vh] max-w-4xl bg-bg-primary md:border border-border-custom md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-6 right-6 p-3 rounded-full bg-bg-secondary hover:bg-border-custom transition-all z-10 text-text-primary">
            <X className="w-5 h-5" />
          </button>

          {!isAuthenticated ? (
            // Login / Register View
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-y-auto">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.1),transparent_50%)] pointer-events-none" />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-text-primary mb-8 relative z-10">
                {showRegister ? 'Create Account' : 'Welcome Back'}
              </h2>
              <form className="w-full max-w-sm space-y-4 relative z-10" onSubmit={login}>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-bg-secondary border border-border-custom rounded-2xl py-4 px-6 text-text-primary outline-none focus:border-accent transition-colors"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-bg-secondary border border-border-custom rounded-2xl py-4 px-6 text-text-primary outline-none focus:border-accent transition-colors"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="w-full py-4 btn-cta hover:scale-105 hover:brightness-110 active:scale-95 transition-colors rounded-2xl text-white dark:text-black font-black uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  {showRegister ? 'Register' : 'Sign In'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowRegister(!showRegister)}
                  className="text-xs text-text-secondary hover:text-accent font-bold uppercase tracking-widest mt-4 transition-colors"
                >
                  {showRegister ? 'Already have an account? Sign In' : 'Need an account? Register'}
                </button>
              </form>
            </div>
          ) : (
            // Dashboard View
            <div className="flex-1 flex flex-col md:flex-row p-8 md:p-12 overflow-y-auto">
               {/* Profile Sidebar */}
               <div className="w-full md:w-1/3 md:border-r border-border-custom md:pr-12 mb-8 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-32 h-32 rounded-full border-4 border-bg-secondary mb-6 shadow-xl" />
                  <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary">{currentUser.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-accent font-bold mb-8 bg-accent/10 px-3 py-1 rounded-full border border-accent/20 mt-2">Premium Member</p>
                  
                  <div className="flex gap-2 w-full mb-6">
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="flex-1 py-3 bg-bg-primary border border-border-custom rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:border-accent transition-colors text-text-secondary hover:text-text-primary"
                    >
                      {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                      {isDarkMode ? 'Light' : 'Dark'}
                    </button>
                    <button 
                      onClick={() => setIsAccessibleFonts(!isAccessibleFonts)}
                      className={`flex-1 py-3 bg-bg-primary border border-border-custom rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:border-accent transition-colors ${isAccessibleFonts ? 'text-accent border-accent' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                      <Type size={16} />
                      Text
                    </button>
                  </div>

                  <button onClick={logout} className="flex items-center justify-center md:justify-start gap-3 text-red-500 hover:text-red-400 transition-colors text-xs font-black uppercase tracking-widest w-full md:w-auto py-3 md:py-0 bg-red-500/10 md:bg-transparent rounded-xl md:rounded-none">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
               </div>
               {/* Content Area */}
               <div className="flex-1 md:pl-12 flex flex-col">
                  <h4 className="text-xl font-black uppercase italic tracking-tighter text-text-primary mb-8 flex items-center gap-2 border-b border-border-custom pb-4">
                     <ShieldCheck className="w-5 h-5 text-accent" /> Account Dashboard
                  </h4>
                  <div className="space-y-4">
                    <div className="p-6 bg-bg-secondary rounded-2xl border border-border-custom">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">Recent Orders</h5>
                      <p className="text-sm text-text-primary">No recent orders found.</p>
                    </div>
                    <div className="p-6 bg-bg-secondary rounded-2xl border border-border-custom">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">Saved Addresses</h5>
                      <p className="text-sm text-text-primary">No addresses saved.</p>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

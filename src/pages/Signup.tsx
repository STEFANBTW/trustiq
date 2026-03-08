import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, User, ArrowRight, Chrome, Apple } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BackgroundAnimation, AnimationToggle } from '../components/AuthBackground';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bg-animation') !== 'false';
    }
    return true;
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('bg-animation', isAnimationEnabled.toString());
  }, [isAnimationEnabled]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup and auto-login
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'user');
    navigate('/dashboard');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 transition-colors duration-300 cursor-pointer"
      onClick={() => navigate('/')}
    >
      <BackgroundAnimation isEnabled={isAnimationEnabled} />
      <AnimationToggle isEnabled={isAnimationEnabled} onToggle={() => setIsAnimationEnabled(!isAnimationEnabled)} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-[85vh] bg-bg-secondary border border-border-custom rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 overflow-y-auto no-scrollbar cursor-default"
      >
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-3xl text-accent mb-2">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase italic tracking-tighter text-text-primary leading-none">
            Join The <span className="text-accent">Palace</span>
          </h1>
          <p className="text-sm text-text-secondary font-medium">
            Create an account for premium allocations.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bg-primary border border-border-custom rounded-2xl pl-12 pr-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-primary border border-border-custom rounded-2xl pl-12 pr-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-primary border border-border-custom rounded-2xl pl-12 pr-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 btn-cta text-white dark:text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 group"
          >
            Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-custom"></div>
            </div>
            <div className="relative flex justify-center text-xs font-black uppercase tracking-widest">
              <span className="bg-bg-secondary px-4 text-text-secondary">Or Sign Up With</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-bg-primary border border-border-custom rounded-2xl hover:border-accent transition-all text-text-primary">
              <Chrome size={18} /> <span className="text-xs font-black uppercase tracking-widest">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-bg-primary border border-border-custom rounded-2xl hover:border-accent transition-all text-text-primary">
              <Apple size={18} /> <span className="text-xs font-black uppercase tracking-widest">Apple</span>
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-black uppercase tracking-widest text-text-secondary">
          Already have an account? <Link to="/login" className="text-accent hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}

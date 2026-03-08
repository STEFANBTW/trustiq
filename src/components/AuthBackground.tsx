import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export const BackgroundAnimation = ({ isEnabled }: { isEnabled: boolean }) => {
  if (!isEnabled) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none transition-opacity duration-1000">
      <div className="absolute inset-0 bg-bg-primary/40 backdrop-blur-[120px] z-0" />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-soft-light filter blur-[100px] opacity-30 dark:opacity-20"
          style={{
            width: `${Math.random() * 40 + 30}vw`,
            height: `${Math.random() * 40 + 30}vw`,
            backgroundColor: i % 2 === 0 ? 'var(--accent)' : '#6366f1',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 200, 0],
            y: [0, (Math.random() - 0.5) * 200, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export const AnimationToggle = ({ isEnabled, onToggle }: { isEnabled: boolean, onToggle: () => void }) => {
  return (
    <div className="fixed top-4 left-4 z-[110]">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`p-3 rounded-2xl border border-border-custom backdrop-blur-md transition-all duration-500 group ${
          isEnabled ? 'bg-accent/10 border-accent text-accent shadow-[0_0_15px_rgba(217,119,6,0.2)]' : 'bg-bg-secondary/50 text-text-secondary'
        }`}
        title={isEnabled ? "Disable Background Animation" : "Enable Background Animation"}
      >
        <Sparkles 
          size={18} 
          className={`transition-transform duration-1000 ${isEnabled ? 'animate-spin-slow' : 'opacity-50'}`} 
        />
      </button>
    </div>
  );
};

import { motion, AnimatePresence } from 'motion/react';
import { Wine, Droplets, Box, GlassWater, ShoppingCart, Star, Zap, ShieldCheck, Filter, LayoutGrid, Cookie } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import FridgeGrid from '../components/FridgeGrid';

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeFilter, setActiveFilter] = useState(categoryParam || 'All');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setActiveFilter(categoryParam);
    }
  }, [categoryParam]);
  
  const categories = [
    { name: 'All', icon: <LayoutGrid size={30} /> },
    { name: 'Spirits', icon: <Wine size={30} /> },
    { name: 'Sodas', icon: <Droplets size={30} /> },
    { name: 'Juiceboxes', icon: <Box size={30} /> },
    { name: 'Water', icon: <GlassWater size={30} /> },
    { name: 'Snacks', icon: <Cookie size={30} /> }
  ];
  
  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="flex flex-col bg-bg-primary">
      <header className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bg-primary transition-colors duration-300">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1920&q=80" 
          alt="Inventory Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-15 dark:opacity-65 dark:brightness-65 transition-opacity duration-500"
          referrerPolicy="no-referrer"
        />
        {/* Light Mode Edge Fades (White) */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-white/0 dark:hidden pointer-events-none z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-white/0 dark:hidden pointer-events-none z-[1]" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-white/0 dark:hidden pointer-events-none z-[1]" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-white/0 dark:hidden pointer-events-none z-[1]" />
        
        {/* Dark Mode Overlays */}
        <motion.div 
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 hidden dark:block bg-black/49 pointer-events-none" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-[35px] sm:text-[41px] md:text-[83px] font-black uppercase italic tracking-tighter mb-4 text-text-primary drop-shadow-lg leading-none">The <span className="text-accent">Fridge</span></h1>
            <p className="text-lg sm:text-xl font-light uppercase tracking-[0.3em] opacity-90 text-accent drop-shadow-md">{products.length} Premium Selections</p>
          </motion.div>
        </div>
      </header>

      <div className="w-full px-4 sm:px-8 py-12 bg-bg-primary transition-colors duration-300 relative">
        {/* Continuous Open Fridge Mist Animation */}
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-screen">
          {/* Layer 1: Slow descending heavy mist */}
          <motion.div 
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "100%", opacity: [0, 0.4, 0] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            className="absolute -top-1/2 left-0 right-0 h-[150%] bg-gradient-to-b from-white/20 via-white/5 to-transparent mix-blend-overlay blur-[100px]"
          />
          {/* Layer 2: Secondary drift for density */}
          <motion.div 
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "100%", opacity: [0, 0.3, 0] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, delay: 7 }}
            className="absolute -top-1/2 left-0 right-0 h-[150%] bg-gradient-to-b from-white/15 via-white/5 to-transparent mix-blend-screen blur-[80px]"
          />
        </div>

        {/* Option 4: Floating Cart Widget */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-4 bg-glass-filter backdrop-blur-[var(--glass-filter-blur)] border border-glass-filter-border rounded-full shadow-2xl text-text-primary"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white dark:text-black text-xs font-black flex items-center justify-center rounded-full shadow-lg">0</span>
            </div>
            <span className="font-black uppercase tracking-widest text-sm">View Cart</span>
          </motion.button>
        </div>

        {/* Sticky Filter Bar - Ice Frost Morphism */}
        <div className="sticky top-20 z-40 py-4 mb-12 -mx-4 px-4 sm:-mx-8 sm:px-8 transition-all duration-300 bg-glass-filter backdrop-blur-[var(--glass-filter-blur)] border-b border-glass-filter-border shadow-lg shadow-black/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-3 text-text-primary font-bold uppercase tracking-widest text-sm drop-shadow-sm">
              <Filter size={18} className="text-accent" /> Filter By Category
            </div>
            
            {/* Option 6: Icy Search Bar */}
            <div className="flex-grow max-w-md mx-4 hidden md:block">
              <input 
                type="text" 
                placeholder="Search the fridge..." 
                className="w-full bg-glass-card backdrop-blur-[var(--glass-filter-blur)] border border-glass-card-border rounded-full px-6 py-2 text-sm text-text-primary placeholder:text-text-primary/50 focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2 sm:gap-4">
              {categories.map(category => (
                <button
                  key={category.name}
                  onClick={() => setActiveFilter(category.name)}
                  title={category.name}
                  className={`p-2 sm:p-3 flex items-center justify-center transition-all rounded-xl ${
                    activeFilter === category.name 
                      ? 'text-accent scale-110 drop-shadow-md' 
                      : 'text-text-primary/70 hover:text-accent'
                  }`}
                >
                  <span className="flex">
                    {category.icon}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <FridgeGrid products={filteredProducts} />
        </div>
      </div>

      {/* Features Banner - Minimalist */}
      <section className="bg-bg-primary text-text-primary border-t border-border-custom transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 py-12 md:py-24">
          <div className="p-4 sm:p-8 md:p-12 sm:border-r border-b sm:border-b-0 border-border-custom flex flex-col items-center text-center space-y-2 sm:space-y-4">
            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            <h4 className="text-sm sm:text-lg font-black uppercase tracking-tight">Guaranteed Quality</h4>
            <p className="text-[10px] sm:text-xs text-text-secondary font-light">Every bottle is inspected for authenticity and storage quality.</p>
          </div>
          <div className="p-4 sm:p-8 md:p-12 sm:border-r border-b sm:border-b-0 border-border-custom flex flex-col items-center text-center space-y-2 sm:space-y-4">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            <h4 className="text-sm sm:text-lg font-black uppercase tracking-tight">Instant Pickup</h4>
            <p className="text-[10px] sm:text-xs text-text-secondary font-light">Order online and your selection will be ready in 15 minutes.</p>
          </div>
          <div className="p-4 sm:p-8 md:p-12 flex flex-col items-center text-center space-y-2 sm:space-y-4 col-span-2 sm:col-span-1 border-t sm:border-t-0 border-border-custom">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            <h4 className="text-sm sm:text-lg font-black uppercase tracking-tight">Member Rewards</h4>
            <p className="text-[10px] sm:text-xs text-text-secondary font-light">Earn points on every purchase for exclusive allocations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

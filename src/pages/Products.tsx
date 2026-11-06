import { motion, AnimatePresence } from 'motion/react';
import { Wine, Droplets, Box, GlassWater, ShoppingCart, Star, Zap, ShieldCheck, Filter, LayoutGrid, Cookie, Search, X, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { useInventory } from '../context/InventoryContext';

import FridgeGrid from '../components/FridgeGrid';

export default function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category');
  const [activeFilter, setActiveFilter] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const { fridge, cartCount } = useInventory();

  useEffect(() => {
    if (categoryParam) {
      setActiveFilter(categoryParam);
    }
  }, [categoryParam]);
  
  const categories = [
    { name: 'All', icon: <LayoutGrid size={15} /> },
    { name: 'Spirits', icon: <Wine size={15} /> },
    { name: 'Sodas', icon: <Droplets size={15} /> },
    { name: 'Juiceboxes', icon: <Box size={15} /> },
    { name: 'Water', icon: <GlassWater size={15} /> },
    { name: 'Snacks', icon: <Cookie size={15} /> }
  ];
  
  const filteredProducts = fridge.filter(p => {
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      (p.flavorProfile && p.flavorProfile.some(f => f.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

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
            <p className="text-lg sm:text-xl font-light uppercase tracking-[0.3em] opacity-90 text-accent drop-shadow-md">{fridge.length} Premium Selections</p>
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
            type="button"
            onClick={() => navigate('/cart')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-4 bg-glass-filter backdrop-blur-[var(--glass-filter-blur)] border border-glass-filter-border rounded-full shadow-2xl text-text-primary cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white dark:text-black text-xs font-black flex items-center justify-center rounded-full shadow-lg">{cartCount}</span>
            </div>
            <span className="font-black uppercase tracking-widest text-sm">View Cart</span>
          </motion.button>
        </div>

        {/* Responsive Sticky Filter Bar - Ice Frost Morphism (Optimized for Mobile, Tablet & Desktop) */}
        <div className="sticky top-20 z-40 py-3 sm:py-4 mb-8 sm:mb-12 -mx-4 px-4 sm:-mx-8 sm:px-8 transition-all duration-300 bg-glass-filter backdrop-blur-[var(--glass-filter-blur)] border-b border-glass-filter-border shadow-lg shadow-black/5">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
            
            {/* Top / Left Sub-row: Title with Live Count + Responsive Search Input */}
            <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="flex items-center gap-2 text-text-primary font-bold uppercase tracking-widest text-xs sm:text-sm shrink-0">
                <Filter size={16} className="text-accent" />
                <span className="hidden sm:inline">Categories</span>
                <span className="sm:hidden">Fridge</span>
                <span className="text-[10px] text-text-secondary font-mono bg-white/10 dark:bg-white/5 px-2 py-0.5 rounded-full border border-border-custom">
                  {filteredProducts.length}
                </span>
              </div>

              {/* Live Interactive Search Box (Functional on all device sizes!) */}
              <div className="relative flex-1 max-w-xs sm:max-w-sm">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search the fridge..." 
                  className="w-full bg-glass-card/70 backdrop-blur-md border border-glass-card-border rounded-full pl-9 pr-8 py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom / Right Sub-row: Category Selector with Smooth Touch Scroll on Tablet/Mobile */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 shrink-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map(category => {
                const isActive = activeFilter === category.name;
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveFilter(category.name)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive 
                        ? 'bg-accent text-white dark:text-black shadow-md shadow-accent/25 scale-[1.02]' 
                        : 'bg-glass-card/50 hover:bg-glass-card text-text-secondary hover:text-text-primary border border-glass-card-border/60 hover:border-accent/40'
                    }`}
                  >
                    <span className="shrink-0">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        <div className="relative z-10">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-border-custom flex items-center justify-center mx-auto text-accent">
                <Filter size={24} />
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tight text-text-primary">No Drinks Found</h3>
              <p className="text-sm text-text-secondary">
                No items match your search for "{searchQuery}". Try a different keyword or reset filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                className="btn-cta-secondary px-6 py-2.5 rounded-xl border border-white/20 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <FridgeGrid products={filteredProducts} />
          )}
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

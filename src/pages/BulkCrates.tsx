import { motion } from 'motion/react';
import { Package, ArrowLeft, Search, Filter, ShoppingBag, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BulkCrates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
      {/* Header */}
      <header className="pt-32 pb-16 px-4 sm:px-8 border-b border-border-custom bg-bg-secondary transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <Link to="/wholesale" className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Back to Wholesale
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">
                Full <span className="text-accent">Inventory</span>
              </h1>
              <p className="text-text-secondary max-w-xl">
                Every item in our fridge is available in bulk packaging. Select your preferred crate, carton, or case size for maximum savings.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-4 bg-bg-primary border border-border-custom rounded-2xl focus:outline-none focus:border-accent transition-colors w-full sm:w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-bg-primary/80 backdrop-blur-md border-b border-border-custom py-4 px-4 sm:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-accent text-white dark:text-black border-accent' 
                  : 'bg-bg-secondary text-text-secondary border-border-custom hover:border-accent hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-bg-secondary border border-border-custom rounded-2xl sm:rounded-3xl overflow-hidden hover:border-accent/50 transition-all duration-500 shadow-lg flex flex-col"
            >
              <div className="relative h-32 sm:h-64 overflow-hidden bg-bg-primary shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4 sm:p-8 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-1.5 py-0.5 sm:px-3 sm:py-1 bg-accent text-white dark:text-black text-[8px] sm:text-xs font-black uppercase rounded-full">
                  Bulk Case
                </div>
              </div>
              <div className="p-3 sm:p-8 flex-grow flex flex-col space-y-2 sm:space-y-4">
                <div className="space-y-1">
                  <div className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-accent">{product.category}</div>
                  <h3 className="text-xs sm:text-xl font-black uppercase tracking-tight text-text-primary leading-tight line-clamp-2">{product.name}</h3>
                </div>
                
                <div className="flex-grow">
                  <p className="text-[10px] sm:text-xs text-text-secondary line-clamp-2">
                    Available in standard 12 or 24 unit bulk packaging. Perfect for events and high-volume restocking.
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 border-t border-border-custom flex items-center justify-between">
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Bulk Price</div>
                    <div className="text-sm sm:text-xl font-black text-text-primary">₦{(product.price * 10).toLocaleString()}</div>
                  </div>
                  <div className="text-right space-y-0.5 sm:space-y-1">
                    <div className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Units</div>
                    <div className="text-[10px] sm:text-sm font-black text-accent">12 / 24 Pack</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 sm:gap-3 pt-2 sm:pt-4">
                  <button className="py-2 sm:py-3 btn-cta text-white dark:text-black font-black uppercase tracking-widest text-[8px] sm:text-xs rounded-lg sm:rounded-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1 sm:gap-2">
                    <ShoppingBag className="w-3 h-3 sm:w-[14px] sm:h-[14px]" /> Add Case
                  </button>
                  <button className="py-2 sm:py-3 bg-bg-primary border border-border-custom hover:border-accent hover:text-accent font-black uppercase tracking-widest text-[8px] sm:text-xs rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-1 sm:gap-2">
                    <Info className="w-3 h-3 sm:w-[14px] sm:h-[14px]" /> Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center space-y-4">
            <Package size={48} className="mx-auto text-text-secondary opacity-30" />
            <h3 className="text-2xl font-black uppercase italic text-text-secondary">No Products Found</h3>
            <p className="text-text-secondary">Try adjusting your search or category filters.</p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <section className="py-24 px-4 sm:px-8 bg-bg-secondary border-t border-border-custom text-center transition-colors duration-300">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">
            Need Custom <span className="text-accent">Pallets?</span>
          </h2>
          <p className="text-text-secondary">
            For orders exceeding 50 crates, we offer specialized logistics and even deeper discounts. Contact our wholesale desk directly.
          </p>
          <button className="px-6 py-3 md:px-12 md:py-5 bg-bg-primary border border-border-custom hover:border-accent hover:text-accent text-text-primary text-xs md:text-sm font-black uppercase tracking-widest rounded-full transition-all">
            Contact Wholesale Desk
          </button>
        </div>
      </section>
    </div>
  );
}

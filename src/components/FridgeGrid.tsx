import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Lock } from 'lucide-react';
import ProductPanel from './ProductPanel';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: number;
  size: string;
  isPremium?: boolean;
  flavorProfile?: string[];
  model_3d_url?: string;
}

interface FridgeGridProps {
  products: Product[];
}

export default function FridgeGrid({ products }: FridgeGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Group products by category to create shelves
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  const shelves = categories.map((category, index) => {
    return {
      level: `0${index + 1}`,
      title: category,
      items: products.filter(p => p.category === category).map(p => ({
        ...p,
        isPremium: p.price > 100000 // Adjusted threshold for premium
      }))
    };
  });

  return (
    <div className="w-full max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-6">
      <div className="space-y-24">
        {shelves.map((shelf, sIdx) => (
          <section key={sIdx} className="relative">
            {/* Minimalist Section Header */}
            <div className="flex flex-col mb-8 sm:mb-12 border-l-4 border-accent pl-4 sm:pl-6">
              <span className="text-[10px] sm:text-xs font-black text-accent uppercase tracking-[0.4em] mb-1">Section {shelf.level}</span>
              <h3 className="text-text-primary font-sans font-black uppercase tracking-tight text-2xl md:text-4xl">{shelf.title}</h3>
            </div>

            {/* Minimalist Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-8">
              {shelf.items.map((item, iIdx) => (
                <motion.div
                  key={iIdx}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedProduct(item)}
                  className="group relative flex flex-col cursor-pointer"
                >
                  {/* Continuous Slow Frost Effect */}
                  <motion.div
                    animate={{ 
                      opacity: [0, 0.4, 0],
                      y: [0, 150],
                      scaleY: [0.8, 1.2]
                    }}
                    transition={{ 
                      duration: 8, 
                      ease: "linear", 
                      repeat: Infinity,
                      delay: iIdx * 0.5 // Staggered start for natural feel
                    }}
                    className="absolute -top-4 left-0 right-0 h-full bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-xl pointer-events-none z-30 mix-blend-overlay"
                  />

                  {/* Product Image Container - Frosted Glass (Option 1) */}
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
                    <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-8">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('unsplash')) return;
                          if (item.name.toLowerCase().includes("fanta") || item.name.toLowerCase().includes("mirinda orange")) {
                            target.src = "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=400&q=80";
                          } else if (item.name.toLowerCase().includes("sprite") || item.name.toLowerCase().includes("7up")) {
                            target.src = "https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=400&q=80";
                          } else if (item.name.toLowerCase().includes("pepsi")) {
                            target.src = "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=400&q=80";
                          } else {
                            target.src = "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80";
                          }
                        }}
                        className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Premium Badge - Glassmorphic (Option 3) */}
                    {item.isPremium && (
                      <div className="absolute top-4 right-4 p-2 bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-full text-accent shadow-lg">
                        <Lock size={14} />
                      </div>
                    )}

                    {/* Out of Stock Overlay - Frosted (Option 7) */}
                    {item.stock === 0 && (
                      <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                        <span className="px-4 py-2 bg-black/80 text-white text-xs font-black uppercase tracking-widest rounded-full">Out of Stock</span>
                      </div>
                    )}

                    {/* Quick Add - Minimalist Overlay */}
                    <div className="absolute inset-x-0 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart logic
                        }}
                        className="p-2 sm:p-4 btn-cta text-white dark:text-black rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto hover:scale-110 active:scale-95"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info - Clean Typography */}
                  <div className="mt-3 sm:mt-6 flex flex-col items-center text-center space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {/* Glassmorphic Category Tag (Option 3) */}
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-lg font-black uppercase tracking-tight text-text-primary leading-tight line-clamp-2">{item.name}</h4>
                    <div className="flex items-center gap-1 sm:gap-3">
                      <span className="text-[10px] sm:text-sm text-text-secondary font-medium">{item.size}</span>
                      <span className="w-1 h-1 rounded-full bg-accent"></span>
                      <span className="text-xs sm:text-lg font-black text-accent">₦{item.price.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Option 2: Icy Quick-View Modal */}
      <ProductPanel 
        product={selectedProduct} 
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}

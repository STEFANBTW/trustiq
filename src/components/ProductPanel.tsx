import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Info, ShieldCheck, Star, Activity, Wind, Droplet, Flame } from 'lucide-react';

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

interface ProductPanelProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper to get icon for flavor
const getFlavorIcon = (flavor: string) => {
  const lower = flavor.toLowerCase();
  if (lower.includes('smok') || lower.includes('oak') || lower.includes('wood')) return <Wind size={14} />;
  if (lower.includes('sweet') || lower.includes('fruit') || lower.includes('vanilla')) return <Droplet size={14} />;
  if (lower.includes('spic') || lower.includes('pepp') || lower.includes('bitter')) return <Flame size={14} />;
  return <Activity size={14} />;
};

export default function ProductPanel({ product, isOpen, onClose }: ProductPanelProps) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (product) {
      setActiveProduct(product);
      setActiveSlide(0);
    }
  }, [product]);

  if (!activeProduct) return null;

  const mediaItems = [];
  if (activeProduct.model_3d_url) {
    mediaItems.push({ type: '3d', url: activeProduct.model_3d_url });
  }
  if (activeProduct.image) {
    mediaItems.push({ type: 'image', url: activeProduct.image });
  }
  // Add premium placeholders to demonstrate the slider functionality robustly
  mediaItems.push({ type: 'image', url: 'https://images.unsplash.com/photo-1563223771-417e29dc99c3?auto=format&fit=crop&w=800&q=80' });
  mediaItems.push({ type: 'image', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' });

  const panelContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] isolate">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: "100%", scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 sm:inset-0 sm:m-auto h-[90vh] sm:h-max sm:max-h-[90vh] w-full sm:w-[90vw] max-w-4xl bg-glass-filter backdrop-blur-[var(--glass-filter-blur)] border-t sm:border border-glass-filter-border rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.3)] sm:shadow-2xl overflow-y-auto z-50"
          >
            {/* Mobile Drag Handle Indicator */}
            <div className="sm:hidden w-12 h-1.5 bg-white/30 rounded-full mx-auto mt-4 mb-2" />

            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0" />

            <div className="relative z-10 p-4 sm:p-6 md:p-10">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-8">
                <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-accent bg-glass-card backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-glass-card-border drop-shadow-sm">
                  Fridge Collection / {activeProduct.category}
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 hover:bg-white/10 dark:hover:bg-white/5 backdrop-blur-sm rounded-full transition-colors text-text-primary"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-10">
                {/* Media Slider Container */}
                <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-glass-card backdrop-blur-md rounded-3xl overflow-hidden group border border-glass-card-border shadow-inner flex flex-col">
                  {/* Spotlight */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-accent/10 via-transparent to-transparent opacity-50 pointer-events-none z-0" />

                  {/* Scrollable Track */}
                  <div
                    className="flex-grow flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-full relative z-10"
                    onScroll={(e) => {
                      const target = e.target as HTMLDivElement;
                      const slideWidth = target.clientWidth;
                      if (slideWidth > 0) {
                        const newIndex = Math.round(target.scrollLeft / slideWidth);
                        if (newIndex !== activeSlide) {
                          setActiveSlide(newIndex);
                        }
                      }
                    }}
                  >
                    {mediaItems.map((item, index) => (
                      <div key={index} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-4 sm:p-8 relative">
                        {item.type === '3d' ? (
                          <model-viewer
                            src={item.url}
                            alt={activeProduct.name}
                            auto-rotate
                            camera-controls
                            camera-orbit="0deg 75deg 150%"
                            shadow-intensity="1"
                            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                          ></model-viewer>
                        ) : (
                          <img
                            src={item.url}
                            alt={`${activeProduct.name} View ${index + 1}`}
                            className="h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Slider Indicators */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                    {mediaItems.map((_, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-300 rounded-full ${index === activeSlide
                            ? 'w-6 h-1.5 bg-accent shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                            : 'w-1.5 h-1.5 bg-white/30 backdrop-blur-md'
                          }`}
                      />
                    ))}
                  </div>

                  {activeProduct.isPremium && (
                    <div className="absolute top-4 right-4 z-20 bg-accent text-white dark:text-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                      <Star size={10} fill="currentColor" /> Reserve
                    </div>
                  )}
                </div>

                {/* Details Container */}
                <div className="flex flex-col h-full justify-center">
                  <div className="space-y-6 sm:space-y-8 flex flex-col h-full py-0 lg:py-6">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-text-primary mb-1 sm:mb-2 drop-shadow-md">
                        {activeProduct.name}
                      </h2>
                      <div className="text-xl sm:text-2xl font-mono text-accent drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">
                        ₦{activeProduct.price.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-text-secondary font-light leading-relaxed text-sm sm:text-lg">
                      Experience the exceptional quality of our {activeProduct.name}. Carefully selected for our premium collection, this {activeProduct.category.toLowerCase()} offers an unparalleled tasting experience.
                    </p>

                    {/* Flavor Profile Visualization */}
                    {activeProduct.flavorProfile && (
                      <div className="py-4 sm:py-6 border-y border-glass-card-border bg-glass-card -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 backdrop-blur-md transition-colors duration-300">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-text-secondary mb-3 sm:mb-4 flex items-center gap-2">
                          <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" /> Tasting Notes
                        </div>
                        <div className="space-y-4">
                          {activeProduct.flavorProfile.map((flavor, idx) => (
                            <div key={idx} className="group">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-text-primary text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                                  {getFlavorIcon(flavor)} {flavor}
                                </span>
                                <span className="text-text-secondary text-xs font-mono">
                                  {85 + (idx * 5)}%
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${85 + (idx * 5)}%` }}
                                  transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                                  className="h-full bg-accent rounded-full group-hover:scale-105 group-hover:brightness-110 transition-colors shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                      <div className="bg-glass-card backdrop-blur-md p-3 sm:p-4 rounded-xl border border-glass-card-border transition-colors duration-300">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-text-secondary mb-1">Size</div>
                        <div className="text-sm sm:text-base text-text-primary font-bold capitalize">{activeProduct.size}</div>
                      </div>
                      <div className="bg-glass-card backdrop-blur-md p-3 sm:p-4 rounded-xl border border-glass-card-border transition-colors duration-300">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-text-secondary mb-1">Availability</div>
                        <div className={`text-sm sm:text-base font-bold ${activeProduct.stock > 0 ? 'text-accent' : 'text-orange-500'}`}>
                          {activeProduct.stock > 0 ? `${activeProduct.stock} Units` : 'Sold Out'}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 sm:space-y-3 pt-2">
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                        <ShieldCheck className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-accent" />
                        <span>Verified Authentic Product</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                        <Info className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-accent" />
                        <span>Store in a cool, dry place</span>
                      </div>
                    </div>

                    {/* Action */}
                    <button className="w-full py-5 sm:py-6 lg:py-8 btn-cta hover:scale-[1.02] hover:brightness-110 active:scale-95 text-white dark:text-black font-black uppercase tracking-[0.2em] text-sm sm:text-lg lg:text-2xl transition-all flex items-center justify-center gap-3 sm:gap-4 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] rounded-full mt-auto shrink-0">
                      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(panelContent, document.body);
}

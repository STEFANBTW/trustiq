import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Info, ShieldCheck, Star, Activity, Wind, Droplet, Flame, Check } from 'lucide-react';
import BottleViewer from './BottleViewer';
import { useInventory } from '../context/InventoryContext';

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
  const [isPopped, setIsPopped] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useInventory();

  useEffect(() => {
    if (product) {
      setActiveProduct(product);
      setIsPopped(false);
      setJustAdded(false);
      setResetSignal((s) => s + 1);
    }
  }, [product]);

  if (!activeProduct) return null;

  const handleResetToNormal = () => {
    setIsPopped(false);
    setResetSignal((s) => s + 1);
  };

  const handleAddToCart = () => {
    if (activeProduct.stock === 0) return;
    addToCart(activeProduct, 1);
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  const panelContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] isolate flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-0"
          />

          {/* Dead-Centered Modal Card Across Mobile, Tablet, and Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 250 }}
            className="relative z-10 m-auto w-full max-w-4xl max-h-[88vh] bg-glass-filter backdrop-blur-[var(--glass-filter-blur)] border border-glass-filter-border rounded-3xl sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0" />

            {/* Modal Header */}
            <div className="relative z-10 flex justify-between items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6 md:px-10 md:pt-8 shrink-0">
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-accent bg-glass-card backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border border-glass-card-border drop-shadow-sm">
                Fridge Collection / {activeProduct.category}
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-white/10 dark:hover:bg-white/5 backdrop-blur-sm rounded-full transition-colors text-text-primary cursor-pointer"
                aria-label="Close details modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-6 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center pb-2 sm:pb-0">
                {/* Image / 3D Showcase Container */}
                <div
                  className={`relative h-80 sm:h-96 md:h-[440px] w-full rounded-2xl flex items-center justify-center overflow-hidden group ${
                    activeProduct.id === 1
                      ? 'p-0'
                      : 'bg-glass-card backdrop-blur-md p-4 sm:p-8 border border-glass-card-border shadow-inner'
                  }`}
                >
                  {activeProduct.id !== 1 && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-accent/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                  )}
                
                  {activeProduct.id === 1 ? (
                    <BottleViewer
                      isPopped={isPopped}
                      resetSignal={resetSignal}
                      onResetView={handleResetToNormal}
                    />
                  ) : (
                    <img 
                      src={activeProduct.image} 
                      alt={activeProduct.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('photo-1551024709')) return;
                        if (activeProduct.name.toLowerCase().includes("fanta") || activeProduct.name.toLowerCase().includes("mirinda orange")) {
                          target.src = "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80";
                        } else if (activeProduct.name.toLowerCase().includes("sprite") || activeProduct.name.toLowerCase().includes("7up")) {
                          target.src = "https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=600&q=80";
                        } else if (activeProduct.name.toLowerCase().includes("pepsi")) {
                          target.src = "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80";
                        } else {
                          target.src = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80";
                        }
                      }}
                      className="h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700 z-10"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  
                  {activeProduct.isPremium && (
                    <div className="absolute bottom-4 right-4 z-20 bg-accent text-white dark:text-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                      <Star size={10} fill="currentColor" /> Reserve
                    </div>
                  )}
                </div>

                {/* Details Container */}
                <div className="flex flex-col justify-center">
                  <div className="space-y-5 sm:space-y-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-text-primary mb-1 sm:mb-2 drop-shadow-md">
                        {activeProduct.name}
                      </h2>
                      <div className="text-xl sm:text-2xl font-mono text-accent drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">
                        ₦{activeProduct.price.toLocaleString()}
                      </div>
                    </div>

                    <p className="text-text-secondary font-light leading-relaxed text-sm sm:text-base">
                      Experience the exceptional quality of our {activeProduct.name}. Carefully selected for our premium collection, this {activeProduct.category.toLowerCase()} offers an unparalleled tasting experience.
                    </p>

                    {/* Flavor Profile Visualization */}
                    {activeProduct.flavorProfile && (
                      <div className="py-4 border-y border-glass-card-border bg-glass-card -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 backdrop-blur-md transition-colors duration-300">
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-text-secondary mb-3 flex items-center gap-2">
                          <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" /> Tasting Notes
                        </div>
                        <div className="space-y-3">
                          {activeProduct.flavorProfile.map((flavor, idx) => (
                            <div key={idx} className="group">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-text-primary text-xs sm:text-sm font-medium uppercase tracking-wide flex items-center gap-2">
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
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-glass-card backdrop-blur-md p-3 sm:p-4 rounded-xl border border-glass-card-border transition-colors duration-300">
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Size</div>
                        <div className="text-sm sm:text-base text-text-primary font-bold capitalize">{activeProduct.size}</div>
                      </div>
                      <div className="bg-glass-card backdrop-blur-md p-3 sm:p-4 rounded-xl border border-glass-card-border transition-colors duration-300">
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Availability</div>
                        <div className={`text-sm sm:text-base font-bold ${activeProduct.stock > 0 ? 'text-accent' : 'text-orange-500'}`}>
                          {activeProduct.stock > 0 ? `${activeProduct.stock} Units` : 'Sold Out'}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-text-secondary">
                        <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                        <span>Verified Authentic Product</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-text-secondary">
                        <Info className="w-4 h-4 text-accent shrink-0" />
                        <span>Store in a cool, dry place</span>
                      </div>
                    </div>

                    {/* Desktop / Tablet In-Flow Action Bar */}
                    <div className="hidden sm:flex items-center gap-3 pt-3">
                      {activeProduct.id === 1 && (
                        <button
                          type="button"
                          onClick={() => (isPopped ? handleResetToNormal() : setIsPopped(true))}
                          className="btn-cta-secondary px-5 py-3.5 rounded-xl border border-white/15 font-bold uppercase tracking-[0.12em] text-xs flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>{isPopped ? 'Normal View' : 'Pop Cork'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={activeProduct.stock === 0}
                        className="btn-cta flex-1 py-3.5 px-6 font-black uppercase tracking-[0.14em] text-xs sm:text-sm flex items-center justify-center gap-2.5 rounded-xl whitespace-nowrap cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        {justAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added To Cart!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add To Fridge</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sticky Action Bar: Always sticky at bottom of modal on mobile screen */}
            <div className="sm:hidden sticky bottom-0 z-30 shrink-0 w-full p-3 bg-bg-secondary/95 dark:bg-stone-950/95 backdrop-blur-xl border-t border-glass-filter-border flex items-center gap-2.5 pb-[max(0.85rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(0,0,0,0.5)]">
              {activeProduct.id === 1 && (
                <button
                  type="button"
                  onClick={() => (isPopped ? handleResetToNormal() : setIsPopped(true))}
                  className="btn-cta-secondary px-4 py-3 rounded-xl border border-white/20 font-bold uppercase tracking-wider text-xs flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{isPopped ? 'Normal' : 'Pop Cork'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={activeProduct.stock === 0}
                className="btn-cta flex-1 py-3 px-4 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 rounded-xl whitespace-nowrap cursor-pointer shadow-lg disabled:opacity-50"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add To Fridge</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(panelContent, document.body);
}

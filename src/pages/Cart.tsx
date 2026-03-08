import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <div className="flex flex-col min-h-[80vh] bg-bg-primary text-text-primary transition-colors duration-300">
      <header className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden bg-bg-secondary transition-colors duration-300">
        <img 
          src="https://picsum.photos/seed/cart_bg/1920/1080?grayscale" 
          alt="Cart background" 
          className="absolute inset-0 w-full h-full object-cover brightness-125 dark:brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,white_100%)] dark:hidden pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 hidden dark:block bg-black pointer-events-none" 
        />
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
          <h1 className="text-[35px] sm:text-[41px] md:text-[69px] font-black uppercase italic tracking-tighter mb-4 text-text-primary drop-shadow-md leading-none">Your <span className="text-accent">Selection</span></h1>
          <p className="text-lg sm:text-xl font-light uppercase tracking-[0.3em] opacity-70 text-text-primary">Ready for checkout</p>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-24">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 py-16 sm:py-24 border border-dashed border-border-custom bg-bg-secondary rounded-2xl shadow-sm dark:shadow-none transition-colors duration-300">
          <ShoppingBag size={64} className="text-text-secondary/20 sm:w-20 sm:h-20" />
          <div className="text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter mb-2 text-text-primary">Your cart is empty</h2>
            <p className="text-sm sm:text-base text-text-secondary font-light">Looks like you haven't added any premium spirits yet.</p>
          </div>
          <Link to="/products" className="px-6 py-3 md:px-12 md:py-5 btn-cta text-white dark:text-black font-black uppercase tracking-widest hover:scale-105 hover:brightness-110 active:scale-95 transition-all flex items-center gap-4 text-xs md:text-base rounded-xl">
            <ArrowLeft size={20} /> Back To Products
          </Link>
        </div>
      </div>
    </div>
  );
}

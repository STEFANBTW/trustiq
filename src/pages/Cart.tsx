import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, Plus, Minus, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';

export default function Cart() {
  const { cart, cartCount, cartSubtotal, updateCartQuantity, removeFromCart, clearCart } = useInventory();
  const shipping = cart.length > 0 ? 5000 : 0;
  const total = cartSubtotal + shipping;

  return (
    <div className="flex flex-col min-h-[80vh] bg-bg-primary text-text-primary transition-colors duration-300">
      <header className="relative h-[36vh] w-full flex items-center justify-center overflow-hidden bg-bg-secondary transition-colors duration-300">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80" 
          alt="Cart background" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 dark:opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,white_100%)] dark:hidden pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 hidden dark:block bg-black/70 pointer-events-none" 
        />
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
          <h1 className="text-[35px] sm:text-[41px] md:text-[69px] font-black uppercase italic tracking-tighter mb-3 text-text-primary drop-shadow-md leading-none">
            Your <span className="text-accent">Selection</span>
          </h1>
          <p className="text-sm sm:text-lg font-light uppercase tracking-[0.3em] opacity-80 text-text-primary">
            {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'Item' : 'Items'} Ready for Checkout` : 'Ready for checkout'}
          </p>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 py-16 sm:py-24 border border-dashed border-border-custom bg-bg-secondary rounded-2xl shadow-sm dark:shadow-none transition-colors duration-300">
            <ShoppingBag size={64} className="text-text-secondary/20 sm:w-20 sm:h-20" />
            <div className="text-center px-4">
              <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter mb-2 text-text-primary">Your cart is empty</h2>
              <p className="text-sm sm:text-base text-text-secondary font-light">Looks like you haven't added any premium spirits or snacks yet.</p>
            </div>
            <Link to="/products" className="btn-cta px-6 py-3 md:px-12 md:py-5 font-black uppercase tracking-widest flex items-center gap-4 text-xs md:text-base rounded-xl">
              <ArrowLeft size={20} /> <span>Back To Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border-custom">
                <span className="text-xs font-black uppercase tracking-widest text-text-secondary">
                  Fridge Selection ({cartCount})
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-black uppercase tracking-widest text-rose-500 hover:underline cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.name}`}
                  className="bg-bg-secondary border border-border-custom rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 rounded-xl bg-bg-primary border border-border-custom overflow-hidden shrink-0 p-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="w-full h-full object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                        {item.category || 'Spirits'} {item.size ? `• ${item.size}` : ''}
                      </span>
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-text-primary">
                        {item.name}
                      </h3>
                      <div className="text-sm font-mono font-bold text-text-secondary">
                        ₦{item.price.toLocaleString()} each
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border-custom">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-bg-primary border border-border-custom rounded-xl p-1.5">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 rounded-lg hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-black text-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 rounded-lg hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right min-w-[85px]">
                      <div className="text-base sm:text-lg font-black text-accent">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      className="p-2 text-text-secondary hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-secondary hover:text-accent transition-colors"
                >
                  <ArrowLeft size={16} /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-bg-secondary border border-border-custom rounded-3xl p-6 sm:p-8 shadow-xl sticky top-28 space-y-6">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">
                Order <span className="text-accent">Summary</span>
              </h3>

              <div className="space-y-4 pt-2 border-t border-border-custom">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-text-secondary">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="text-text-primary">₦{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-text-secondary">
                  <span>Chilled Express Delivery</span>
                  <span className="text-text-primary">₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-border-custom">
                  <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Total</span>
                  <span className="text-2xl font-black text-accent">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-cta w-full py-4 px-6 font-black uppercase tracking-widest text-xs sm:text-sm rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-accent/20"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight size={18} />
              </Link>

              <div className="p-4 bg-bg-primary border border-border-custom rounded-2xl flex items-center gap-3">
                <ShieldCheck size={18} className="text-accent shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">
                  Temperature-Controlled Delivery Guaranteed
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

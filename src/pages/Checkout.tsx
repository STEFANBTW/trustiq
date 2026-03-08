import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  X,
  MapPin,
  Phone,
  Mail,
  Lock,
  Plus,
  Minus,
  Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const cartItems = [
  { id: 1, name: "Gold Label Whiskey", price: 20, qty: 1, image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Coca-Cola Classic Crate", price: 20, qty: 2, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80" },
];

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = 5000;
  const total = subtotal + shipping;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Complete order
      alert('Order Placed Successfully!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-32 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Progress Stepper */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border-custom z-0" />
            <div className={`absolute inset-y-0 left-0 bg-accent h-px z-0 transition-all duration-500`} style={{ width: `${(step - 1) * 50}%` }} />
            
            {[
              { id: 1, label: 'Shipping', icon: <Truck size={18} /> },
              { id: 2, label: 'Payment', icon: <CreditCard size={18} /> },
              { id: 3, label: 'Review', icon: <ShieldCheck size={18} /> },
            ].map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  step >= s.id ? 'bg-accent text-white dark:text-black shadow-lg shadow-accent/20' : 'bg-bg-secondary border border-border-custom text-text-secondary'
                }`}>
                  {step > s.id ? <CheckCircle2 size={20} /> : s.icon}
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${step >= s.id ? 'text-accent' : 'text-text-secondary'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-bg-secondary border border-border-custom rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-10"
                >
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter">Shipping <span className="text-accent">Details</span></h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">Full Name</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                        <input type="text" className="w-full bg-bg-primary border border-border-custom rounded-2xl pl-12 pr-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all" placeholder="Chief Adeyemi" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                        <input type="tel" className="w-full bg-bg-primary border border-border-custom rounded-2xl pl-12 pr-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all" placeholder="+234..." />
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">Delivery Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-text-secondary" size={18} />
                        <textarea rows={3} className="w-full bg-bg-primary border border-border-custom rounded-2xl pl-12 pr-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all resize-none" placeholder="123 Luxury Lane, Victoria Island, Lagos"></textarea>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-bg-secondary border border-border-custom rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-10"
                >
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter">Payment <span className="text-accent">Method</span></h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={24} /> },
                      { id: 'bank', label: 'Bank Transfer', icon: <Truck size={24} /> },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 text-center ${
                          paymentMethod === method.id 
                            ? 'bg-accent/5 border-accent text-accent shadow-lg shadow-accent/10' 
                            : 'bg-bg-primary border-border-custom text-text-secondary hover:border-accent/30'
                        }`}
                      >
                        <div className={`p-4 rounded-2xl ${paymentMethod === method.id ? 'bg-accent text-white dark:text-black' : 'bg-bg-secondary text-text-secondary'}`}>
                          {method.icon}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest leading-tight">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-6 pt-6">
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">Card Number</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                          <input type="text" className="w-full bg-bg-primary border border-border-custom rounded-2xl pl-12 pr-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all" placeholder="•••• •••• •••• ••••" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">Expiry</label>
                          <input type="text" className="w-full bg-bg-primary border border-border-custom rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-4">CVV</label>
                          <input type="text" className="w-full bg-bg-primary border border-border-custom rounded-2xl px-6 py-4 text-text-primary focus:outline-none focus:border-accent transition-all" placeholder="•••" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-bg-secondary border border-border-custom rounded-[2.5rem] p-8 md:p-12 shadow-xl space-y-10"
                >
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter">Final <span className="text-accent">Review</span></h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-bg-primary border border-border-custom rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                          <Truck size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-text-secondary">Shipping To</div>
                          <div className="text-sm font-black text-text-primary">Victoria Island, Lagos</div>
                        </div>
                      </div>
                      <button onClick={() => setStep(1)} className="text-xs font-black uppercase tracking-widest text-accent hover:underline">Edit</button>
                    </div>

                    <div className="p-6 bg-bg-primary border border-border-custom rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest text-text-secondary">Payment Method</div>
                          <div className="text-sm font-black text-text-primary">Visa ending in 4242</div>
                        </div>
                      </div>
                      <button onClick={() => setStep(2)} className="text-xs font-black uppercase tracking-widest text-accent hover:underline">Edit</button>
                    </div>
                  </div>

                  <div className="p-8 border-2 border-dashed border-border-custom rounded-3xl text-center space-y-4">
                    <ShieldCheck size={32} className="mx-auto text-accent" />
                    <p className="text-xs text-text-secondary font-medium px-8">
                      By clicking "Complete Order", you agree to our terms of service and confirm that you are of legal drinking age.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-8">
              <button 
                onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
                className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button 
                onClick={handleNext}
                className="px-6 py-3 md:px-12 md:py-5 btn-cta text-white dark:text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-accent/20 flex items-center gap-3 group text-xs md:text-base"
              >
                {step === 3 ? 'Complete Order' : 'Next Step'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-bg-secondary border border-border-custom rounded-[2.5rem] p-8 shadow-xl sticky top-24">
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8">Order <span className="text-accent">Summary</span></h3>
              
              <div className="space-y-6 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 group">
                    <div className="w-20 h-20 bg-bg-primary border border-border-custom rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-black uppercase tracking-tight text-text-primary truncate">{item.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-text-secondary">Qty: {item.qty}</span>
                        <span className="text-xs font-black text-accent">₦{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-border-custom">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-text-secondary">
                  <span>Subtotal</span>
                  <span className="text-text-primary">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-text-primary">₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Total Amount</span>
                  <span className="text-2xl font-black text-accent">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-10 p-4 bg-bg-primary border border-border-custom rounded-2xl flex items-center gap-3">
                <ShieldCheck size={20} className="text-accent" />
                <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Secure SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wholesale.tsx
import { motion, AnimatePresence } from 'motion/react';
import { Package, Truck, ShieldCheck, ArrowRight, Star, GlassWater, Music, Users, CheckCircle2, ShoppingBag, Calendar, Store, X, Plus, Minus, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const eventOptions = [
  {
    id: 'weddings',
    name: "Weddings & Owambes",
    description: "Full beverage management for your big day. We handle the logistics so you can focus on the celebration.",
    perks: ["Sale-or-Return Policy", "Ice & Cooler Logistics", "Dedicated Server Staff", "Custom Menu Printing"],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'birthdays',
    name: "Birthdays & Private Parties",
    description: "Curated drink lists for intimate or large-scale private gatherings. Premium spirits and craft mixers.",
    perks: ["Mixologist Referrals", "Glassware Rental", "Next-Day Fulfillment", "Themed Drink Packages"],
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'corporate',
    name: "Corporate Functions",
    description: "Professional beverage service for office launches, end-of-year parties, and executive meetings.",
    perks: ["Branded Packaging", "Net-30 Billing", "Multi-Location Support", "Executive Tastings"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'others',
    name: "Other Occasions",
    description: "Tell us about your unique event. Whether it's a housewarming, graduation, or community gathering, we've got you covered.",
    perks: ["Flexible Scaling", "Custom Selection", "Rapid Setup", "Event Consultation"],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
  }
];

import { supabase } from '../lib/supabase';

// Wholesale.tsx
export default function Wholesale() {
  const [formStep, setFormStep] = useState(1);
  const [selectedCrate, setSelectedCrate] = useState<any>(null);
  const [crateCount, setCrateCount] = useState(1);
  const [isMixing, setIsMixing] = useState(false);
  const [crateProducts, setCrateProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from('wholesale').select('*').then(({ data, error }) => {
      if (error) {
        console.error("Error fetching wholesale:", error);
        return;
      }
      if (data) setCrateProducts(data);
    });
  }, []);

  return (
    <div className="flex flex-col bg-bg-primary min-h-screen text-text-primary transition-colors duration-300">
      {/* Hero Section */}
      <header className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bg-primary transition-colors duration-300">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80" 
          alt="Wholesale Hero" 
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
          className="absolute inset-0 hidden dark:block bg-black/50 pointer-events-none" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-[35px] md:text-[69px] font-black uppercase italic tracking-tighter mb-6 text-text-primary leading-none drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              Wholesale <br/><span className="text-accent">Operations</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-text-secondary max-w-2xl mx-auto">
              Professional scale supply for events, retailers, and high-volume consumers.
            </p>
          </motion.div>
        </div>
      </header>

      {/* 1. Bulk Crate Division */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-text-primary">
              Crates, Cartons <span className="text-accent">& Bulk</span>
            </h2>
            <p className="text-text-secondary max-w-xl">
              Buy by the crate for maximum savings. Start with as low as one crate. Mix & match flavors within a single crate.
            </p>
          </div>
          <div className="hidden md:block h-px flex-grow bg-border-custom mx-12 mb-6" />
          <div className="text-right">
            <div className="text-3xl font-black italic text-text-primary">Mix & Match</div>
            <div className="text-xs font-bold uppercase tracking-widest text-text-secondary">Available For All Crates</div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {crateProducts.map((crate, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedCrate(crate)}
              className="group cursor-pointer bg-bg-secondary border border-border-custom rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-500 shadow-lg flex flex-col"
            >
              <div className="relative h-44 sm:h-56 overflow-hidden shrink-0">
                <img src={crate.image} alt={crate.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent opacity-60" />
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-1 py-0.5 sm:px-2 sm:py-1 bg-accent text-white dark:text-black text-[8px] sm:text-xs font-black uppercase rounded">Crate Only</span>
                  <span className="px-1 py-0.5 sm:px-2 sm:py-1 bg-bg-primary/80 text-text-primary text-[8px] sm:text-xs font-black uppercase rounded border border-border-custom backdrop-blur-sm">Mixable</span>
                </div>
              </div>
              <div className="p-3 sm:p-6 space-y-1 sm:space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-lg font-black uppercase tracking-tight text-text-primary line-clamp-2">{crate.name}</h3>
                  <div className="flex justify-between items-center mt-1 sm:mt-2">
                    <span className="text-[10px] sm:text-xs text-text-secondary font-bold">{crate.qty}</span>
                    <span className="text-xs sm:text-base text-accent font-black">{crate.price}</span>
                  </div>
                </div>
                <button className="w-full mt-2 sm:mt-4 py-2 sm:py-3 bg-bg-primary border border-border-custom group-hover:border-accent group-hover:text-accent text-[8px] sm:text-xs font-black uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-1 sm:gap-2">
                  <Info className="w-3 h-3 sm:w-[14px] sm:h-[14px]" /> View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <Link to="/wholesale/bulk" className="px-6 py-3 md:px-12 md:py-5 bg-bg-secondary border border-border-custom hover:border-accent hover:text-accent text-text-primary text-xs md:text-base font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2 md:gap-4 group">
            See More Options <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex items-center gap-4 p-6 bg-accent/5 border border-accent/20 rounded-3xl max-w-2xl text-center">
            <div className="p-4 bg-accent/10 rounded-2xl text-accent">
              <Package size={32} />
            </div>
            <div className="text-left">
              <h4 className="font-black uppercase tracking-tight text-text-primary">Custom Mix Configuration</h4>
              <p className="text-xs text-text-secondary">Want a specific split? (e.g. 4 Coke, 4 Fanta, 4 Sprite). Use our mixing tool to build your perfect crate.</p>
            </div>
            <button 
              onClick={() => setIsMixing(true)}
              className="px-6 py-3 btn-cta text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shrink-0"
            >
              Start Mixing
            </button>
          </div>
        </div>
      </section>

      {/* 2. Events Section */}
      <section className="py-24 px-4 sm:px-8 bg-bg-secondary border-y border-border-custom transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3 text-accent font-black uppercase tracking-widest text-sm">
              <Calendar size={18} /> Occasions
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-text-primary">
              Special <span className="text-accent">Events</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Tailored beverage solutions for your most important milestones. Minimum 5 crates across all options.
            </p>
          </div>

          <div className="flex overflow-x-auto pb-8 gap-4 sm:gap-8 snap-x no-scrollbar">
            {eventOptions.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/wholesale/events/${event.id}`)}
                className={`w-[75vw] sm:w-[280px] md:w-[300px] lg:w-[320px] shrink-0 snap-start border border-border-custom rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer ${
                  event.id === 'others' ? 'bg-accent/10 border-accent/30' : 'bg-bg-primary'
                }`}
              >
                <div className="h-56 relative overflow-hidden">
                  <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white text-center px-6 drop-shadow-xl">{event.name}</h3>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">{event.description}</p>
                  <div className="space-y-2">
                    {event.perks.slice(0, 2).map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-primary/70">
                        <CheckCircle2 size={12} className="text-accent" /> {perk}
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 border border-border-custom group-hover:border-accent group-hover:text-accent font-black uppercase tracking-widest text-xs transition-all rounded-xl">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Retail Partnership Section */}
      <motion.section 
        initial={{ backgroundColor: "var(--bg-secondary)" }}
        whileInView={{ backgroundColor: "var(--bg-primary)" }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 1 }}
        className="py-24 px-4 sm:px-8 w-full"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-accent font-black uppercase tracking-widest text-sm">
              <Store size={18} /> Partnerships
            </div>
            <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-text-primary leading-none">
              Retail <br/><span className="text-accent">Partnerships</span>
            </h2>
            <p className="text-lg text-text-secondary font-light leading-relaxed">
              Consistent, reliable supply for bars, restaurants, and boutique liquor stores. We offer the deepest volume discounts and priority restocking for our retail partners.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-6 bg-bg-secondary border border-border-custom rounded-xl sm:rounded-2xl space-y-1 sm:space-y-2">
                <ShieldCheck className="text-accent w-4 h-4 sm:w-6 sm:h-6" />
                <h4 className="font-black uppercase tracking-tight text-[10px] sm:text-sm">Net-30 Terms</h4>
                <p className="text-[8px] sm:text-xs text-text-secondary">Flexible payment options for established businesses.</p>
              </div>
              <div className="p-4 sm:p-6 bg-bg-secondary border border-border-custom rounded-xl sm:rounded-2xl space-y-1 sm:space-y-2">
                <Truck className="text-accent w-4 h-4 sm:w-6 sm:h-6" />
                <h4 className="font-black uppercase tracking-tight text-[10px] sm:text-sm">Priority Fulfillment</h4>
                <p className="text-[8px] sm:text-xs text-text-secondary">Guaranteed 4-hour restocking for emergency shortages.</p>
              </div>
            </div>
            <button className="px-6 py-3 md:px-12 md:py-5 btn-cta text-white dark:text-black text-xs md:text-base font-black uppercase tracking-widest rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-accent/20">
              Become A Partner
            </button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80" 
              alt="Retail Display" 
              className="relative z-10 rounded-3xl shadow-2xl border border-border-custom"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </motion.section>

      {/* Inquiry Form */}
      <section className="py-24 px-4 sm:px-8 bg-bg-secondary border-t border-border-custom relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.1),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-text-primary mb-4">
              Request <span className="text-accent">Partnership</span>
            </h2>
            <p className="text-text-secondary">
              Tell us about your event or business. Our concierge team will respond within 2 hours.
            </p>
          </div>

          <div className="bg-bg-primary/80 backdrop-blur-xl border border-border-custom p-8 md:p-12 rounded-3xl shadow-2xl transition-colors duration-300">
            {formStep === 1 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Full Name</label>
                    <input type="text" className="w-full bg-bg-secondary border border-border-custom rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-base text-text-primary focus:outline-none focus:border-accent transition-colors" placeholder="Chief / Mr / Mrs..." />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Phone Number</label>
                    <input type="tel" className="w-full bg-bg-secondary border border-border-custom rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-base text-text-primary focus:outline-none focus:border-accent transition-colors" placeholder="+234..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Partnership Type</label>
                  <select className="w-full bg-bg-secondary border border-border-custom rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option>Bulk Crate Supply</option>
                    <option>Special Event (Wedding/Birthday)</option>
                    <option>Retail Partnership</option>
                    <option>Corporate Gifting</option>
                  </select>
                </div>
                <button 
                  onClick={() => setFormStep(2)}
                  className="w-full py-4 btn-cta hover:scale-105 hover:brightness-110 active:scale-95 text-white dark:text-black font-black uppercase tracking-widest rounded-xl transition-colors mt-8"
                >
                  Next Step
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Estimated Budget (₦)</label>
                  <select className="w-full bg-bg-secondary border border-border-custom rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none">
                    <option>500k - 1M</option>
                    <option>1M - 5M</option>
                    <option>5M - 10M</option>
                    <option>10M+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Additional Details</label>
                  <textarea rows={4} className="w-full bg-bg-secondary border border-border-custom rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Tell us about the drink preferences, venue, date..."></textarea>
                </div>
                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={() => setFormStep(1)}
                    className="w-1/3 py-4 bg-bg-secondary hover:bg-bg-primary border border-border-custom text-text-primary font-black uppercase tracking-widest rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => alert('Application Submitted!')}
                    className="w-2/3 py-4 btn-cta hover:scale-105 hover:brightness-110 active:scale-95 text-white dark:text-black font-black uppercase tracking-widest rounded-xl transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mt-8">
              <div className={`w-12 h-1 rounded-full ${formStep === 1 ? 'bg-accent' : 'bg-border-custom'}`} />
              <div className={`w-12 h-1 rounded-full ${formStep === 2 ? 'bg-accent' : 'bg-border-custom'}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Crate Detail Modal */}
      <AnimatePresence>
        {selectedCrate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCrate(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-bg-primary border border-border-custom rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedCrate(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-bg-secondary/80 rounded-full text-text-primary hover:text-accent transition-colors border border-border-custom"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src={selectedCrate.image} alt={selectedCrate.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-accent font-black uppercase tracking-widest text-xs">
                    <Package size={14} /> Bulk Crate Offer
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-text-primary leading-tight">
                    {selectedCrate.name}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedCrate.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-bg-secondary border border-border-custom rounded-2xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Crate Quantity</span>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setCrateCount(Math.max(1, crateCount - 1))}
                        className="p-2 bg-bg-primary border border-border-custom rounded-lg hover:border-accent transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-black">{crateCount}</span>
                      <button 
                        onClick={() => setCrateCount(crateCount + 1)}
                        className="p-2 bg-bg-primary border border-border-custom rounded-lg hover:border-accent transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Unit Price</span>
                        <div className="text-2xl font-black text-accent">{selectedCrate.price}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Total Estimate</span>
                        <div className="text-3xl font-black text-text-primary">₦{(parseInt(selectedCrate.price.replace('₦', '').replace(',', '')) * crateCount).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-grow py-4 btn-cta text-white dark:text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-accent/20">
                      Pick Immediately
                    </button>
                    <button className="p-4 bg-bg-secondary border border-border-custom rounded-xl hover:border-accent transition-colors">
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mix & Match Modal */}
      <AnimatePresence>
        {isMixing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMixing(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-[95vw] sm:w-full max-w-2xl h-[90vh] max-h-[800px] overflow-y-auto bg-bg-primary border border-border-custom rounded-[2rem] p-6 md:p-12 space-y-8 shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setIsMixing(false)}
                className="absolute top-6 right-6 p-2 bg-bg-secondary/80 rounded-full text-text-primary hover:text-accent transition-colors border border-border-custom z-10"
              >
                <X size={20} />
              </button>

              <div className="space-y-4 text-center shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent text-xs font-black uppercase tracking-widest rounded-full border border-accent/20">
                  <Package size={14} /> Mix & Match Tool
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-text-primary">
                  Build Your <span className="text-accent">Crate</span>
                </h2>
                <p className="text-sm text-text-secondary">
                  Configure your 12-bottle crate with any combination of flavors.
                </p>
              </div>

              <div className="space-y-6 flex-grow">
                {['Coca-Cola', 'Fanta Orange', 'Sprite', 'Pepsi', '7Up'].map((drink) => (
                  <div key={drink} className="flex items-center justify-between p-4 bg-bg-secondary border border-border-custom rounded-2xl">
                    <span className="font-black uppercase tracking-tight text-sm">{drink}</span>
                    <div className="flex items-center gap-4">
                      <button className="p-2 bg-bg-primary border border-border-custom rounded-lg hover:border-accent transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-black">0</span>
                      <button className="p-2 bg-bg-primary border border-border-custom rounded-lg hover:border-accent transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-6 shrink-0 mt-auto">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                  <span className="text-text-secondary">Total Bottles</span>
                  <span className="text-accent">0 / 12</span>
                </div>
                <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-accent transition-all duration-500" />
                </div>
                <button className="w-full py-5 btn-cta text-white dark:text-black font-black uppercase tracking-widest rounded-xl opacity-50 cursor-not-allowed">
                  Confirm Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

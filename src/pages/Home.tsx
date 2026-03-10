import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Wine, ArrowRight, Star, ShieldCheck, Zap, Crown, Users, Music, LayoutGrid, Droplets, Box, GlassWater } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .limit(4)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching featured products:", error);
          return;
        }
        if (data) {
          setFeaturedProducts(data.map(r => ({
            ...r,
            flavorProfile: r.flavor_profile,
            isPremium: Boolean(r.is_premium)
          })));
        }
      });
  }, []);
  return (
    <div className="flex flex-col bg-bg-primary">
      {/* Section 1: Hero - Fridge Style */}
      <header className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bg-primary transition-colors duration-300">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80"
          alt="Premium Liquor Display"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Light Mode Overlay: White Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,white_90%)] dark:hidden pointer-events-none z-[1]" />

        {/* Dark Mode Overlay: Minimal Dark Tint */}
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 hidden dark:block bg-black pointer-events-none z-[1]"
        />

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[41px] sm:text-[69px] md:text-[83px] lg:text-[8rem] font-black mb-6 tracking-tighter leading-none uppercase italic text-text-primary"
          >
            Trust <br />
            <span className="text-accent drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">Liq Palace</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Link to="/products" className="inline-flex items-center gap-2 md:gap-4 px-6 py-3 md:px-12 md:py-5 btn-cta text-white dark:text-black text-xs md:text-sm font-black uppercase tracking-widest hover:scale-105 hover:brightness-110 active:scale-95 transition-all rounded-full shadow-2xl shadow-accent/20">
              Open The Fridge <ArrowRight size={20} className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Marquee Ticker - Fridge Style */}
      <div className="overflow-hidden whitespace-nowrap bg-bg-secondary text-text-primary py-6 border-y border-border-custom relative z-20 backdrop-blur-md">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="inline-block font-black uppercase tracking-[0.3em] text-sm md:text-lg opacity-50"
        >
          ICE COLD DRINKS • PREMIUM POURS • EXCLUSIVE SELECTION • EVENT READY • ICE COLD DRINKS • PREMIUM POURS • EXCLUSIVE SELECTION • EVENT READY • ICE COLD DRINKS • PREMIUM POURS • EXCLUSIVE SELECTION • EVENT READY •
        </motion.div>
      </div>

      {/* Section 2: Featured Selections - Compact Grid */}
      <section className="py-24 px-4 sm:px-8 bg-bg-primary transition-colors duration-300 min-h-[100vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-accent font-black uppercase tracking-widest text-sm">
                <Zap size={18} /> Hot Right Now
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-text-primary">
                Featured <br />
                <span className="text-accent">Selections</span>
              </h2>
            </div>
            <Link to="/products" className="text-text-secondary hover:text-accent font-black uppercase tracking-widest text-sm flex items-center gap-2 transition-colors border-b border-border-custom pb-2">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-bg-secondary border border-border-custom rounded-2xl sm:rounded-3xl overflow-hidden hover:border-accent/50 transition-all duration-500 shadow-lg flex flex-col h-[350px] sm:h-[500px]"
              >
                <div className="relative h-[65%] overflow-hidden bg-bg-primary flex items-center justify-center p-4 sm:p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-0.5 sm:px-3 sm:py-1 bg-accent/10 backdrop-blur-md border border-accent/20 text-accent text-[8px] sm:text-xs font-black uppercase rounded-full">
                    {product.category}
                  </div>
                </div>
                <div className="p-3 sm:p-8 flex-grow flex flex-col justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-xs sm:text-xl font-black uppercase tracking-tight text-text-primary leading-tight group-hover:text-accent transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                      {product.flavorProfile?.slice(0, 2).map(flavor => (
                        <span key={flavor} className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary border border-border-custom px-1 py-0.5 sm:px-2 rounded-full">
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-6 border-t border-border-custom flex items-center justify-between">
                    <div className="text-sm sm:text-2xl font-black text-accent">
                      ₦{product.price.toLocaleString()}
                    </div>
                    <Link
                      to="/products"
                      className="p-1.5 sm:p-3 bg-bg-primary border border-border-custom hover:border-accent hover:text-accent rounded-full transition-all"
                    >
                      <ArrowRight className="w-3 h-3 sm:w-[18px] sm:h-[18px]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: The Platinum Standard - Split Layout */}
      <section className="bg-bg-secondary text-text-primary transition-colors duration-300 border-y border-border-custom overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          <div className="flex flex-col justify-center p-8 sm:p-12 md:p-24 space-y-8 relative z-10">
            <div className="max-w-xl lg:ml-auto space-y-8">
              <div className="w-16 h-1 bg-accent mb-4" />
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                The <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Platinum</span> <br />
                Standard
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-text-secondary font-light leading-relaxed">
                From premium spirits to the most refreshing local sodas, we curate the best drinks for every occasion. Whether you're hosting a massive wedding or relaxing at home, we've got you covered.
              </p>
              <div className="relative pt-4">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                  <div className="transform -rotate-[25deg] scale-[1.2] translate-y-[25px] flex flex-col">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-widest text-text-primary/20 ml-2 sm:ml-6 mb-[42px] sm:mb-[26px]">
                      Always
                    </div>
                    <div className="text-[5rem] sm:text-[7rem] md:text-[9rem] font-black uppercase italic tracking-tighter text-text-primary/10 leading-none">
                      Active
                    </div>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6 relative z-10">
                  {[
                    { name: 'Top-Shelf Spirits', path: '/products?category=Spirits' },
                    { name: 'Ice-Cold Sodas', path: '/products?category=Sodas' },
                    { name: 'Premium Water', path: '/products?category=Water' },
                    { name: 'Gourmet Snacks', path: '/products?category=Snacks' }
                  ].map(item => (
                    <Link key={item.name} to={item.path} className="relative z-10 flex items-center justify-center text-center font-black uppercase tracking-widest text-[8px] sm:text-xs text-text-primary/80 bg-bg-primary/10 p-2 sm:p-4 rounded-lg sm:rounded-xl border border-border-custom hover:border-accent hover:text-accent transition-colors group">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[60vh] lg:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80"
              alt="People celebrating"
              className="w-full h-full object-cover brightness-90 dark:brightness-75 hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Curated Excellence - High End Cellar */}
      <section className="bg-bg-primary text-text-primary border-b border-border-custom transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          <div className="relative h-[60vh] lg:h-auto overflow-hidden order-2 lg:order-1 p-8 lg:p-24 flex items-center justify-center">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent z-10 transition-colors duration-300" />
              <img
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80"
                alt="High-end Wine Cellar"
                className="w-full h-full object-cover brightness-75 dark:brightness-50 hover:brightness-90 dark:hover:brightness-75 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 md:p-24 space-y-8 order-1 lg:order-2 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none relative z-10">
              Curated <br />
              <span className="text-accent">Excellence</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary font-light leading-relaxed relative z-10">
              Discover our carefully curated selection of premium spirits and refreshing beverages. Stored in optimal conditions for the perfect pour. We bring sophistication and quality directly to you.
            </p>
            <div className="flex gap-12 pt-8 relative z-10">
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center mb-4 mx-auto group-hover:bg-accent transition-all border border-border-custom group-hover:border-accent shadow-xl">
                  <Wine className="text-accent group-hover:text-white dark:group-hover:text-black" size={32} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Rare Vintages</span>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center mb-4 mx-auto group-hover:bg-accent transition-all border border-border-custom group-hover:border-accent shadow-xl">
                  <Crown className="text-accent group-hover:text-white dark:group-hover:text-black" size={32} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-text-secondary">Premium Reserve</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Gourmet Snacks */}
      <section className="bg-bg-secondary border-b border-border-custom transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          <div className="flex flex-col justify-center p-8 sm:p-12 md:p-24 space-y-8 text-text-primary transition-colors duration-300">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              Gourmet <br />
              <span className="text-accent">Snacks</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary font-light leading-relaxed">
              Elevate your experience with our selection of premium snacks. From roasted nuts to savory crisps, find the perfect companion for your beverage.
            </p>
            <div className="pt-8">
              <Link to="/products?category=Snacks" className="inline-block px-6 py-3 md:px-12 md:py-5 bg-text-primary text-bg-primary hover:bg-accent hover:text-white text-xs md:text-sm font-black uppercase tracking-widest transition-all rounded-full shadow-2xl">
                Shop Snacks
              </Link>
            </div>
          </div>
          <div className="relative h-[60vh] lg:h-auto overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1536584754829-12214d404f52?auto=format&fit=crop&w=1000&q=80"
              alt="Gourmet Peanuts and Cashews"
              className="w-full h-full object-cover brightness-90 dark:brightness-50 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Section 6: Features Banner - Fridge Style */}
      <section className="bg-bg-primary text-text-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 py-12 sm:py-24">
          <div className="p-4 sm:p-8 md:p-12 sm:border-r border-b sm:border-b-0 border-border-custom flex flex-col items-center text-center space-y-2 sm:space-y-4">
            <ShieldCheck className="w-6 h-6 sm:w-10 sm:h-10 text-accent" />
            <h4 className="text-sm sm:text-xl font-black uppercase tracking-tighter italic">Guaranteed Quality</h4>
            <p className="text-[10px] sm:text-sm text-text-secondary font-light">Every bottle is inspected for authenticity and storage quality.</p>
          </div>
          <div className="p-4 sm:p-8 md:p-12 sm:border-r border-b sm:border-b-0 border-border-custom flex flex-col items-center text-center space-y-2 sm:space-y-4">
            <Zap className="w-6 h-6 sm:w-10 sm:h-10 text-accent" />
            <h4 className="text-sm sm:text-xl font-black uppercase tracking-tighter italic">Instant Pickup</h4>
            <p className="text-[10px] sm:text-sm text-text-secondary font-light">Order online and your selection will be ready in 15 minutes.</p>
          </div>
          <div className="p-4 sm:p-8 md:p-12 flex flex-col items-center text-center space-y-2 sm:space-y-4 col-span-2 sm:col-span-1 border-t sm:border-t-0 border-border-custom">
            <Star className="w-6 h-6 sm:w-10 sm:h-10 text-accent" />
            <h4 className="text-sm sm:text-xl font-black uppercase tracking-tighter italic">Member Rewards</h4>
            <p className="text-[10px] sm:text-sm text-text-secondary font-light">Earn points on every purchase for exclusive allocations.</p>
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA - Fridge Style */}
      <section className="relative min-h-screen px-8 bg-black text-white flex flex-col items-center justify-center text-center border-t border-border-custom overflow-hidden transition-colors duration-300">
        <img
          src="https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&w=1920&q=80"
          alt="Fridge full of drinks"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.2),transparent_70%)] pointer-events-none" />
        <h2 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase italic tracking-tighter mb-8 relative z-10 drop-shadow-lg">
          Open The <span className="text-accent drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">Fridge</span>
        </h2>
        <p className="text-lg sm:text-xl text-white/80 font-light max-w-2xl mb-12 relative z-10 drop-shadow-md">
          Step into our ultra-modern, temperature-controlled glass cooler. Browse our full collection of premium spirits, craft sodas, and curated snacks.
        </p>
        <Link to="/products" onClick={() => window.scrollTo(0, 0)} className="px-6 py-3 md:px-16 md:py-6 btn-cta text-white dark:text-black hover:scale-105 hover:brightness-110 active:scale-95 font-black uppercase tracking-widest transition-all shadow-2xl shadow-accent/20 relative z-10 rounded-full text-xs md:text-lg">
          View Full Collection
        </Link>
      </section>
    </div>
  );
}

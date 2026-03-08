import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Car, Utensils, Info, Users, MapPin, Calendar, Clock, Music, Camera } from 'lucide-react';

import { supabase } from '../lib/supabase';

export default function Meetups() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('meetups').select('*').then(({ data, error }) => {
      if (error) {
        console.error("Error fetching meetups:", error);
        return;
      }
      if (data) setEvents(data);
    });
  }, []);

  return (
    <div className="flex flex-col bg-bg-primary text-text-primary transition-colors duration-300">
      <header className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-bg-primary transition-colors duration-300">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80" 
          alt="People meeting at bar" 
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
          className="absolute inset-0 hidden dark:block bg-black/56 pointer-events-none" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-[35px] sm:text-[41px] md:text-[83px] font-black uppercase italic tracking-tighter mb-4 text-text-primary drop-shadow-md leading-none">The <span className="text-accent">Meetup</span></h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light uppercase tracking-[0.3em] opacity-70 text-text-primary">Community & Connection</p>
          </motion.div>
        </div>
      </header>

      {/* Event Schedule */}
      <section className="w-full px-4 sm:px-8 py-24 bg-bg-secondary border-b border-border-custom transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-6 text-text-primary">Event <br /><span className="text-accent">Schedule</span></h2>
              <p className="text-lg sm:text-xl text-text-secondary font-light">Join us for our regular gatherings. From car meets to tasting nights, there's always something happening at Trust Liquor.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 border border-border-custom text-center min-w-[120px] rounded-xl">
                <span className="block text-2xl font-black text-accent">12</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Events Monthly</span>
              </div>
              <div className="p-4 border border-border-custom text-center min-w-[120px] rounded-xl">
                <span className="block text-2xl font-black text-accent">500+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Community Members</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-border-custom rounded-2xl overflow-hidden">
            {events.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 sm:p-12 border-b md:border-b-0 md:border-r border-border-custom last:border-b-0 md:last:border-r-0 hover:bg-bg-primary transition-colors"
              >
                <Calendar className="text-accent mb-3 sm:mb-6 w-6 h-6 sm:w-8 sm:h-8" />
                <h3 className="text-sm sm:text-2xl font-black uppercase italic tracking-tighter mb-2 sm:mb-4 text-text-primary line-clamp-2">{event.title}</h3>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-text-secondary text-[8px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-6">
                  <Clock className="w-3 h-3 sm:w-[14px] sm:h-[14px]" /> {event.date} | {event.time}
                </div>
                <p className="text-[10px] sm:text-base text-text-secondary font-light leading-relaxed line-clamp-3">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-bg-primary transition-colors duration-300">
        <img 
          src="https://picsum.photos/seed/parking_lot_vibe/1920/1080" 
          alt="Parking space" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.8] dark:brightness-[0.4] mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 px-4 sm:px-8 md:px-24 w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-secondary/80 backdrop-blur-md p-8 sm:p-12 border-l-4 sm:border-l-8 border-accent rounded-r-3xl shadow-xl transition-colors duration-300 max-w-4xl"
          >
            <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Car size={40} className="text-accent sm:w-12 sm:h-12" />
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-text-primary">Parking Space</h2>
            </div>
            <p className="text-lg sm:text-xl text-text-secondary mb-8 sm:mb-10 font-light leading-relaxed">
              Our dedicated parking area is designed for quick meetups and safe transitions. Whether you're gathering before a night out or just stopping by for a chat, our space is yours.
            </p>
            <ul className="space-y-6">
              {[
                "Well-lit and secure environment",
                "Easy access from main thoroughfares",
                "Perfect for small car groups and meetups",
                "CCTV monitored 24/7 for your peace of mind"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-text-primary font-bold uppercase tracking-widest text-sm">
                  <div className="w-8 h-1 bg-accent" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="relative min-h-screen w-full flex items-center justify-end overflow-hidden bg-bg-primary transition-colors duration-300">
        <img 
          src="https://picsum.photos/seed/snacks_rich/1920/1080" 
          alt="Snacks close up" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.8] dark:brightness-[0.4] mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 px-4 sm:px-8 md:px-24 w-full max-w-7xl mx-auto text-right flex justify-end">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-secondary/80 backdrop-blur-md p-8 sm:p-12 border-r-4 sm:border-r-8 border-accent rounded-l-3xl shadow-xl transition-colors duration-300 max-w-4xl"
          >
            <div className="flex items-center justify-end gap-4 sm:gap-6 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-text-primary">Free Snacks</h2>
              <Utensils size={40} className="text-accent sm:w-12 sm:h-12" />
            </div>
            <p className="text-lg sm:text-xl text-text-secondary mb-8 sm:mb-10 font-light leading-relaxed">
              A drink is only as good as the snack that accompanies it. We provide complimentary, high-quality salty snacks to keep the conversation flowing.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="p-3 sm:p-6 bg-bg-primary border border-border-custom text-left rounded-xl transition-colors duration-300">
                <h4 className="text-accent text-[10px] sm:text-base font-black uppercase tracking-widest mb-1 sm:mb-2">Signature Peanuts</h4>
                <p className="text-[8px] sm:text-xs text-text-secondary">Roasted daily, salted to perfection.</p>
              </div>
              <div className="p-3 sm:p-6 bg-bg-primary border border-border-custom text-left rounded-xl transition-colors duration-300">
                <h4 className="text-accent text-[10px] sm:text-base font-black uppercase tracking-widest mb-1 sm:mb-2">Gourmet Pretzels</h4>
                <p className="text-[8px] sm:text-xs text-text-secondary">The classic crunch you know and love.</p>
              </div>
              <div className="p-3 sm:p-6 bg-bg-primary border border-border-custom text-left rounded-xl transition-colors duration-300">
                <h4 className="text-accent text-[10px] sm:text-base font-black uppercase tracking-widest mb-1 sm:mb-2">Spicy Peas</h4>
                <p className="text-[8px] sm:text-xs text-text-secondary">For those who like a little heat.</p>
              </div>
              <div className="p-3 sm:p-6 bg-bg-primary border border-border-custom text-left rounded-xl transition-colors duration-300">
                <h4 className="text-accent text-[10px] sm:text-base font-black uppercase tracking-widest mb-1 sm:mb-2">Corn Nuts</h4>
                <p className="text-[8px] sm:text-xs text-text-secondary">Extra crunch for the bold.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full px-4 sm:px-8 py-24 bg-bg-primary text-text-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Camera className="mx-auto text-accent mb-4" size={48} />
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Community <span className="text-accent">Gallery</span></h2>
            <p className="text-text-secondary font-light uppercase tracking-widest text-sm sm:text-base">Captured moments from our meetups</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border-custom rounded-2xl overflow-hidden">
            {[
              "1514362545857-3bc16c4c7d1b",
              "1574096079513-a5392f9288f5",
              "1551538827-9c037cb4f32a",
              "1568213816046-149f22707c9b",
              "1517248135467-4c7edcad34c4",
              "1470337458703-46b1792b3c6b",
              "1527281400683-1aae777175f8",
              "1575444758702-4a6b9222336e"
            ].map((id, i) => (
              <div key={i} className="aspect-square overflow-hidden border border-border-custom group">
                <img 
                  src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=600&q=80`} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 md:grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-secondary py-24 border-t border-border-custom transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Info className="mx-auto text-accent mb-8" size={64} />
          <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 text-text-primary">Respect The Space</h3>
          <p className="text-xl md:text-2xl font-light text-text-secondary leading-relaxed mb-12">
            Our community thrives on mutual respect. Please keep meetups to a reasonable size and duration so all our patrons can enjoy the Trust Liquor experience.
          </p>
          <div className="inline-flex items-center gap-4 px-8 py-4 border border-border-custom text-text-secondary font-black uppercase tracking-widest rounded-xl">
            <Users size={20} /> Community First
          </div>
        </div>
      </section>
    </div>
  );
}

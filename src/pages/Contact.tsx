import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ShieldCheck, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col bg-bg-primary text-text-primary transition-colors duration-300">
      <header className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-bg-primary transition-colors duration-300">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1920&q=80" 
          alt="Bar interior" 
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
          <h1 className="text-[35px] sm:text-[41px] md:text-[83px] font-black uppercase italic tracking-tighter mb-4 text-text-primary drop-shadow-md leading-none">Get In <span className="text-accent">Touch</span></h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light uppercase tracking-[0.3em] opacity-70 text-text-primary">We're Always Open For Trust</p>
        </div>
      </header>

      <section className="bg-bg-secondary transition-colors duration-300 border-b border-border-custom">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-bg-secondary text-text-primary p-8 sm:p-12 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border-custom transition-colors duration-300">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 sm:mb-12">Visit The <br />Source</h2>
            <div className="space-y-8 sm:space-y-12">
              <div className="flex items-start gap-4 sm:gap-6">
                <MapPin className="text-accent shrink-0 w-6 h-6 sm:w-8 sm:h-8" />
                <div>
                  <h4 className="font-black uppercase tracking-widest text-xs sm:text-sm mb-2 text-text-secondary">Location</h4>
                  <p className="text-lg sm:text-xl text-text-primary font-light">Shop No. 3, Grace Plaza - Beside Rayfield Medical Services, Jos South, Plateau State, Nigeria</p>
                  <button className="mt-4 text-accent text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:underline">Get Directions</button>
                </div>
              </div>
              <div className="flex items-start gap-4 sm:gap-6">
                <Clock className="text-accent shrink-0 w-6 h-6 sm:w-8 sm:h-8" />
                <div>
                  <h4 className="font-black uppercase tracking-widest text-xs sm:text-sm mb-2 text-text-secondary">Hours</h4>
                  <p className="text-lg sm:text-xl text-text-primary font-light">Mon - Thu: 10am - 9pm<br />Fri - Sat: 10am - 11pm<br />Sun: 12pm - 6pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4 sm:gap-6">
                <Phone className="text-accent shrink-0 w-6 h-6 sm:w-8 sm:h-8" />
                <div>
                  <h4 className="font-black uppercase tracking-widest text-xs sm:text-sm mb-2 text-text-secondary">Direct Line</h4>
                  <p className="text-lg sm:text-xl text-text-primary font-light">07033846108, 07069692467</p>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-border-custom">
              <h4 className="font-black uppercase tracking-widest text-xs text-text-secondary mb-6">Social Channels</h4>
              <div className="flex gap-8">
                <Instagram size={24} className="text-text-secondary hover:text-accent cursor-pointer transition-colors" />
                <Facebook size={24} className="text-text-secondary hover:text-accent cursor-pointer transition-colors" />
                <Twitter size={24} className="text-text-secondary hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="h-[500px] lg:h-auto w-full bg-bg-secondary relative">
            <iframe 
              src="https://maps.google.com/maps?q=Shop%20No.%203%2C%20Grace%20Plaza%20-%20Beside%20Rayfield%20Medical%20Services%2C%20Jos%20South%2C%20Plateau%20State%2C%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="md:grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-48 bg-bg-primary overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20">
          <img src="https://picsum.photos/seed/whiskey_bottle_rich/1920/1080" className="w-full h-full object-cover mix-blend-overlay" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="lg:col-span-2">
            <div className="bg-bg-secondary/80 backdrop-blur-xl p-8 sm:p-12 md:p-24 border border-border-custom rounded-3xl shadow-xl transition-colors duration-300">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 text-text-primary">Message <span className="text-accent">Us</span></h2>
              <form className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-2 gap-3 sm:gap-8">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-text-secondary">Full Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-border-custom py-2 sm:py-4 focus:border-accent outline-none transition-colors text-text-primary text-xs sm:text-base" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-text-secondary">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-border-custom py-2 sm:py-4 focus:border-accent outline-none transition-colors text-text-primary text-xs sm:text-base" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Subject</label>
                  <select className="w-full bg-transparent border-b border-border-custom py-3 sm:py-4 focus:border-accent outline-none transition-colors text-text-primary appearance-none">
                    <option className="bg-bg-secondary">General Inquiry</option>
                    <option className="bg-bg-secondary">Special Order</option>
                    <option className="bg-bg-secondary">VIP Membership</option>
                    <option className="bg-bg-secondary">Event Booking</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Your Inquiry</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-border-custom py-3 sm:py-4 focus:border-accent outline-none transition-colors text-text-primary resize-none"></textarea>
                </div>
                <button className="w-full py-4 sm:py-6 btn-cta text-white dark:text-black font-black uppercase tracking-[0.4em] hover:scale-105 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 text-sm sm:text-base rounded-xl">
                  Transmit <Send size={20} />
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-bg-secondary/80 backdrop-blur-xl p-8 sm:p-12 border border-border-custom rounded-3xl shadow-xl transition-colors duration-300">
              <MessageSquare className="text-accent mb-6" size={32} />
              <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4 text-text-primary">Live Chat</h4>
              <p className="text-text-secondary font-light text-sm mb-6">Our experts are online during business hours to help you find the perfect bottle.</p>
              <button className="w-full py-4 border border-border-custom text-text-primary font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-accent hover:text-white dark:hover:text-black hover:border-accent transition-all rounded-xl">Start Chat</button>
            </div>
            <div className="bg-bg-secondary/80 backdrop-blur-xl p-8 sm:p-12 border border-border-custom rounded-3xl shadow-xl transition-colors duration-300">
              <ShieldCheck className="text-accent mb-6" size={32} />
              <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4 text-text-primary">Trust Guarantee</h4>
              <p className="text-text-secondary font-light text-sm">We stand by every product we sell. If you're not satisfied, we'll make it right.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

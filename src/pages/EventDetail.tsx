import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Calendar, Clock, Users, Package, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';

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
    perks: ["Mixologist Referrals", "Glassware Rental", "Next-Day Delivery", "Themed Drink Packages"],
    image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'corporate',
    name: "Corporate Functions",
    description: "Professional beverage service for office launches, end-of-year parties, and executive meetings.",
    perks: ["Branded Packaging", "Net-30 Billing", "Multi-Location Delivery", "Executive Tastings"],
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

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = eventOptions.find(e => e.id === eventId) || eventOptions[0];

  const [formData, setFormData] = useState({
    crateCount: 5,
    date: '',
    time: '',
    details: ''
  });

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
        
        {/* Left Panel: Content */}
        <div className="lg:col-span-9 space-y-12">
          <Link to="/wholesale" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-black uppercase tracking-widest text-xs">
            <ArrowLeft size={16} /> Back to Wholesale
          </Link>

          <div className="space-y-6">
            <h1 className="text-[35px] md:text-[57px] font-black uppercase italic tracking-tighter leading-none">
              {event.name.split(' & ')[0]} <br/>
              <span className="text-accent">{event.name.split(' & ')[1] || 'Events'}</span>
            </h1>
            <div className="h-96 w-full rounded-3xl overflow-hidden border border-border-custom">
              <img src={event.image} alt={event.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <p className="text-xl text-text-secondary font-light leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            <div className="p-4 sm:p-8 bg-bg-secondary border border-border-custom rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-6">
              <h3 className="text-sm sm:text-xl font-black uppercase italic tracking-tight">What's Included</h3>
              <div className="space-y-2 sm:space-y-4">
                {event.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-3 text-[8px] sm:text-sm font-bold uppercase tracking-widest text-text-primary/80">
                    <CheckCircle2 className="w-3 h-3 sm:w-[18px] sm:h-[18px] text-accent shrink-0" /> {perk}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-8 bg-bg-secondary border border-border-custom rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-6">
              <h3 className="text-sm sm:text-xl font-black uppercase italic tracking-tight">Event Logistics</h3>
              <div className="space-y-2 sm:space-y-4 text-[8px] sm:text-sm text-text-secondary">
                <p>• Minimum 5 crates across all beverage types.</p>
                <p>• Delivery scheduled 2 hours before event start.</p>
                <p>• Full setup and breakdown services available.</p>
                <p>• Real-time inventory tracking via account manager.</p>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="p-8 md:p-12 bg-bg-secondary border border-border-custom rounded-3xl space-y-8">
            <h3 className="text-2xl font-black uppercase italic tracking-tight">Request Event Supply</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Number of Crates (Min 5)</label>
                <input 
                  type="number" 
                  min="5"
                  value={formData.crateCount}
                  onChange={(e) => setFormData({...formData, crateCount: parseInt(e.target.value)})}
                  className="w-full bg-bg-primary border border-border-custom rounded-lg sm:rounded-xl px-2 py-2 sm:px-4 sm:py-3 text-text-primary focus:outline-none focus:border-accent text-xs sm:text-base" 
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Event Date</label>
                <input 
                  type="date" 
                  className="w-full bg-bg-primary border border-border-custom rounded-lg sm:rounded-xl px-2 py-2 sm:px-4 sm:py-3 text-text-primary focus:outline-none focus:border-accent text-xs sm:text-base" 
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Event Time</label>
                <input 
                  type="time" 
                  className="w-full bg-bg-primary border border-border-custom rounded-lg sm:rounded-xl px-2 py-2 sm:px-4 sm:py-3 text-text-primary focus:outline-none focus:border-accent text-xs sm:text-base" 
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[8px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Venue Location</label>
                <input 
                  type="text" 
                  placeholder="Lagos Island, Ikeja, etc."
                  className="w-full bg-bg-primary border border-border-custom rounded-lg sm:rounded-xl px-2 py-2 sm:px-4 sm:py-3 text-text-primary focus:outline-none focus:border-accent text-xs sm:text-base" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Additional Details</label>
              <textarea 
                rows={4} 
                placeholder="Tell us about specific drink preferences or special requests..."
                className="w-full bg-bg-primary border border-border-custom rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent resize-none"
              />
            </div>
            <button className="w-full py-5 btn-cta text-white dark:text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-accent/20">
              Submit Event Inquiry
            </button>
          </div>
        </div>

        {/* Right Panel: Navigation */}
        <div className="lg:col-span-3 space-y-8">
          <div className="sticky top-24 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-text-secondary text-center">Other Occasions</h3>
            <div className="grid grid-cols-2 gap-4">
              {eventOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => navigate(`/wholesale/events/${opt.id}`)}
                  className={`flex flex-col items-center gap-2 group transition-all ${
                    opt.id === eventId ? 'scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    opt.id === eventId ? 'border-accent shadow-lg shadow-accent/20' : 'border-border-custom'
                  }`}>
                    <img src={opt.image} alt={opt.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-tighter text-center leading-tight ${
                    opt.id === eventId ? 'text-accent' : 'text-text-secondary'
                  }`}>
                    {opt.name.split(' & ')[0]}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-6 bg-accent/5 border border-accent/20 rounded-[2rem] space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 text-accent font-black uppercase tracking-widest text-xs">
                <Star size={10} /> Priority Support
              </div>
              <h4 className="text-sm font-black uppercase italic tracking-tight">Need Help?</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Our concierge is available 24/7 for guest count calculations.
              </p>
              <button className="w-full py-2 bg-bg-primary border border-border-custom text-text-primary font-black uppercase tracking-widest text-xs rounded-lg hover:border-accent transition-colors">
                Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Clock, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronRight, 
  TrendingUp, 
  Users, 
  ShieldCheck,
  Star,
  Bell,
  Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SettingsControls } from '../components/SettingsControls';

const stats = [
  { label: 'Total Orders', value: '1,284', icon: <Package size={20} />, change: '+12.5%', color: 'text-emerald-500' },
  { label: 'Active Subscriptions', value: '42', icon: <Users size={20} />, change: '+3.2%', color: 'text-blue-500' },
  { label: 'Points Balance', value: '8,450', icon: <Star size={20} />, change: '+540', color: 'text-accent' },
  { label: 'Monthly Spend', value: '₦420k', icon: <TrendingUp size={20} />, change: '-2.4%', color: 'text-rose-500' },
];

const recentOrders = [
  { id: '#ORD-9284', date: '2024-03-01', status: 'Delivered', total: '₦12,500', items: '3x Coke, 2x Fanta' },
  { id: '#ORD-9285', date: '2024-03-02', status: 'Processing', total: '₦45,000', items: '1x Premium Lager Crate' },
  { id: '#ORD-9286', date: '2024-03-04', status: 'Shipped', total: '₦8,200', items: '12x Sprite Glass' },
  { id: '#ORD-9287', date: '2024-03-05', status: 'Pending', total: '₦21,000', items: '1x Mix & Match Crate' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-custom bg-bg-secondary hidden lg:flex flex-col sticky top-0 h-screen transition-colors duration-300">
        <div className="p-8 border-b border-border-custom">
          <div className="flex items-center gap-3 text-accent font-black uppercase italic tracking-tighter text-2xl">
            <LayoutDashboard size={28} /> Dashboard
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {[
            { label: 'Overview', icon: <LayoutDashboard size={18} />, active: true },
            { label: 'My Orders', icon: <Package size={18} /> },
            { label: 'Subscriptions', icon: <Clock size={18} /> },
            { label: 'Payments', icon: <CreditCard size={18} /> },
            { label: 'Settings', icon: <Settings size={18} /> },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                item.active 
                  ? 'bg-accent text-white dark:text-black shadow-lg shadow-accent/20' 
                  : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-border-custom">
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 md:p-12 max-w-7xl mx-auto w-full pb-24 lg:pb-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 lg:mb-12">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="space-y-1 lg:space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-text-primary">
                Account <span className="text-accent">Portal</span>
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary font-medium">Welcome back.</p>
            </div>
            {/* Mobile Logout */}
            <button 
              onClick={() => navigate('/login')}
              className="lg:hidden p-3 bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 lg:gap-4 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full md:w-auto">
            <SettingsControls />
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Search orders..."
                className="w-full pl-12 pr-6 py-3 lg:py-3 bg-bg-secondary border border-border-custom rounded-2xl focus:outline-none focus:border-accent transition-all lg:w-64 text-sm"
              />
            </div>
            <button className="p-3 bg-bg-secondary border border-border-custom rounded-2xl text-text-secondary hover:text-accent transition-all relative shrink-0">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-bg-secondary"></span>
            </button>
            <div className="hidden lg:flex w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 items-center justify-center text-accent font-black shrink-0">
              SA
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-secondary border border-border-custom rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg hover:border-accent/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="p-2 sm:p-3 bg-bg-primary rounded-xl sm:rounded-2xl text-accent group-hover:scale-110 transition-transform">
                  {React.cloneElement(stat.icon as React.ReactElement, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                </div>
                <span className={`text-[8px] sm:text-xs font-black uppercase tracking-widest ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-xl sm:text-3xl font-black text-text-primary">{stat.value}</div>
                <div className="text-[8px] sm:text-xs font-black uppercase tracking-widest text-text-secondary">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-bg-secondary border border-border-custom rounded-[2.5rem] p-8 md:p-10 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Recent <span className="text-accent">Orders</span></h3>
              <button className="text-xs font-black uppercase tracking-widest text-accent hover:underline flex items-center gap-2">
                View All <ChevronRight size={14} />
              </button>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-custom">
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-text-secondary">Order ID</th>
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-text-secondary">Date</th>
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-text-secondary">Status</th>
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-text-secondary">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-custom">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="group hover:bg-bg-primary/50 transition-colors">
                      <td className="py-6 text-sm font-black text-text-primary">{order.id}</td>
                      <td className="py-6 text-sm text-text-secondary">{order.date}</td>
                      <td className="py-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                          order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                          order.status === 'Shipped' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-text-secondary/10 text-text-secondary'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-6 text-sm font-black text-accent">{order.total}</td>
                      <td className="py-6 text-right">
                        <button className="p-2 bg-bg-primary border border-border-custom rounded-xl text-text-secondary hover:text-accent transition-all">
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Membership Card */}
            <div className="bg-accent rounded-[2.5rem] p-8 text-white dark:text-black shadow-xl shadow-accent/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                <ShieldCheck size={120} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-80">
                  <ShieldCheck size={14} /> Premium Member
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
                  Platinum <br/>Allocation
                </h3>
                <p className="text-xs font-medium opacity-80 leading-relaxed">
                  You have priority access to the next limited release of Japanese Harmony Whiskey.
                </p>
                <button className="w-full py-4 bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all">
                  Claim Allocation
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-bg-secondary border border-border-custom rounded-[2.5rem] p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">Quick <span className="text-accent">Actions</span></h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center gap-3 p-6 bg-bg-primary border border-border-custom rounded-3xl hover:border-accent transition-all group">
                  <Package className="text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black uppercase tracking-widest">Reorder</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-3 p-6 bg-bg-primary border border-border-custom rounded-3xl hover:border-accent transition-all group">
                  <CreditCard className="text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black uppercase tracking-widest">Top Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-border-custom z-50 px-4 py-2 flex justify-around items-center pb-safe">
        {[
          { label: 'Overview', icon: <LayoutDashboard size={20} />, active: true },
          { label: 'Orders', icon: <Package size={20} /> },
          { label: 'Subs', icon: <Clock size={20} /> },
          { label: 'Pay', icon: <CreditCard size={20} /> },
          { label: 'Settings', icon: <Settings size={20} /> },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              item.active 
                ? 'text-accent' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

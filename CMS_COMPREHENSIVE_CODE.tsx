/*
 * ======================================================================================
 * COMPREHENSIVE CMS CODEBASE ANALYSIS
 * ======================================================================================
 * This file consolidates the core logic and styling for the Admin CMS into a single
 * reference document. It includes the main Admin page component, the settings controls,
 * and the critical CSS that powers the UI animations.
 * 
 * SECTIONS:
 * 1. src/pages/Admin.tsx (Main CMS Logic)
 * 2. src/components/SettingsControls.tsx (Theme/Font Toggles)
 * 3. src/index.css (Critical Styling & Animations)
 */

/* ======================================================================================
 * SECTION 1: src/pages/Admin.tsx
 * ======================================================================================
 * This is the main dashboard component. It handles:
 * - State management for Products, Wholesale Crates, and Meetups
 * - CRUD operations (Create, Read, Update, Delete) via API
 * - Modal management for forms
 * - Responsive layout rendering (Sidebar + Main Content)
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Package, Calendar, Plus, Search, Edit2, Trash2, LogOut,
  Bell, Box, ShieldCheck, X, Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SettingsControls } from '../components/SettingsControls';

// --- Types ---
type Tab = 'fridge' | 'wholesale' | 'meetups';

// --- Main Component ---
export default function Admin() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<Tab>('fridge');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Data States (Fetched from API)
  const [products, setProducts] = useState<any[]>([]);
  const [crates, setCrates] = useState<any[]>([]);
  const [meetups, setMeetups] = useState<any[]>([]);

  // Modal Visibility States
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isCrateModalOpen, setCrateModalOpen] = useState(false);
  const [isMeetupModalOpen, setMeetupModalOpen] = useState(false);
  
  // Editing State (null = creating new, object = editing existing)
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form States
  const [productForm, setProductForm] = useState({ name: '', price: 0, stock: 0, category: '', image: '', size: '' });
  const [crateForm, setCrateForm] = useState({ name: '', qty: '', price: '', image: '', description: '', options: '' });
  const [meetupForm, setMeetupForm] = useState({ title: '', date: '', time: '', description: '', image: '' });
  
  // Upload State
  const [isUploading, setIsUploading] = useState(false);

  // --- Image Upload Handler ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setForm: Function, formState: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setForm({ ...formState, image: data.url });
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  // --- Initial Data Fetch ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, cRes, mRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/wholesale'),
        fetch('/api/meetups')
      ]);
      setProducts(await pRes.json());
      setCrates(await cRes.json());
      setMeetups(await mRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // --- Product Logic (The Fridge) ---
  const openProductModal = (product?: any) => {
    if (product) {
      setEditingItem(product);
      setProductForm(product);
    } else {
      setEditingItem(null);
      setProductForm({ name: '', price: 0, stock: 0, category: '', image: '', size: '' });
    }
    setProductModalOpen(true);
  };

  const saveProduct = async () => {
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/products/${editingItem.id}` : '/api/products';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productForm)
    });
    setProductModalOpen(false);
    fetchData();
  };

  const deleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  // --- Wholesale Logic (Crates) ---
  const openCrateModal = (crate?: any) => {
    if (crate) {
      setEditingItem(crate);
      setCrateForm({ ...crate, options: crate.options.join(', ') });
    } else {
      setEditingItem(null);
      setCrateForm({ name: '', qty: '', price: '', image: '', description: '', options: '' });
    }
    setCrateModalOpen(true);
  };

  const saveCrate = async () => {
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/wholesale/${editingItem.id}` : '/api/wholesale';
    const payload = { ...crateForm, options: crateForm.options.split(',').map(s => s.trim()) };
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setCrateModalOpen(false);
    fetchData();
  };

  const deleteCrate = async (id: number) => {
    if (confirm('Are you sure you want to delete this crate?')) {
      await fetch(`/api/wholesale/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  // --- Meetup Logic (Events) ---
  const openMeetupModal = (meetup?: any) => {
    if (meetup) {
      setEditingItem(meetup);
      setMeetupForm(meetup);
    } else {
      setEditingItem(null);
      setMeetupForm({ title: '', date: '', time: '', description: '', image: '' });
    }
    setMeetupModalOpen(true);
  };

  const saveMeetup = async () => {
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/meetups/${editingItem.id}` : '/api/meetups';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meetupForm)
    });
    setMeetupModalOpen(false);
    fetchData();
  };

  const deleteMeetup = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await fetch(`/api/meetups/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  // --- Render Helpers ---
  const renderFridge = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">The <span className="text-accent">Fridge</span> Inventory</h2>
        {/* NOTE: .btn-cta class triggers the liquid animation defined in CSS */}
        <button onClick={() => openProductModal()} className="flex items-center gap-2 px-6 py-3 btn-cta text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-accent/20">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-bg-secondary border border-border-custom rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-custom bg-bg-primary/50">
                <th className="p-6 text-xs font-black uppercase tracking-widest text-text-secondary">Product</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-text-secondary">Category</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-text-secondary">Price</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-text-secondary">Stock</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-bg-primary/30 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border-custom overflow-hidden flex items-center justify-center p-2">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-text-primary">{product.name}</div>
                        <div className="text-[10px] text-text-secondary uppercase tracking-widest">{product.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-accent text-[10px] font-black uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-6 text-sm font-black text-text-primary">₦{product.price.toLocaleString()}</td>
                  <td className="p-6">
                    <span className="text-sm font-black text-text-primary">{product.stock}</span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openProductModal(product)} className="p-2 hover:text-accent transition-colors"><Edit2 size={16} /></button>
                      <button onClick={() => deleteProduct(product.id)} className="p-2 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards (Responsive Fallback) */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-bg-secondary border border-border-custom rounded-2xl p-4 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-bg-primary border border-border-custom overflow-hidden flex items-center justify-center p-2 shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-grow">
                <div className="text-sm font-black text-text-primary">{product.name}</div>
                <div className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">{product.size}</div>
                <span className="text-accent text-[8px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-text-primary">₦{product.price.toLocaleString()}</div>
                <div className="mt-1">
                  <span className="text-xs font-black text-text-primary">{product.stock}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-custom">
              <button onClick={() => openProductModal(product)} className="p-2 bg-bg-primary rounded-lg text-text-secondary hover:text-accent transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => deleteProduct(product.id)} className="p-2 bg-bg-primary rounded-lg text-text-secondary hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWholesale = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">Wholesale <span className="text-accent">Crates</span></h2>
        <button onClick={() => openCrateModal()} className="flex items-center gap-2 px-6 py-3 btn-cta text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-accent/20">
          <Plus size={16} /> Add Crate
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6">
        {crates.map((crate) => (
          <div key={crate.id} className="bg-bg-secondary border border-border-custom rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl flex flex-col sm:flex-row gap-3 sm:gap-6 group hover:border-accent/50 transition-all">
            <div className="w-full sm:w-32 h-24 sm:h-32 rounded-xl sm:rounded-2xl bg-bg-primary border border-border-custom overflow-hidden shrink-0">
              <img src={crate.image} alt={crate.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-grow space-y-2 sm:space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[10px] sm:text-lg font-black uppercase tracking-tight text-text-primary line-clamp-2">{crate.name}</h3>
                  <p className="text-[8px] sm:text-xs text-text-secondary font-bold uppercase tracking-widest">{crate.qty}</p>
                </div>
                <div className="flex gap-1 sm:gap-2 shrink-0">
                  <button onClick={() => openCrateModal(crate)} className="p-1 sm:p-2 hover:text-accent transition-colors"><Edit2 className="w-3 h-3 sm:w-[14px] sm:h-[14px]" /></button>
                  <button onClick={() => deleteCrate(crate.id)} className="p-1 sm:p-2 hover:text-rose-500 transition-colors"><Trash2 className="w-3 h-3 sm:w-[14px] sm:h-[14px]" /></button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 sm:pt-4 border-t border-border-custom gap-2 sm:gap-0">
                <div className="text-sm sm:text-xl font-black text-accent">{crate.price}</div>
                <div className="flex flex-wrap gap-1">
                  {crate.options?.slice(0, 2).map((opt: string) => (
                    <span key={opt} className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-bg-primary border border-border-custom rounded-full">
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMeetups = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">Meetup <span className="text-accent">Events</span></h2>
        <button onClick={() => openMeetupModal()} className="flex items-center gap-2 px-6 py-3 btn-cta text-white dark:text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-accent/20">
          <Plus size={16} /> Create Event
        </button>
      </div>

      <div className="bg-bg-secondary border border-border-custom rounded-3xl overflow-hidden shadow-xl">
        <div className="p-8 space-y-8">
          {meetups.map((event, idx) => (
            <div key={event.id} className={`flex flex-col md:flex-row gap-8 pb-8 ${idx !== meetups.length - 1 ? 'border-b border-border-custom' : ''}`}>
              <div className="w-full md:w-48 h-32 rounded-2xl bg-bg-primary border border-border-custom flex items-center justify-center text-accent overflow-hidden">
                {event.image ? (
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <Calendar size={48} />
                )}
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-text-primary">{event.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs font-black uppercase tracking-widest text-accent">{event.date}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">{event.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => openMeetupModal(event)} className="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-custom rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-accent transition-all">
                      <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => deleteMeetup(event.id)} className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-text-secondary font-light leading-relaxed max-w-2xl">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300 flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border-custom bg-bg-secondary hidden lg:flex flex-col sticky top-0 h-screen transition-colors duration-300">
        <div className="p-8 border-b border-border-custom">
          <div className="flex items-center gap-3 text-accent font-black uppercase italic tracking-tighter text-2xl">
            <LayoutDashboard size={28} /> CMS <span className="text-text-primary">Admin</span>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {[
            { id: 'fridge', label: 'The Fridge', icon: <Box size={18} /> },
            { id: 'wholesale', label: 'Wholesale', icon: <Package size={18} /> },
            { id: 'meetups', label: 'Meetups', icon: <Calendar size={18} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === item.id 
                  ? 'bg-accent text-white dark:text-black shadow-xl shadow-accent/20' 
                  : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-4">
          <div className="p-6 bg-bg-primary border border-border-custom rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-black">AD</div>
              <div>
                <div className="text-xs font-black uppercase tracking-tight">Admin User</div>
                <div className="text-[10px] text-text-secondary">Master Access</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-3 bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 md:p-12 max-w-7xl mx-auto w-full pb-24 lg:pb-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 lg:mb-16">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="space-y-1 lg:space-y-2">
              <div className="flex items-center gap-2 text-accent text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] mb-1 lg:mb-2">
                <ShieldCheck size={14} /> System Management
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-text-primary leading-none">
                Control <span className="text-accent">Center</span>
              </h1>
            </div>
            {/* Mobile Logout */}
            <button 
              onClick={handleLogout}
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
                placeholder="Search everything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 lg:py-4 bg-bg-secondary border border-border-custom rounded-2xl focus:outline-none focus:border-accent transition-all lg:w-80 text-sm"
              />
            </div>
            <button className="p-3 lg:p-4 bg-bg-secondary border border-border-custom rounded-2xl text-text-secondary hover:text-accent transition-all relative shrink-0">
              <Bell size={20} />
              <span className="absolute top-2 lg:top-3 right-2 lg:right-3 w-2 lg:w-2.5 h-2 lg:h-2.5 bg-accent rounded-full border-2 border-bg-secondary"></span>
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'fridge' && renderFridge()}
          {activeTab === 'wholesale' && renderWholesale()}
          {activeTab === 'meetups' && renderMeetups()}
        </motion.div>
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-border-custom z-50 px-4 py-2 flex justify-around items-center pb-safe">
        {[
          { id: 'fridge', label: 'Fridge', icon: <Box size={20} /> },
          { id: 'wholesale', label: 'Wholesale', icon: <Package size={20} /> },
          { id: 'meetups', label: 'Meetups', icon: <Calendar size={20} /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'text-accent' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Product Modal */}
      <AnimatePresence>
        {isProductModalOpen && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-bg-secondary border border-border-custom rounded-3xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">{editingItem ? 'Edit Product' : 'Add Product'}</h3>
                <button onClick={() => setProductModalOpen(false)} className="p-2 hover:bg-bg-primary rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Name" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                <div className="flex gap-4">
                  <input type="number" placeholder="Price" value={productForm.price} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                  <input type="number" placeholder="Stock" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: Number(e.target.value)})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                </div>
                <input type="text" placeholder="Category" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                <input type="text" placeholder="Size" value={productForm.size} onChange={e => setProductForm({...productForm, size: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Image</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Image URL" value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                    <label className="flex items-center justify-center px-4 bg-bg-primary border border-border-custom rounded-xl cursor-pointer hover:border-accent transition-colors shrink-0">
                      {isUploading ? <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" /> : <Upload size={20} className="text-text-secondary" />}
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, setProductForm, productForm)} disabled={isUploading} />
                    </label>
                  </div>
                </div>
                <button onClick={saveProduct} className="w-full py-3 btn-cta text-white dark:text-black font-black uppercase tracking-widest rounded-xl">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crate Modal */}
      <AnimatePresence>
        {isCrateModalOpen && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-bg-secondary border border-border-custom rounded-3xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">{editingItem ? 'Edit Crate' : 'Add Crate'}</h3>
                <button onClick={() => setCrateModalOpen(false)} className="p-2 hover:bg-bg-primary rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Name" value={crateForm.name} onChange={e => setCrateForm({...crateForm, name: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                <div className="flex gap-4">
                  <input type="text" placeholder="Quantity (e.g. 12 Bottles)" value={crateForm.qty} onChange={e => setCrateForm({...crateForm, qty: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                  <input type="text" placeholder="Price (e.g. ₦20)" value={crateForm.price} onChange={e => setCrateForm({...crateForm, price: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Image</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Image URL" value={crateForm.image} onChange={e => setCrateForm({...crateForm, image: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                    <label className="flex items-center justify-center px-4 bg-bg-primary border border-border-custom rounded-xl cursor-pointer hover:border-accent transition-colors shrink-0">
                      {isUploading ? <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" /> : <Upload size={20} className="text-text-secondary" />}
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, setCrateForm, crateForm)} disabled={isUploading} />
                    </label>
                  </div>
                </div>
                <textarea placeholder="Description" value={crateForm.description} onChange={e => setCrateForm({...crateForm, description: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl h-24" />
                <input type="text" placeholder="Options (comma separated)" value={crateForm.options} onChange={e => setCrateForm({...crateForm, options: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                <button onClick={saveCrate} className="w-full py-3 btn-cta text-white dark:text-black font-black uppercase tracking-widest rounded-xl">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meetup Modal */}
      <AnimatePresence>
        {isMeetupModalOpen && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-bg-secondary border border-border-custom rounded-3xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">{editingItem ? 'Edit Event' : 'Add Event'}</h3>
                <button onClick={() => setMeetupModalOpen(false)} className="p-2 hover:bg-bg-primary rounded-xl"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Title" value={meetupForm.title} onChange={e => setMeetupForm({...meetupForm, title: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                <div className="flex gap-4">
                  <input type="text" placeholder="Date" value={meetupForm.date} onChange={e => setMeetupForm({...meetupForm, date: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                  <input type="text" placeholder="Time" value={meetupForm.time} onChange={e => setMeetupForm({...meetupForm, time: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Image (optional)</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Image URL" value={meetupForm.image} onChange={e => setMeetupForm({...meetupForm, image: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl" />
                    <label className="flex items-center justify-center px-4 bg-bg-primary border border-border-custom rounded-xl cursor-pointer hover:border-accent transition-colors shrink-0">
                      {isUploading ? <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" /> : <Upload size={20} className="text-text-secondary" />}
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, setMeetupForm, meetupForm)} disabled={isUploading} />
                    </label>
                  </div>
                </div>
                <textarea placeholder="Description" value={meetupForm.description} onChange={e => setMeetupForm({...meetupForm, description: e.target.value})} className="w-full p-3 bg-bg-primary border border-border-custom rounded-xl h-24" />
                <button onClick={saveMeetup} className="w-full py-3 btn-cta text-white dark:text-black font-black uppercase tracking-widest rounded-xl">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

/* ======================================================================================
 * SECTION 2: src/components/SettingsControls.tsx
 * ======================================================================================
 * Controls for toggling Dark Mode and Accessible Fonts.
 * Uses localStorage to persist user preferences.
 */

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Type } from 'lucide-react';

export function SettingsControls() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: light)').matches);
    }
    return false;
  });

  const [isAccessibleFonts, setIsAccessibleFonts] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessibleFonts') === 'true';
    }
    return false;
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    window.dispatchEvent(new Event('theme-changed'));
  };

  const toggleFonts = () => {
    const newFonts = !isAccessibleFonts;
    setIsAccessibleFonts(newFonts);
    if (newFonts) {
      document.documentElement.classList.add('accessible-fonts');
      localStorage.setItem('accessibleFonts', 'true');
    } else {
      document.documentElement.classList.remove('accessible-fonts');
      localStorage.setItem('accessibleFonts', 'false');
    }
    window.dispatchEvent(new Event('font-changed'));
  };

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem('theme') === 'dark');
    };
    const handleFontChange = () => {
      setIsAccessibleFonts(localStorage.getItem('accessibleFonts') === 'true');
    };

    window.addEventListener('theme-changed', handleThemeChange);
    window.addEventListener('font-changed', handleFontChange);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      window.removeEventListener('font-changed', handleFontChange);
    };
  }, []);

  return (
    <div className="flex gap-2">
      <button 
        onClick={toggleTheme}
        className="p-3 bg-bg-secondary border border-border-custom rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:border-accent transition-colors text-text-secondary hover:text-text-primary"
        title="Toggle Theme"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button 
        onClick={toggleFonts}
        className={`p-3 bg-bg-secondary border border-border-custom rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:border-accent transition-colors ${isAccessibleFonts ? 'text-accent border-accent' : 'text-text-secondary hover:text-text-primary'}`}
        title="Toggle Accessible Fonts"
      >
        <Type size={18} />
      </button>
    </div>
  );
}

/* ======================================================================================
 * SECTION 3: src/index.css (Relevant Snippets)
 * ======================================================================================
 * This CSS defines the "Liquid Fill" animation used on the .btn-cta class.
 */

/*
  .btn-cta {
    position: relative;
    overflow: hidden;
    background-color: transparent;
    border: none !important;
    z-index: 1;
    
    /* Standard Color Transition */
    color: black !important;
    /* Transition matches the wave fill duration */
    transition: color 1s ease-in-out, transform 0.3s ease, box-shadow 0.3s ease;
  }

  /* Ensure text/icons are part of the parent context */
  .btn-cta > * {
    position: static;
    z-index: auto;
  }

  /* The Orange Background (Base) */
  .btn-cta::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--accent);
    z-index: -2; /* Behind everything */
  }

  /* The Rising Water Level (Dark Amber) */
  .btn-cta::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%; /* Start empty */
    background-color: #78350f; /* amber-900 (Dark Amber) */
    transition: height 1s ease-in-out; /* Smooth 1s fill */
    z-index: -1; /* Between Orange bg and Text */
  }

  /* Hover State - Fill the Cup */
  .btn-cta:hover::before {
    height: 100%; /* Fill to top */
  }

  /* Hover State - Slide Text Color */
  .btn-cta:hover {
    color: white !important;
    transform: scale(1.05);
    box-shadow: 0 0 25px var(--accent-glow);
  }
*/

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  LayoutDashboard, 
  Package, 
  Calendar, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  LogOut,
  Bell,
  Box,
  ShieldCheck,
  X,
  Check,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInventory, InventoryItem, MeetupItem } from '../context/InventoryContext';
import { SettingsControls } from '../components/SettingsControls';

type Tab = 'fridge' | 'wholesale' | 'meetups';

const FRIDGE_CATEGORIES = ['Spirits', 'Sodas', 'Juiceboxes', 'Water', 'Snacks'];
const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80';
const DEFAULT_CRATE_IMAGE = 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('fridge');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Product / Crate Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Spirits');
  const [price, setPrice] = useState('20');
  const [stock, setStock] = useState('15');
  const [size, setSize] = useState('75cl');
  const [image, setImage] = useState('');
  const [flavorNotes, setFlavorNotes] = useState('Smoky, Oaky, Vanilla');
  const [isFeatured, setIsFeatured] = useState(false);

  // Meetup Form State
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('6:00 PM - 9:00 PM');
  const [eventLocation, setEventLocation] = useState('Main Lounge');
  const [eventDescription, setEventDescription] = useState('');

  const navigate = useNavigate();
  const { fridge, wholesale, meetups, setFridge, setWholesale, setMeetups } = useInventory();

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleDelete = (tab: Tab, id: number) => {
    if (tab === 'fridge') setFridge((prev) => prev.filter((item) => item.id !== id));
    if (tab === 'wholesale') setWholesale((prev) => prev.filter((item) => item.id !== id));
    if (tab === 'meetups') setMeetups((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFeatured = (id: number) => {
    setFridge((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFeatured: !item.isFeatured } : item))
    );
  };

  const openAddModal = () => {
    setModalMode('add');
    setEditingId(null);
    if (activeTab === 'fridge') {
      setName('');
      setCategory('Spirits');
      setPrice('20');
      setStock('24');
      setSize('75cl');
      setImage('');
      setFlavorNotes('Smooth, Crisp, Balanced');
      setIsFeatured(fridge.filter((i) => i.isFeatured).length < 4);
    } else if (activeTab === 'wholesale') {
      setName('');
      setCategory('Wholesale');
      setPrice('500');
      setStock('12');
      setSize('24 Bottles');
      setImage('');
    } else {
      setEventName('');
      setEventDate('Every Friday');
      setEventTime('7:00 PM - 10:00 PM');
      setEventLocation('Main Lounge');
      setEventDescription('');
    }
    setIsModalOpen(true);
  };

  const openEditProductModal = (item: InventoryItem) => {
    setModalMode('edit');
    setEditingId(item.id);
    setName(item.name);
    setCategory(item.category || 'Spirits');
    setPrice(String(item.price));
    setStock(String(item.stock));
    setSize(item.size || '75cl');
    setImage(item.image || '');
    setFlavorNotes(item.flavorProfile ? item.flavorProfile.join(', ') : 'Smooth, Crisp, Balanced');
    setIsFeatured(!!item.isFeatured);
    setIsModalOpen(true);
  };

  const openEditMeetupModal = (event: MeetupItem) => {
    setModalMode('edit');
    setEditingId(event.id);
    setEventName(event.name || event.title || '');
    setEventDate(event.date || '');
    setEventTime(event.time || '7:00 PM - 10:00 PM');
    setEventLocation(event.location || 'Main Lounge');
    setEventDescription(event.description || '');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'fridge') {
      if (!name.trim()) return;
      const parsedFlavors = flavorNotes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const newProduct: InventoryItem = {
        id: modalMode === 'edit' && editingId !== null
          ? editingId
          : Math.max(0, ...fridge.map((i) => i.id)) + 1,
        name: name.trim(),
        category,
        price: Math.max(0, Number(price) || 0),
        stock: Math.max(0, Number(stock) || 0),
        size: size.trim() || '75cl',
        image: image.trim() || DEFAULT_PRODUCT_IMAGE,
        flavorProfile: parsedFlavors.length > 0 ? parsedFlavors : ['Smooth', 'Balanced'],
        isFeatured,
      };

      if (modalMode === 'edit' && editingId !== null) {
        setFridge((prev) => prev.map((item) => (item.id === editingId ? newProduct : item)));
      } else {
        setFridge((prev) => [newProduct, ...prev]);
        setCurrentPage(1);
      }
    } else if (activeTab === 'wholesale') {
      if (!name.trim()) return;
      const newCrate: InventoryItem = {
        id: modalMode === 'edit' && editingId !== null
          ? editingId
          : Math.max(100, ...wholesale.map((i) => i.id)) + 1,
        name: name.trim(),
        category: 'Wholesale',
        price: Math.max(0, Number(price) || 0),
        stock: Math.max(0, Number(stock) || 0),
        size: size.trim() || '12 Bottles',
        qty: size.trim() || '12 Bottles',
        image: image.trim() || DEFAULT_CRATE_IMAGE,
      };

      if (modalMode === 'edit' && editingId !== null) {
        setWholesale((prev) => prev.map((item) => (item.id === editingId ? newCrate : item)));
      } else {
        setWholesale((prev) => [newCrate, ...prev]);
      }
    } else if (activeTab === 'meetups') {
      if (!eventName.trim()) return;
      const newMeetup: MeetupItem = {
        id: modalMode === 'edit' && editingId !== null
          ? editingId
          : Math.max(200, ...meetups.map((i) => i.id)) + 1,
        name: eventName.trim(),
        title: eventName.trim(),
        date: eventDate.trim() || 'Upcoming',
        time: eventTime.trim() || '7:00 PM - 10:00 PM',
        location: eventLocation.trim() || 'Main Hall',
        description: eventDescription.trim() || 'Join fellow enthusiasts for a curated evening session.',
      };

      if (modalMode === 'edit' && editingId !== null) {
        setMeetups((prev) => prev.map((item) => (item.id === editingId ? newMeetup : item)));
      } else {
        setMeetups((prev) => [newMeetup, ...prev]);
      }
    }

    setIsModalOpen(false);
  };

  // Filtered Lists based on Search Query
  const q = searchQuery.trim().toLowerCase();
  const filteredFridge = fridge.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
  const filteredWholesale = wholesale.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.size.toLowerCase().includes(q)
  );
  const filteredMeetups = meetups.filter(
    (m) =>
      !q ||
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.title && m.title.toLowerCase().includes(q)) ||
      (m.location && m.location.toLowerCase().includes(q))
  );

  // Pagination for Fridge
  const totalPages = Math.max(1, Math.ceil(filteredFridge.length / itemsPerPage));
  const paginatedFridge = filteredFridge.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const featuredCount = fridge.filter((p) => p.isFeatured).length;

  const renderFridge = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">
            The <span className="text-accent">Fridge</span> Inventory
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Starred items ({featuredCount} active) appear in the Home Page <span className="text-accent font-bold">Featured Selections</span>.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="btn-cta flex items-center gap-2 px-5 sm:px-6 py-3 font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-accent/20 cursor-pointer shrink-0"
        >
          <Plus size={16} /> <span>Add Product</span>
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-bg-secondary border border-border-custom rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-custom bg-bg-primary/50">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Product</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Category</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Featured</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Price</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Stock</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              {paginatedFridge.map((product) => (
                <tr key={product.id} className="group hover:bg-bg-primary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-bg-primary border border-border-custom overflow-hidden flex items-center justify-center p-0.5 shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                          }}
                          className="w-full h-full object-cover rounded-md"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-text-primary">{product.name}</div>
                        <div className="text-[9px] text-text-secondary uppercase tracking-widest">{product.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[9px] font-bold uppercase tracking-widest rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(product.id)}
                      title={product.isFeatured ? 'Remove from Home Featured Selections' : 'Add to Home Featured Selections'}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-colors cursor-pointer ${
                        product.isFeatured
                          ? 'bg-accent/15 border-accent text-accent'
                          : 'bg-bg-primary border-border-custom text-text-secondary hover:border-accent/40 hover:text-text-primary'
                      }`}
                    >
                      <Star size={12} fill={product.isFeatured ? 'currentColor' : 'none'} />
                      <span>{product.isFeatured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-xs font-bold text-text-primary">₦{product.price.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-text-primary">{product.stock}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEditProductModal(product)}
                        title="Edit Product"
                        className="p-1.5 hover:text-accent transition-colors cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete('fridge', product.id)}
                        title="Delete Product"
                        className="p-1.5 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-border-custom bg-bg-primary/20 flex items-center justify-between">
          <span className="text-xs font-bold text-text-secondary">
            Showing {paginatedFridge.length} of {filteredFridge.length} products (Page {currentPage} of {totalPages})
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 border border-border-custom rounded-lg text-xs font-black uppercase tracking-widest hover:bg-bg-primary disabled:opacity-40 transition-all cursor-pointer"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 border border-border-custom rounded-lg text-xs font-black uppercase tracking-widest hover:bg-bg-primary disabled:opacity-40 transition-all cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paginatedFridge.map((product) => (
          <div key={product.id} className="bg-bg-secondary border border-border-custom rounded-2xl p-4 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-bg-primary border border-border-custom overflow-hidden flex items-center justify-center p-1 shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                  }}
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow">
                <div className="text-sm font-black text-text-primary">{product.name}</div>
                <div className="text-[10px] text-text-secondary uppercase tracking-widest mb-1">{product.size}</div>
                <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-text-primary">₦{product.price.toLocaleString()}</div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span className="text-xs font-black text-text-primary">{product.stock}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border-custom">
              <button
                type="button"
                onClick={() => toggleFeatured(product.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-colors cursor-pointer ${
                  product.isFeatured
                    ? 'bg-accent/15 border-accent text-accent'
                    : 'bg-bg-primary border-border-custom text-text-secondary'
                }`}
              >
                <Star size={12} fill={product.isFeatured ? 'currentColor' : 'none'} />
                <span>{product.isFeatured ? 'Featured on Home' : 'Set Featured'}</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditProductModal(product)}
                  className="p-2 bg-bg-primary rounded-lg text-text-secondary hover:text-accent transition-colors cursor-pointer"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete('fridge', product.id)}
                  className="p-2 bg-bg-primary rounded-lg text-text-secondary hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border border-border-custom rounded-lg text-xs font-black uppercase tracking-widest hover:bg-bg-primary disabled:opacity-40 transition-all cursor-pointer"
          >
            Prev
          </button>
          <span className="text-[10px] font-bold text-text-secondary">
            Page {currentPage} / {totalPages} ({filteredFridge.length} items)
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 border border-border-custom rounded-lg text-xs font-black uppercase tracking-widest hover:bg-bg-primary disabled:opacity-40 transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderWholesale = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">
          Wholesale <span className="text-accent">Crates</span>
        </h2>
        <button
          type="button"
          onClick={openAddModal}
          className="btn-cta flex items-center gap-2 px-5 sm:px-6 py-3 font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-accent/20 cursor-pointer shrink-0"
        >
          <Plus size={16} /> <span>Add Crate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredWholesale.map((crate) => (
          <div key={crate.id} className="bg-bg-secondary border border-border-custom rounded-xl p-3 shadow-md flex gap-3 group hover:border-accent/50 transition-all">
            <div className="w-20 h-20 rounded-lg bg-bg-primary border border-border-custom overflow-hidden shrink-0">
              <img
                src={crate.image}
                alt={crate.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_CRATE_IMAGE;
                }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-grow space-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-tight text-text-primary line-clamp-1">{crate.name}</h3>
                  <p className="text-[9px] text-text-secondary font-bold uppercase tracking-widest">{crate.size}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEditProductModal(crate)}
                    className="p-1 hover:text-accent transition-colors cursor-pointer"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete('wholesale', crate.id)}
                    className="p-1 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border-custom">
                <div className="text-sm font-bold text-accent">₦{crate.price.toLocaleString()}</div>
                <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{crate.stock} Crates</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMeetups = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter">
          Meetup <span className="text-accent">Events</span>
        </h2>
        <button
          type="button"
          onClick={openAddModal}
          className="btn-cta flex items-center gap-2 px-5 sm:px-6 py-3 font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-accent/20 cursor-pointer shrink-0"
        >
          <Plus size={16} /> <span>Create Event</span>
        </button>
      </div>

      <div className="bg-bg-secondary border border-border-custom rounded-2xl overflow-hidden shadow-md">
        <div className="p-4 space-y-4">
          {filteredMeetups.map((event, idx) => (
            <div key={event.id} className={`flex gap-4 pb-4 ${idx !== filteredMeetups.length - 1 ? 'border-b border-border-custom' : ''}`}>
              <div className="w-16 h-16 rounded-lg bg-bg-primary border border-border-custom flex items-center justify-center text-accent shrink-0">
                <Calendar size={24} />
              </div>
              <div className="flex-grow space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold uppercase italic tracking-tighter text-text-primary">
                      {event.name || event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-accent">{event.date}</span>
                      {event.time && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary">• {event.time}</span>
                      )}
                      {event.location && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary">• {event.location}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => openEditMeetupModal(event)}
                      className="p-1 hover:text-accent transition-colors cursor-pointer"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete('meetups', event.id)}
                      className="p-1 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Instant, zero-glitch modal rendering without GPU-heavy backdrop-blur or competing keyframe animations
  const modalPortal =
    typeof document !== 'undefined' && isModalOpen
      ? createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 z-0 transition-opacity"
            />
            <div className="relative z-10 m-auto w-full max-w-lg max-h-[88vh] overflow-y-auto no-scrollbar bg-bg-secondary border border-border-custom rounded-3xl p-6 sm:p-8 shadow-2xl text-text-primary">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-custom">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent block mb-1">
                    CMS Inventory Manager
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight">
                    {modalMode === 'edit' ? 'Update' : 'Add New'}{' '}
                    {activeTab === 'fridge' ? 'Product' : activeTab === 'wholesale' ? 'Crate' : 'Event'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {activeTab !== 'meetups' ? (
                  <>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                        {activeTab === 'fridge' ? 'Product Name *' : 'Crate Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={activeTab === 'fridge' ? 'e.g. Aged Reserve Bourbon' : 'e.g. Premium Stout Crate'}
                        className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {activeTab === 'fridge' ? (
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                            Category
                          </label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                          >
                            {FRIDGE_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                            Crate Size / Units
                          </label>
                          <input
                            type="text"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            placeholder="e.g. 24 Bottles"
                            className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                          Price (₦) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                          Stock Units *
                        </label>
                        <input
                          type="number"
                          min="0"
                          required
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                        />
                      </div>

                      {activeTab === 'fridge' && (
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                            Bottle / Pack Size
                          </label>
                          <input
                            type="text"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            placeholder="e.g. 75cl, 50cl, Large"
                            className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                          />
                        </div>
                      )}
                    </div>

                    {activeTab === 'fridge' && (
                      <>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                            Tasting Notes (Comma-Separated)
                          </label>
                          <input
                            type="text"
                            value={flavorNotes}
                            onChange={(e) => setFlavorNotes(e.target.value)}
                            placeholder="e.g. Smoky, Oaky, Vanilla"
                            className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                          />
                        </div>

                        <label className="flex items-center justify-between p-3.5 bg-bg-primary border border-border-custom rounded-xl cursor-pointer hover:border-accent/50 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <Star size={16} className={isFeatured ? 'text-accent' : 'text-text-secondary'} fill={isFeatured ? 'currentColor' : 'none'} />
                            <div>
                              <div className="text-xs font-black uppercase tracking-wider text-text-primary">
                                Feature on Home Page
                              </div>
                              <div className="text-[10px] text-text-secondary">
                                Display in the Featured Selections showcase under the Hero
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                            className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                          />
                        </label>
                      </>
                    )}

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                        Product Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="e.g. Saturday Reserve Tasting"
                        className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                          Date / Schedule *
                        </label>
                        <input
                          type="text"
                          required
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          placeholder="e.g. Every Saturday"
                          className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                          Time
                        </label>
                        <input
                          type="text"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          placeholder="e.g. 6:00 PM - 9:00 PM"
                          className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g. Main Lounge"
                        className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1.5">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        placeholder="Describe the meetup experience..."
                        className="w-full px-4 py-3 bg-bg-primary border border-border-custom rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent resize-none"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-custom">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-cta-secondary px-5 py-3 rounded-xl border border-border-custom text-xs font-black uppercase tracking-widest cursor-pointer"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="btn-cta px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Check size={16} />
                    <span>{modalMode === 'edit' ? 'Save Changes' : 'Add To Inventory'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )
      : null;

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
              type="button"
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
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
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-3 bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
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
              <h1 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-text-primary leading-none">
                Control <span className="text-accent">Center</span>
              </h1>
            </div>
            {/* Mobile Logout */}
            <button 
              type="button"
              onClick={handleLogout}
              className="lg:hidden p-3 bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
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

        {/* Tab Content - Instant render without competing motion y-shifts */}
        <div>
          {activeTab === 'fridge' && renderFridge()}
          {activeTab === 'wholesale' && renderWholesale()}
          {activeTab === 'meetups' && renderMeetups()}
        </div>
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
            type="button"
            onClick={() => setActiveTab(item.id as Tab)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all cursor-pointer ${
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

      {/* Add / Edit Item Modal */}
      {modalPortal}
    </div>
  );
}

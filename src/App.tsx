import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Wholesale from './pages/Wholesale';
import Meetups from './pages/Meetups';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import EventDetail from './pages/EventDetail';
import BulkCrates from './pages/BulkCrates';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Signup from './pages/Signup';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="wholesale" element={<Wholesale />} />
          <Route path="wholesale/bulk" element={<BulkCrates />} />
          <Route path="wholesale/events/:eventId" element={<EventDetail />} />
          <Route path="meetups" element={<Meetups />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

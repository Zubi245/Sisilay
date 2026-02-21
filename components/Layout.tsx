import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, User, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  // Close mobile menu on route change for better UX
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white text-[10px] md:text-xs text-center py-2.5 tracking-widest uppercase px-4 font-medium">
        Free Shipping on Orders Above PKR 5000 • Premium Unstitched Suits
      </div>

      {/* Navbar */}
      <nav className="bg-[#FFFBF0] sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-black p-1">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo.png" 
              alt="Silsilay Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-md border-2 border-green-600"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-green-600">
              Silsilay
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex space-x-8 text-sm font-medium uppercase tracking-wide text-gray-700">
            <Link to="/" className="hover:text-green-600 transition-all duration-300 hover:scale-105 font-medium relative group transform hover:-translate-y-0.5">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop" className="hover:text-green-600 transition-all duration-300 hover:scale-105 font-medium relative group transform hover:-translate-y-0.5">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/category" className="hover:text-green-600 transition-all duration-300 hover:scale-105 font-medium relative group transform hover:-translate-y-0.5">
              Category
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="hover:text-green-600 transition-all duration-300 hover:scale-105 font-medium relative group transform hover:-translate-y-0.5">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="hover:text-green-600 transition-all duration-300 hover:scale-105 font-medium relative group transform hover:-translate-y-0.5">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/login" className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-110">
              <User size={20} />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-110 relative">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
            className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`bg-[#FFFBF0] w-[80%] max-w-sm h-full shadow-xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <img 
                   src="/logo.png" 
                   alt="Silsilay Logo" 
                   className="w-8 h-8 rounded-full object-cover shadow-md border-2 border-green-600"
                   onError={(e) => {
                     e.currentTarget.style.display = 'none';
                   }}
                 />
                 <span className="font-serif font-bold text-xl text-green-600">Silsilay</span>
               </div>
               <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex flex-col p-6 space-y-6 text-sm font-bold uppercase tracking-wide">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-gray-50 hover:text-green-600 hover:bg-green-50 transition-all duration-300 hover:translate-x-2 rounded">Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-gray-50 hover:text-green-600 hover:bg-green-50 transition-all duration-300 hover:translate-x-2 rounded">Shop</Link>
              <Link to="/category" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-gray-50 hover:text-green-600 hover:bg-green-50 transition-all duration-300 hover:translate-x-2 rounded">Category</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-gray-50 hover:text-green-600 hover:bg-green-50 transition-all duration-300 hover:translate-x-2 rounded">About Us</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 border-b border-gray-50 hover:text-green-600 hover:bg-green-50 transition-all duration-300 hover:translate-x-2 rounded">Contact</Link>
              {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 text-green-600 hover:bg-green-50 transition-all duration-300 hover:translate-x-2 rounded">Admin Dashboard</Link>}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-[#FFF8E7]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4 md:mb-6">
                <span className="text-green-400">Silsilay</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Premium unstitched suits designed for the modern woman. Experience luxury, elegance, and tradition in every thread.
              </p>
              <div className="flex space-x-4 text-gray-400">
                <Instagram size={20} className="hover:text-green-400 cursor-pointer transition-colors duration-300" />
                <Facebook size={20} className="hover:text-green-400 cursor-pointer transition-colors duration-300" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-serif mb-4 md:mb-6 text-green-400">Customer Care</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Shipping Policy</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Returns & Exchanges</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-4 md:mb-6 text-green-400">Contact Info</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                  <Phone size={16} />
                  <span>+92 300 1234567</span>
                </li>
                <li className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                  <Mail size={16} />
                  <span>support@silsilay.com</span>
                </li>
                <li className="hover:text-white transition-colors duration-300">
                  123 Fashion Avenue, Liberty Market,<br/>Lahore, Pakistan
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Silsilay. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/923001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 hover:bg-green-600 transition-all duration-300 hover:shadow-xl"
        aria-label="Contact on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="md:w-8 md:h-8">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.151-.174.2-.298.3-.495.099-.198.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>
  );
};
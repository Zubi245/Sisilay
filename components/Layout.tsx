import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X, User, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  // Close mobile menu on route change for better UX
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle navbar and footer visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Navbar logic
      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsNavbarVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsNavbarVisible(true);
      }
      
      // Footer logic - show when near bottom or scrolling up
      const distanceFromBottom = documentHeight - (currentScrollY + windowHeight);
      if (distanceFromBottom < 100 || currentScrollY < lastScrollY) {
        setIsFooterVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsFooterVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Navbar */}
      <nav 
        className={`bg-white sticky top-0 z-50 shadow-sm transition-transform duration-300 ease-in-out ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`} 
        style={{ borderBottom: '1px solid #E5E5E5' }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* Left: Menu Button (Always visible) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-1 focus:outline-none active:bg-transparent transition-opacity duration-250 hover:opacity-70 bg-white"
            style={{ color: '#111111', backgroundColor: '#FFFFFF' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo.png" 
              alt="Silsilay Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-md"
              style={{ border: '2px solid #000000' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tight" style={{ color: '#111111' }}>
              Silsilay
            </span>
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/cart" className="transition-all duration-300 hover:scale-110 relative hover:opacity-70" style={{ color: '#111111' }}>
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: '#000000' }}>
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Sidebar Menu (Works for both mobile and desktop) */}
        <div 
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`bg-white w-[80%] max-w-sm h-full shadow-xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center" style={{ borderBottom: '1px solid #E5E5E5' }}>
               <div className="flex items-center gap-2">
                 <img 
                   src="/logo.png" 
                   alt="Silsilay Logo" 
                   className="w-8 h-8 rounded-full object-cover shadow-md"
                   style={{ border: '2px solid #000000' }}
                   onError={(e) => {
                     e.currentTarget.style.display = 'none';
                   }}
                 />
                 <span className="font-serif font-bold text-xl" style={{ color: '#111111' }}>Silsilay</span>
               </div>
               <button 
                 onClick={() => setIsMenuOpen(false)}
                 className="focus:outline-none active:bg-transparent transition-opacity duration-250 hover:opacity-70 bg-white"
                 style={{ color: '#111111', backgroundColor: '#FFFFFF' }}
               >
                 <X size={24} />
               </button>
            </div>
            <div className="flex flex-col p-6 space-y-6 text-sm font-bold uppercase tracking-wide">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 transition-all duration-300 hover:translate-x-2 hover:opacity-70" style={{ borderBottom: '1px solid #E5E5E5', color: '#111111' }}>Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block py-2 transition-all duration-300 hover:translate-x-2 hover:opacity-70" style={{ borderBottom: '1px solid #E5E5E5', color: '#111111' }}>Shop</Link>
              <Link to="/category" onClick={() => setIsMenuOpen(false)} className="block py-2 transition-all duration-300 hover:translate-x-2 hover:opacity-70" style={{ borderBottom: '1px solid #E5E5E5', color: '#111111' }}>Category</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 transition-all duration-300 hover:translate-x-2 hover:opacity-70" style={{ borderBottom: '1px solid #E5E5E5', color: '#111111' }}>About Us</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 transition-all duration-300 hover:translate-x-2 hover:opacity-70" style={{ borderBottom: '1px solid #E5E5E5', color: '#111111' }}>Contact</Link>
              {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 transition-all duration-300 hover:translate-x-2 hover:opacity-70" style={{ color: '#111111' }}>Admin Dashboard</Link>}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-white">
        {children}
      </main>

      {/* Footer - Slides up from bottom */}
      <footer 
        className={`text-white pt-16 md:pt-20 pb-8 transition-transform duration-500 ease-in-out ${
          isFooterVisible ? 'translate-y-0' : 'translate-y-full'
        }`} 
        style={{ backgroundColor: '#000000' }}
      >
        <div className="container mx-auto px-4">
          {/* Newsletter Section - Top Center */}
          <div className="max-w-xl mx-auto text-center mb-12 md:mb-16">
            <h4 className="text-2xl md:text-3xl font-serif mb-3 text-white">Keep me updated</h4>
            <p className="text-sm md:text-base mb-6" style={{ color: '#CCCCCC' }}>
              Subscribe us and get more exciting offers and updates.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formElement = e.target as HTMLFormElement;
                const email = formElement.email.value;
                if (email) {
                  // Save to localStorage
                  const subscribers = JSON.parse(localStorage.getItem('silsilay_newsletter_subscribers') || '[]');
                  if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('silsilay_newsletter_subscribers', JSON.stringify(subscribers));
                    alert('Thank you for subscribing! You will receive updates on our latest collections.');
                  } else {
                    alert('You are already subscribed to our newsletter!');
                  }
                  formElement.reset();
                }
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 text-sm bg-white text-black focus:outline-none transition-all"
                style={{ border: '1px solid #FFFFFF' }}
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-250 whitespace-nowrap"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  color: '#000000',
                  border: '1px solid #FFFFFF'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-12" style={{ backgroundColor: '#333333' }}></div>

          {/* Footer Content - Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4 md:mb-6 text-white">
                Silsilay
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#CCCCCC' }}>
                Premium unstitched suits designed for the modern woman. Experience luxury, elegance, and tradition in every thread.
              </p>
              <div className="flex space-x-4">
                <Instagram size={20} className="hover:opacity-70 cursor-pointer transition-opacity duration-300" style={{ color: '#FFFFFF' }} />
                <Facebook size={20} className="hover:opacity-70 cursor-pointer transition-opacity duration-300" style={{ color: '#FFFFFF' }} />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-serif mb-4 md:mb-6 text-white">Customer Care</h4>
              <ul className="space-y-3 text-sm" style={{ color: '#CCCCCC' }}>
                <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Shipping Policy</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors duration-300">Returns & Exchanges</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-4 md:mb-6 text-white">Contact Info</h4>
              <ul className="space-y-4 text-sm" style={{ color: '#CCCCCC' }}>
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
          
          <div className="pt-6 text-center text-xs" style={{ borderTop: '1px solid #333333', color: '#888888' }}>
            &copy; {new Date().getFullYear()} Silsilay. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/923046361226" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
        style={{ backgroundColor: '#000000' }}
        aria-label="Contact on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="md:w-8 md:h-8">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.151-.174.2-.298.3-.495.099-.198.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>
  );
};
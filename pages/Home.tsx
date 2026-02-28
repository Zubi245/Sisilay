import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { db } from '../services/db';
import { Product, HeroSlide } from '../types';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Load data
  useEffect(() => {
    const loadData = () => {
      try {
        const enabledProducts = db.getEnabledProducts();
        // Get featured products, limit to 8 for desktop view
        const featured = enabledProducts
          .filter(p => p.featured)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
          .slice(0, 8);
        setProducts(featured.length > 0 ? featured : enabledProducts.slice(0, 8));

        const heroSlides = db.getHeroSlides();
        setSlides(heroSlides);
      } catch (error) {
        console.error('Error loading data:', error);
        setProducts([]);
        setSlides([]);
      }
    };

    loadData();

    // Listen for real-time updates
    const handleProductsUpdate = () => {
      console.log('Home: productsUpdated event received');
      loadData();
    };

    const handleHeroSlidesUpdate = () => {
      console.log('Home: heroSlidesUpdated event received');
      loadData();
    };

    window.addEventListener('productsUpdated', handleProductsUpdate);
    window.addEventListener('heroSlidesUpdated', handleHeroSlidesUpdate);

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
      window.removeEventListener('heroSlidesUpdated', handleHeroSlidesUpdate);
    };
  }, []);

  // Auto-slide for hero
  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  return (
    <div>
      <SEO 
        title="Silsilay - Luxury Unstitched Suits" 
        description="Discover the finest collection of unstitched ladies suits in Pakistan. Premium Lawn, Velvet, and Chiffon fabrics for every occasion."
      />

      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-gray-100">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10" />
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover animate-scale-slow"
              onError={(e) => (e.currentTarget.src = slides[0].image)}
              loading="lazy"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
              <p className="uppercase tracking-[0.3em] mb-4 text-xs md:text-sm animate-fade-in-up font-medium" style={{ color: '#FFFFFF' }}>New Arrivals 2024</p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 animate-fade-in-up leading-tight font-bold" style={{ animationDelay: '0.2s' }}>{slide.title}</h1>
              <p className="text-base md:text-xl font-light mb-6 md:mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>{slide.subtitle}</p>
              <Link 
                to="/shop" 
                className="text-white px-8 md:px-10 py-3.5 uppercase tracking-widest text-xs md:text-sm font-bold shadow-xl transition-all animate-fade-in-up transform hover:scale-105"
                style={{ backgroundColor: '#000000', animationDelay: '0.6s', border: '1px solid transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.border = '1px solid #000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.border = '1px solid transparent';
                }}
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 transition-all duration-300 ${
                  index === currentSlide ? 'w-8' : 'w-2.5'
                }`}
                style={{ 
                  backgroundColor: index === currentSlide ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '9999px'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12 md:py-20 bg-white">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm uppercase tracking-widest font-light mb-3" style={{ color: '#444444' }}>Curated For You</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: '#111111' }}>Featured Collection</h2>
          <div className="w-16 h-px mx-auto mt-5" style={{ backgroundColor: '#111111' }}></div>
        </div>

        <div className="product-grid w-full max-w-[1400px] mx-auto">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/shop" className="inline-flex items-center space-x-2 font-medium uppercase tracking-wide border-b pb-1 transition-all duration-300 text-sm hover:opacity-70" style={{ color: '#111111', borderColor: '#111111' }}>
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 bg-white">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-xs md:text-sm uppercase tracking-widest font-light mb-3" style={{ color: '#444444' }}>Testimonials</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: '#111111' }}>What Our Customers Say</h2>
          <div className="w-16 h-px mx-auto mt-5" style={{ backgroundColor: '#111111' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-[1200px] mx-auto">
          {/* Review 1 */}
          <div className="text-center px-6 py-8 transition-all duration-300 hover:transform hover:scale-105">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto" style={{ color: '#111111' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p className="text-sm md:text-base leading-relaxed mb-6 font-light" style={{ color: '#444444' }}>
              "Absolutely stunning quality! The fabric is luxurious and the embroidery is exquisite. Worth every penny."
            </p>
            <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
              <p className="font-serif text-base font-medium mb-1" style={{ color: '#111111' }}>Ayesha Khan</p>
              <p className="text-xs uppercase tracking-wider" style={{ color: '#888888' }}>Lahore</p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="text-center px-6 py-8 transition-all duration-300 hover:transform hover:scale-105">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto" style={{ color: '#111111' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p className="text-sm md:text-base leading-relaxed mb-6 font-light" style={{ color: '#444444' }}>
              "The best unstitched suits I've ever purchased. Premium quality and elegant designs. Highly recommended!"
            </p>
            <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
              <p className="font-serif text-base font-medium mb-1" style={{ color: '#111111' }}>Fatima Ahmed</p>
              <p className="text-xs uppercase tracking-wider" style={{ color: '#888888' }}>Karachi</p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="text-center px-6 py-8 transition-all duration-300 hover:transform hover:scale-105">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto" style={{ color: '#111111' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p className="text-sm md:text-base leading-relaxed mb-6 font-light" style={{ color: '#444444' }}>
              "Exceptional service and beautiful collection. The velvet suits are my favorite. Will definitely order again!"
            </p>
            <div className="pt-4" style={{ borderTop: '1px solid #E5E5E5' }}>
              <p className="font-serif text-base font-medium mb-1" style={{ color: '#111111' }}>Zara Malik</p>
              <p className="text-xs uppercase tracking-wider" style={{ color: '#888888' }}>Islamabad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

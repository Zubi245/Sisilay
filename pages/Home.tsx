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
              <p className="text-green-300 uppercase tracking-[0.3em] mb-4 text-xs md:text-sm animate-fade-in-up font-semibold">New Arrivals 2024</p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 animate-fade-in-up leading-tight font-bold" style={{ animationDelay: '0.2s' }}>{slide.title}</h1>
              <p className="text-base md:text-xl font-light mb-6 md:mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>{slide.subtitle}</p>
              <Link 
                to="/shop" 
                className="bg-green-500 text-white px-8 md:px-10 py-3.5 rounded-full uppercase tracking-widest text-xs md:text-sm font-bold hover:bg-green-600 hover:shadow-xl transition-all duration-300 animate-fade-in-up transform hover:scale-105"
                style={{ animationDelay: '0.6s' }}
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
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-green-500 w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12 md:py-20 bg-[#FFF8E7]">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-orange-600 text-xs md:text-sm uppercase tracking-widest font-bold mb-2">Curated For You</p>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 font-bold">Featured Collection</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="inline-flex items-center space-x-2 text-gray-900 hover:text-orange-600 font-semibold uppercase tracking-wide border-b-2 border-gray-900 hover:border-orange-600 pb-1 transition-all duration-300 transform hover:scale-105">
            <span>View All Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

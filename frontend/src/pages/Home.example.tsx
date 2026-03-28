import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { getProducts, getHeroSlides, Product, HeroSlide } from '../services/api';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured products
        const featuredProducts = await getProducts({ featured: true });
        setProducts(featuredProducts.slice(0, 8));

        // Fetch hero slides
        const heroSlides = await getHeroSlides();
        setSlides(heroSlides);
      } catch (error) {
        console.error('Error loading data:', error);
        setProducts([]);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEO 
        title="Silsilay - Luxury Unstitched Suits" 
        description="Discover the finest collection of unstitched ladies suits in Pakistan."
      />

      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-gray-100">
        {slides.map((slide, index) => (
          <div 
            key={slide._id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40 z-10" />
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
              <h1 className="font-serif text-4xl md:text-6xl mb-4">{slide.title}</h1>
              <p className="text-base md:text-xl mb-6">{slide.subtitle}</p>
              <Link 
                to="/shop" 
                className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all"
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
                className={`h-2.5 transition-all ${index === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/50'} rounded-full`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Featured Collection</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/shop" className="inline-flex items-center space-x-2 font-medium uppercase">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

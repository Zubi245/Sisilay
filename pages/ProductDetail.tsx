import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/SEO';
import { ChevronLeft, ChevronRight, ShoppingBag, Check } from 'lucide-react';

// More reliable fallback image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&auto=format';

const getSafeImage = (img: string | undefined | null) => {
  if (!img || typeof img !== 'string') return FALLBACK_IMAGE;
  const trimmed = img.trim();
  if (trimmed.length > 0 && (trimmed.startsWith('http') || trimmed.startsWith('data:'))) {
    // Add cache-busting parameter to ensure fresh load for HTTP URLs
    if (trimmed.startsWith('http')) {
      return `${trimmed}?t=${Date.now()}`;
    }
    // Return base64 URLs as-is
    return trimmed;
  }
  return FALLBACK_IMAGE;
};

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Zoom State
  const [isHovering, setIsHovering] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

  // Touch handling state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (id) {
      const found = db.getProductById(id);
      if (found) {
        setProduct(found);
      } else {
        navigate('/shop');
      }
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const nextImage = () => {
    if (!product) return;
    if (selectedImage < product.images.length - 1) {
      setSelectedImage(prev => prev + 1);
    } else {
      // Optional: Loop back to start
      setSelectedImage(0);
    }
  };

  const prevImage = () => {
    if (!product) return;
    if (selectedImage > 0) {
      setSelectedImage(prev => prev - 1);
    } else {
      // Optional: Loop to end
      setSelectedImage(product.images.length - 1);
    }
  };

  // Zoom Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable zoom on touch devices to prevent interference
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Swipe Handlers with 1:1 Tracking
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // Calculate visual drag offset
    const diff = currentTouch - touchStart;
    setDragOffset(diff);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
        setDragOffset(0);
        return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && product && selectedImage < product.images.length - 1) {
      setSelectedImage(prev => prev + 1);
    } else if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(prev => prev - 1);
    }
    
    // Reset drag
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-[#FFF8E7] min-h-screen">
      <SEO 
        title={product.name}
        description={product.description}
        image={product.images[0]}
        keywords={`${product.category}, ${product.fabric}, Unstitched Suit, Ladies Fashion`}
      />

      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-green-600 mb-8 transition-colors font-medium"
      >
        <ChevronLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images Carousel Section */}
        <div className="space-y-4 select-none">
          <div 
            className="aspect-[4/5] bg-[#FFFBF0] overflow-hidden rounded-xl relative group touch-pan-y shadow-md border-2 border-[#F0E5D0]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => !window.matchMedia('(pointer: coarse)').matches && setIsHovering(true)}
          >
            {/* Slider Track */}
            <div 
              className={`flex w-full h-full ${dragOffset === 0 ? 'transition-transform duration-500 ease-out' : ''}`}
              style={{ transform: `translateX(calc(-${selectedImage * 100}% + ${dragOffset}px))` }}
            >
              {product.images.map((img, idx) => (
                <div key={idx} className="w-full h-full flex-shrink-0 relative overflow-hidden">
                  <img 
                    key={img}
                    src={getSafeImage(img)} 
                    alt={`${product.name} - View ${idx + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover"
                    style={{
                      transformOrigin: zoomOrigin,
                      transform: isHovering && idx === selectedImage ? 'scale(1.5)' : 'scale(1)',
                      transition: 'transform 0.4s ease-out',
                      cursor: window.matchMedia('(pointer: coarse)').matches ? 'default' : 'zoom-in'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Sale Badge */}
            {product.salePrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg z-10 pointer-events-none">
                Sale
              </div>
            )}

            {/* Navigation Arrows (Desktop) */}
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 hidden md:block"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 hidden md:block"
                  aria-label="Next Image"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Mobile Dots Indicator */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 md:hidden z-10 pointer-events-none">
                  {product.images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
                        selectedImage === idx 
                        ? 'bg-white w-4' 
                        : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails Grid */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square overflow-hidden border-2 transition-all duration-300 rounded-lg relative ${
                  selectedImage === idx 
                  ? 'border-orange-500 opacity-100 ring-2 ring-orange-200' 
                  : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'
                }`}
                >
                <img
                  key={img}
                  src={getSafeImage(img)}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col h-full bg-[#FFF5E1] p-6 md:p-8 rounded-xl shadow-md border-2 border-[#F0E5D0]">
          <p className="text-gray-600 uppercase tracking-widest text-sm mb-2 font-medium">{product.category}</p>
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 font-bold">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-8 border-b-2 border-[#E8DCC8] pb-8">
            <div className="text-2xl md:text-3xl font-light">
              {product.salePrice ? (
                <>
                  <span className="text-green-700 font-bold mr-3">PKR {product.salePrice.toLocaleString()}</span>
                  <span className="text-gray-500 line-through text-lg md:text-xl">PKR {product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-gray-900 font-bold">PKR {product.price.toLocaleString()}</span>
              )}
            </div>
          </div>

          <div className="prose prose-sm text-gray-800 mb-8">
            <h3 className="text-gray-900 font-serif text-lg mb-2 font-semibold">Description</h3>
            <p className="mb-4">{product.description}</p>
            
            <h3 className="text-gray-900 font-serif text-lg mb-2 font-semibold">Fabric Details</h3>
            <p><strong>Type:</strong> {product.fabric}</p>
            <p><strong>Items Included:</strong> Shirt, Trouser, Dupatta</p>
          </div>

          <div className="mt-auto">
            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-4 rounded-full text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md ${
                  isAdded 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={20} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => navigate('/checkout')}
                className="flex-1 py-4 rounded-full text-sm uppercase tracking-widest font-bold bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Checkout</span>
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
              Free shipping on orders above PKR 5,000. 30-day return policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
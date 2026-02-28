import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Eye, X, Check } from 'lucide-react';

// More reliable fallback image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&auto=format';

const getPrimaryImage = (product: Product) => {
  if (!product || !product.images || !Array.isArray(product.images)) {
    return FALLBACK_IMAGE;
  }
  const raw = product.images[0];
  const trimmed = typeof raw === 'string' ? raw.trim() : '';
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

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Link to={`/product/${product.id}`} className="block h-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="group transition-all duration-300 relative h-full flex flex-col"
          style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}
        >
          {/* Image Container - 4:5 aspect ratio for tall outfit display */}
          <div className="relative overflow-hidden w-full" style={{ aspectRatio: '4/5' }}>
            <motion.img 
              key={product.images?.[0] || 'fallback'}
              src={getPrimaryImage(product)} 
              alt={product.name} 
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Optional wishlist icon - top right */}
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-white/85 backdrop-blur-sm p-2 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.button>
            
            {/* Very subtle hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/3 transition-all duration-600 pointer-events-none" />
            
            {/* Action Buttons - minimal and elegant */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleQuickView}
                className="px-5 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 font-medium"
                style={{ backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #000000' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                title="Quick View"
              >
                Quick View
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="px-5 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 font-medium"
                style={{ 
                  backgroundColor: isAdded ? '#000000' : '#000000',
                  color: '#FFFFFF',
                  border: '1px solid #000000'
                }}
                onMouseEnter={(e) => {
                  if (!isAdded) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                title="Add to Cart"
              >
                {isAdded ? 'Added' : 'Add to Cart'}
              </motion.button>
            </div>
          </div>
          
          {/* Text Section - Floating naturally below image with NO background */}
          <div className="text-center" style={{ marginTop: '16px' }}>
            {/* Product Name - Elegant Serif */}
            <h3 className="font-serif text-[16px] font-medium leading-snug tracking-wide" style={{ color: '#111111', letterSpacing: '0.5px', marginBottom: '9px' }}>
              {product.name}
            </h3>
            
            {/* Price - Clean Sans-serif */}
            <div className="flex items-center justify-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-[14px] font-light" style={{ color: '#111111' }}>PKR {product.salePrice.toLocaleString()}</span>
                  <span className="text-[13px] font-light line-through" style={{ color: '#444444' }}>PKR {product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-[14px] font-light" style={{ color: '#444444' }}>PKR {product.price.toLocaleString()}</span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
      {isQuickViewOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsQuickViewOpen(false)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden relative max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors shadow-lg"
            >
              <X size={24} />
            </motion.button>

            <div className="h-64 md:h-[500px] bg-gray-100 overflow-hidden">
              <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={getPrimaryImage(product)}
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
              <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-medium">{product.category}</span>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 font-bold">{product.name}</h2>
              
              <div className="mb-6 border-b border-gray-100 pb-6">
                {product.salePrice ? (
                  <div className="text-2xl">
                    <span className="text-orange-600 font-bold mr-3">PKR {product.salePrice.toLocaleString()}</span>
                    <span className="text-gray-400 line-through text-lg">PKR {product.price.toLocaleString()}</span>
                  </div>
                ) : (
                  <span className="text-gray-900 font-bold text-2xl">PKR {product.price.toLocaleString()}</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed line-clamp-4">{product.description}</p>

              <div className="space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-4 text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  style={{ backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #000000' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  {isAdded ? (
                    <>
                      <Check size={18} />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </motion.button>
                
                <Link 
                  to={`/product/${product.id}`}
                  className="block w-full py-3.5 text-sm uppercase tracking-widest font-bold transition-colors text-center"
                  style={{ backgroundColor: '#FFFFFF', color: '#000000', border: '1px solid #000000' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

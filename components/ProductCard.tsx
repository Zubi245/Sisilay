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
          whileHover={{ y: -8 }}
          className="group bg-[#FFF5E1] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 relative h-full flex flex-col border-2 border-[#F0E5D0]"
        >
          {/* Image Container - Fixed aspect ratio */}
          <div className="relative overflow-hidden aspect-[3/4] w-full">
            <motion.img 
              key={product.images?.[0] || 'fallback'}
              src={getPrimaryImage(product)} 
              alt={product.name} 
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full object-cover"
            />
            {product.salePrice && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
              >
                Sale
              </motion.div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Action Buttons */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-2 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickView}
                className="bg-white p-2.5 rounded-full text-gray-800 shadow-lg hover:bg-orange-500 hover:text-white transition-colors duration-300"
                title="Quick View"
              >
                <Eye size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`p-2.5 rounded-full shadow-lg transition-colors duration-300 ${isAdded ? 'bg-orange-600 text-white' : 'bg-white text-gray-800 hover:bg-orange-500 hover:text-white'}`}
                title="Add to Cart"
              >
                {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
              </motion.button>
            </div>
          </div>
          
          {/* Product Info - Fixed height */}
          <div className="p-4 bg-[#FFFBF0] flex-grow flex flex-col justify-between min-h-[120px] border-t-2 border-[#F0E5D0]">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-1 font-medium truncate">{product.category}</p>
              <h3 className="font-serif text-base md:text-lg font-semibold text-gray-900 mb-2 hover:text-green-700 transition-colors line-clamp-2 min-h-[3rem]">
                {product.name}
              </h3>
            </div>
            <div className="flex items-center space-x-2 mt-auto">
              {product.salePrice ? (
                <>
                  <span className="text-green-700 font-bold text-base md:text-lg">PKR {product.salePrice.toLocaleString()}</span>
                  <span className="text-gray-500 line-through text-xs md:text-sm">PKR {product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-gray-900 font-bold text-base md:text-lg">PKR {product.price.toLocaleString()}</span>
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
                  className={`w-full py-4 rounded-lg uppercase tracking-widest text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAdded 
                    ? 'bg-orange-600 text-white shadow-lg' 
                    : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg'
                  }`}
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
                  className="block w-full border-2 border-orange-500 text-orange-600 py-3.5 rounded-lg uppercase tracking-widest text-sm font-bold hover:bg-orange-50 transition-colors text-center"
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

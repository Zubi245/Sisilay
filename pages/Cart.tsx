import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/SEO';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const FALLBACK_IMAGE =
  'https://via.placeholder.com/300x400.png?text=Silsilay';

const getSafeImage = (img: string | undefined | null) => {
  const trimmed = typeof img === 'string' ? img.trim() : '';
  return trimmed.length > 0 ? trimmed : FALLBACK_IMAGE;
};

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 bg-[#FFF8E7] min-h-screen">
      <SEO 
        title="Shopping Cart" 
        description="Review your selected luxury items before checkout. Free shipping on orders above PKR 5000."
      />
      
      {items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <h2 className="font-serif text-3xl mb-4 text-gray-900 font-bold">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any luxury suits yet.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/shop" 
              className="inline-block bg-orange-500 text-white px-8 py-3.5 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-orange-600 transition-colors shadow-md"
            >
              Start Shopping
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl mb-8 text-gray-900 font-bold"
          >
            Shopping Cart ({itemCount} items)
          </motion.h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {items.map((item, index) => {
                 const finalPrice = item.salePrice || item.price;
                 return (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex gap-4 bg-[#FFF5E1] p-4 md:p-5 shadow-md rounded-xl hover:shadow-lg transition-all border-2 border-[#F0E5D0]"
                  >
                    <div className="w-20 h-28 md:w-24 md:h-32 flex-shrink-0 bg-gray-100 overflow-hidden rounded-lg">
                      <img
                        src={getSafeImage(item.images?.[0])}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif font-semibold text-base md:text-lg text-gray-900 truncate">{item.name}</h3>
                          <p className="text-xs text-gray-700 uppercase tracking-wide font-medium">{item.category}</p>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0">
                        <div className="flex items-center border-2 border-[#E8DCC8] rounded-lg bg-white">
                          <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 md:p-2 text-gray-600 hover:bg-gray-50 rounded-l-lg"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="w-8 md:w-10 text-center text-sm font-bold">{item.quantity}</span>
                          <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 md:p-2 text-gray-600 hover:bg-gray-50 rounded-r-lg"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>
                        <div className="text-left sm:text-right">
                          {item.salePrice && (
                            <p className="text-xs text-gray-500 line-through">PKR {(item.price * item.quantity).toLocaleString()}</p>
                          )}
                          <p className="font-bold text-base md:text-lg text-green-700">PKR {(finalPrice * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#FFF5E1] p-6 shadow-lg rounded-xl sticky top-24 border-2 border-[#F0E5D0]"
              >
                <h3 className="font-serif text-lg md:text-xl mb-6 border-b-2 border-[#E8DCC8] pb-4 font-bold text-gray-900">Order Summary</h3>
                
                <div className="space-y-3 text-sm text-gray-800 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">PKR {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-700">Free</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-base md:text-lg mb-8 pt-4 border-t-2 border-[#E8DCC8] text-gray-900">
                  <span>Total</span>
                  <span className="text-green-700">PKR {cartTotal.toLocaleString()}</span>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-green-500 text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-green-600 transition-colors flex justify-center items-center space-x-2 shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

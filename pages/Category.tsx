import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Category = () => {
  // Fixed categories: Stitched and Unstitched
  const categories = [
    {
      name: 'Stitched',
      description: 'Ready-to-wear stitched suits',
      icon: '✨'
    },
    {
      name: 'Unstitched',
      description: 'Premium unstitched fabric suits',
      icon: '🧵'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-[#FFF8E7] min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 text-gray-900"
      >
        Shop by <span className="text-green-600">Category</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
      >
        Choose from our curated collection of stitched and unstitched suits
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Link
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group block bg-[#FFF5E1] rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-[#F0E5D0] hover:-translate-y-2 h-full"
            >
              <div className="p-8 md:p-12 text-center flex flex-col justify-center min-h-[200px] md:min-h-[250px]">
                <motion.div
                  className="text-5xl md:text-6xl mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {category.icon}
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-green-700 transition-colors">
                  {category.name}
                </h2>
                <p className="text-gray-700 text-sm md:text-base mb-4">
                  {category.description}
                </p>
                <motion.div 
                  className="mt-2 inline-block text-green-700 text-xl md:text-2xl font-bold"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Explore →
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Additional Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center max-w-3xl mx-auto"
      >
        <div className="bg-[#FFF5E1] p-6 md:p-8 rounded-xl border-2 border-[#F0E5D0] shadow-md">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Why Choose Silsilay?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Premium Quality</p>
                <p className="text-sm text-gray-600">Finest fabrics and craftsmanship</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
               <p className="font-semibold text-gray-900">Free Shipping</p>
                <p className="text-sm text-gray-600">On orders above PKR 5,000</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Easy Returns</p>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">Safe and secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

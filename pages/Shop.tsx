import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { db } from '../services/db';
import { Product } from '../types';
import { SlidersHorizontal } from 'lucide-react';

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('All');
  
  // Price Filter State
  const [minInput, setMinInput] = useState<string>('');
  const [maxInput, setMaxInput] = useState<string>('');
  const [appliedRange, setAppliedRange] = useState({ min: 0, max: 1000000 });

  useEffect(() => {
    const loadProducts = () => {
      try {
        const enabledProducts = db.getEnabledProducts();
        setProducts(enabledProducts);

        // Initialize price range based on actual data
        if (enabledProducts.length > 0) {
          const prices = enabledProducts.map(p => p.salePrice || p.price).filter(p => typeof p === 'number' && !isNaN(p));
          if (prices.length > 0) {
            const min = Math.floor(Math.min(...prices));
            const max = Math.ceil(Math.max(...prices));
            
            setMinInput(min.toString());
            setMaxInput(max.toString());
            setAppliedRange({ min, max });
          }
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      }
    };

    loadProducts();

    // Set filter from URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilter(categoryParam);
    }

    // Listen for real-time updates
    const handleProductsUpdate = () => {
      console.log('Shop: productsUpdated event received');
      loadProducts();
    };

    window.addEventListener('productsUpdated', handleProductsUpdate);

    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
    };
  }, [searchParams]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const handlePriceApply = () => {
    let min = parseInt(minInput);
    let max = parseInt(maxInput);

    // Handle empty or invalid inputs
    if (isNaN(min)) min = 0;
    if (isNaN(max)) max = 1000000;

    // Ensure non-negative
    if (min < 0) min = 0;
    if (max < 0) max = 0;
    
    // Swap if min > max
    if (max < min) {
        const temp = max;
        max = min;
        min = temp;
        setMinInput(min.toString());
        setMaxInput(max.toString());
    }

    setAppliedRange({ min, max });
  };

  const handleResetFilters = () => {
    setFilter('All');
    
    // Reset to overall min/max of loaded products
    if (products.length > 0) {
       const prices = products.map(p => p.salePrice || p.price);
       const min = Math.floor(Math.min(...prices));
       const max = Math.ceil(Math.max(...prices));
       setMinInput(min.toString());
       setMaxInput(max.toString());
       setAppliedRange({ min, max });
    } else {
       setMinInput('');
       setMaxInput('');
       setAppliedRange({ min: 0, max: 1000000 });
    }
  };

  const filteredProducts = products.filter(p => {
    const price = p.salePrice || p.price;
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesPrice = price >= appliedRange.min && price <= appliedRange.max;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-12 bg-[#FFF8E7] min-h-screen">
      <SEO 
        title="Shop All Products" 
        description="Browse our complete collection of luxury unstitched suits. Find your perfect style in Velvet, Lawn, Chiffon, and Jacquard."
      />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col mb-8"
      >
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-6 font-bold">Shop Collection</h1>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#FFFBF0] p-6 rounded-xl shadow-md border border-gray-100">
          
          {/* Category Filter */}
          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <div className="flex space-x-2">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 text-sm uppercase tracking-wide rounded-full transition-all whitespace-nowrap font-medium ${
                    filter === cat 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="w-full lg:w-auto flex flex-wrap items-center gap-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
            <div className="flex items-center text-gray-600 gap-2">
              <SlidersHorizontal size={16} />
              <span className="text-sm font-bold uppercase tracking-wide">Price:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value)}
                className="w-20 p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all bg-white"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min="0"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value)}
                className="w-20 p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all bg-white"
                placeholder="Max"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePriceApply}
                className="bg-orange-500 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-orange-600 transition-colors shadow-md"
              >
                Go
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {filteredProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-[#FFF5E1] rounded-xl shadow-md border-2 border-[#F0E5D0]"
        >
          <h3 className="font-serif text-2xl text-gray-900 mb-2 font-bold">No products found</h3>
          <p className="text-gray-700 mb-4">Try adjusting your filters to see more results.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetFilters}
            className="mt-4 text-green-700 font-semibold underline hover:text-green-800"
          >
            Clear all filters
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-600 mb-6 font-medium"
          >
            Showing {filteredProducts.length} results
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

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
    <div className="container mx-auto px-4 py-12 bg-white min-h-screen">
      <SEO 
        title="Shop All Products" 
        description="Browse our complete collection of luxury unstitched suits. Find your perfect style in Velvet, Lawn, Chiffon, and Jacquard."
      />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col mb-12"
      >
        <h1 className="font-serif text-3xl md:text-4xl mb-8 font-bold" style={{ color: '#111111' }}>Shop Collection</h1>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 py-6 border-b" style={{ borderColor: '#E5E5E5' }}>
          
          {/* Category Filter */}
          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <div className="flex space-x-2">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 text-sm uppercase tracking-wide transition-all whitespace-nowrap font-bold ${
                    filter === cat 
                    ? '' 
                    : ''
                  }`}
                  style={
                    filter === cat 
                      ? { backgroundColor: '#000000', color: '#FFFFFF', border: '1px solid #000000' }
                      : { backgroundColor: '#FFFFFF', color: '#000000', border: '1px solid #E5E5E5' }
                  }
                  onMouseEnter={(e) => {
                    if (filter !== cat) {
                      e.currentTarget.style.backgroundColor = '#000000';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#000000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filter !== cat) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = '#000000';
                      e.currentTarget.style.borderColor = '#E5E5E5';
                    }
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="w-full lg:w-auto flex flex-wrap items-center gap-4 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6" style={{ borderColor: '#E5E5E5' }}>
            <div className="flex items-center gap-2" style={{ color: '#444444' }}>
              <SlidersHorizontal size={16} />
              <span className="text-sm font-medium uppercase tracking-wide">Price:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value)}
                className="w-20 p-2 text-sm border-b focus:outline-none transition-all bg-white"
                style={{ borderColor: '#E5E5E5', color: '#111111' }}
                onFocus={(e) => e.target.style.borderColor = '#111111'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                placeholder="Min"
              />
              <span style={{ color: '#444444' }}>-</span>
              <input
                type="number"
                min="0"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value)}
                className="w-20 p-2 text-sm border-b focus:outline-none transition-all bg-white"
                style={{ borderColor: '#E5E5E5', color: '#111111' }}
                onFocus={(e) => e.target.style.borderColor = '#111111'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E5'}
                placeholder="Max"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePriceApply}
                className="text-white px-5 py-2 text-xs font-medium uppercase tracking-widest transition-all"
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
          className="text-center py-20 bg-white"
        >
          <h3 className="font-serif text-2xl mb-2 font-bold" style={{ color: '#111111' }}>No products found</h3>
          <p className="mb-4" style={{ color: '#444444' }}>Try adjusting your filters to see more results.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetFilters}
            className="mt-4 font-medium underline"
            style={{ color: '#111111' }}
          >
            Clear all filters
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm mb-8 font-light"
            style={{ color: '#444444' }}
          >
            Showing {filteredProducts.length} results
          </motion.p>
          <div className="product-grid w-full max-w-[1400px] mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

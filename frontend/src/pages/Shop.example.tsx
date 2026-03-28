import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import { getProducts, Product } from '../services/api';
import { SlidersHorizontal } from 'lucide-react';

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  
  // Price Filter State
  const [minInput, setMinInput] = useState<string>('');
  const [maxInput, setMaxInput] = useState<string>('');
  const [appliedRange, setAppliedRange] = useState({ min: 0, max: 1000000 });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch all enabled products from API
        const allProducts = await getProducts();
        setProducts(allProducts);

        // Initialize price range
        if (allProducts.length > 0) {
          const prices = allProducts.map(p => p.salePrice || p.price);
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          
          setMinInput(min.toString());
          setMaxInput(max.toString());
          setAppliedRange({ min, max });
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    // Set filter from URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilter(categoryParam);
    }
  }, [searchParams]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const handlePriceApply = () => {
    let min = parseInt(minInput) || 0;
    let max = parseInt(maxInput) || 1000000;

    if (min < 0) min = 0;
    if (max < 0) max = 0;
    
    if (max < min) {
      [min, max] = [max, min];
      setMinInput(min.toString());
      setMaxInput(max.toString());
    }

    setAppliedRange({ min, max });
  };

  const filteredProducts = products.filter(p => {
    const price = p.salePrice || p.price;
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesPrice = price >= appliedRange.min && price <= appliedRange.max;
    return matchesCategory && matchesPrice;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO title="Shop All Products" description="Browse our complete collection of luxury unstitched suits." />
      
      <h1 className="font-serif text-3xl md:text-4xl mb-8 font-bold">Shop Collection</h1>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 py-6 border-b mb-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 text-sm uppercase tracking-wide transition-all ${
                filter === cat 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black border border-gray-300 hover:bg-black hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Filter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} />
            <span className="text-sm font-medium uppercase">Price:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              className="w-20 p-2 text-sm border focus:outline-none"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              className="w-20 p-2 text-sm border focus:outline-none"
              placeholder="Max"
            />
            <button
              onClick={handlePriceApply}
              className="bg-black text-white px-5 py-2 text-xs uppercase hover:bg-gray-800"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="font-serif text-2xl mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <p className="text-sm mb-8 text-gray-600">
            Showing {filteredProducts.length} results
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

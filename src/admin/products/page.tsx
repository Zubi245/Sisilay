import React, { useEffect, useState } from "react";
import Layout from "../layout";
import axios from "axios";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  page: string;
  featured: boolean;
  sortOrder: number;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/api/admin/products/route")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.page]) {
      acc[product.page] = [];
    }
    acc[product.page].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(p => p._id === id ? { ...p, ...updates } : p));
    // In a real app, send update to backend
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      
      {Object.entries(groupedProducts).map(([page, prods]) => (
        <div key={page} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 capitalize">{page} Section</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prods.map(product => (
              <motion.div 
                key={product._id} 
                className="bg-white p-5 rounded shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.03 }}
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-3"/>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
                <p className="text-sm text-gray-400">Category: {product.category}</p>
                <div className="mt-3 space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={product.featured} 
                      onChange={(e) => updateProduct(product._id, { featured: e.target.checked })} 
                      className="mr-2"
                    />
                    Featured
                  </label>
                  <label>
                    Sort Order: 
                    <input 
                      type="number" 
                      value={product.sortOrder} 
                      onChange={(e) => updateProduct(product._id, { sortOrder: parseInt(e.target.value) })} 
                      className="ml-2 border p-1 w-16"
                    />
                  </label>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default ProductsPage;

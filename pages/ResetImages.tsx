import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetImages = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Clear all product-related localStorage
      localStorage.removeItem('sam_fabrics_products');
      localStorage.removeItem('sam_fabrics_products_version');
      console.log('✅ Cleared product data from localStorage');
      
      // Reload the page to trigger fresh data load
      setTimeout(() => {
        window.location.href = '/shop';
      }, 1000);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Resetting Images...</h1>
        <p className="text-gray-600 mb-4">Clearing localStorage and reloading products...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-black mx-auto"></div>
      </div>
    </div>
  );
};





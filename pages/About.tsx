import React from 'react';
import { SEO } from '../components/SEO';

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <SEO 
        title="About Us" 
        description="Learn about the story behind Sam Fabrics. A legacy of providing timeless elegance and premium quality unstitched suits to women in Pakistan."
      />
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-6 text-brand-black">Our Story</h1>
        <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 leading-relaxed font-light">
          Sam Fabrics was born from a desire to bring timeless elegance to the modern Pakistani woman. 
          We believe that every fabric tells a story, and our collections are curated to help you write yours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 md:order-1 relative">
          <div className="absolute inset-0 border-2 border-gold-500 translate-x-4 translate-y-4"></div>
          <img 
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070" 
            alt="Fabric texture" 
            className="relative z-10 w-full shadow-xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop';
            }}
            loading="lazy"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-serif text-3xl mb-4">Craftsmanship & Quality</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            We source only the finest materials—pure silks, premium chiffons, and intricate jacquards. 
            Our unstitched collections are designed to provide versatility, allowing you to tailor each piece to your unique style.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From the bustling markets of Lahore to your doorstep, we ensure every thread meets our high standards of luxury.
          </p>
        </div>
      </div>

      <div className="bg-brand-black text-white p-12 text-center rounded-sm">
        <h2 className="font-serif text-3xl mb-4 text-gold-500">The Sam Fabrics Promise</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          To provide exceptional quality, unparalleled customer service, and designs that make you feel confident and beautiful.
        </p>
      </div>
    </div>
  );
};
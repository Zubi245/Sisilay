import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const DEFAULT_DESCRIPTION = "Silsilay - Premium unstitched suits for the modern woman. Discover luxury fabrics, elegant designs, and timeless fashion.";
const SITE_NAME = "Silsilay";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069";

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = DEFAULT_DESCRIPTION, 
  keywords = "Ladies Suits, Unstitched, Pakistan, Luxury, Fashion, Silsilay, Lawn, Chiffon, Velvet, Embroidered, Premium Fabrics",
  image = DEFAULT_IMAGE,
  url = typeof window !== 'undefined' ? window.location.href : '' 
}) => {
  
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOg = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    
    setOg('og:site_name', SITE_NAME);
    setOg('og:title', fullTitle);
    setOg('og:description', description);
    setOg('og:image', image);
    setOg('og:url', url);
    setOg('og:type', 'website');

  }, [title, description, keywords, image, url]);

  return null;
};
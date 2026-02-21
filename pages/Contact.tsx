import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Sam Fabrics. Call us, email us, or visit our store in Liberty Market, Lahore."
      />
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl mb-4">Get in Touch</h1>
        <p className="text-gray-500">We'd love to hear from you. Here's how you can reach us.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-black">
            <Phone size={24} />
          </div>
          <h3 className="font-serif text-lg font-bold mb-2">Phone</h3>
          <p className="text-gray-500 text-sm mb-1">+92 300 1234567</p>
          <p className="text-gray-500 text-sm">Mon-Sat, 9am - 6pm</p>
        </div>
        <div className="bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-black">
            <Mail size={24} />
          </div>
          <h3 className="font-serif text-lg font-bold mb-2">Email</h3>
          <p className="text-gray-500 text-sm mb-1">support@samfabrics.com</p>
          <p className="text-gray-500 text-sm">info@samfabrics.com</p>
        </div>
        <div className="bg-white p-8 text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-black">
            <MapPin size={24} />
          </div>
          <h3 className="font-serif text-lg font-bold mb-2">Location</h3>
          <p className="text-gray-500 text-sm">123 Fashion Avenue</p>
          <p className="text-gray-500 text-sm">Liberty Market, Lahore</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-12">
            <h3 className="font-serif text-2xl mb-4 text-green-600">Message Sent!</h3>
            <p className="text-gray-500">Thank you for contacting us. We will get back to you shortly.</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 underline text-sm">Send another message</button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Name</label>
                  <input required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black" type="text" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <input required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black" type="email" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Subject</label>
                <input required className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black" type="text" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea required rows={5} className="w-full border border-gray-300 p-3 focus:outline-none focus:border-brand-black"></textarea>
              </div>
              <button 
                type="submit"
                className="bg-brand-black text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-gold-500 transition-colors flex items-center space-x-2"
              >
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
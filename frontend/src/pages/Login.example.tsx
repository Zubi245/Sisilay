import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { login } from '../services/api';

export const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call API login
      await login(credentials.username, credentials.password);
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <SEO title="Admin Login" description="Secure login area for administrators." />
      <div className="bg-white p-8 shadow-xl rounded w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={20} />
          </div>
          <h1 className="font-serif text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-2">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 mb-6 text-center rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input 
              type="text" 
              required
              disabled={loading}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black disabled:bg-gray-100"
              value={credentials.username}
              onChange={e => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              required
              disabled={loading}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black disabled:bg-gray-100"
              value={credentials.password}
              onChange={e => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-6 text-xs text-gray-400">
          <p>Demo Credentials:</p>
          <p>User: admin | Pass: password</p>
        </div>
      </div>
    </div>
  );
};

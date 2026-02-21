import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { Product, Order, HeroSlide } from '../types';
import { SEO } from '../components/SEO';
import { Plus, Edit, Trash, Package, ShoppingCart, LogOut, X, Search, Filter, ArrowUpDown, Calendar, Upload, Eye, ChevronLeft, ChevronRight, GripVertical, Star } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FALLBACK_IMAGE = 'https://via.placeholder.com/80x80.png?text=Sam+Fabrics';

const getSafeImage = (img: string | undefined | null) => {
  const trimmed = typeof img === 'string' ? img.trim() : '';
  return trimmed.length > 0 ? trimmed : FALLBACK_IMAGE;
};

// Gallery Slider Component
const GallerySlider: React.FC<{ images: string[]; className?: string }> = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <img src={FALLBACK_IMAGE} alt="No image" className={`w-full h-32 object-cover rounded ${className}`} />;
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className={`relative ${className}`}>
      <img
        src={getSafeImage(images[currentIndex])}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-32 object-cover rounded"
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Product Form Component
const ProductForm: React.FC<{
  product: Partial<Product>;
  onChange: (product: Partial<Product>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}> = ({ product, onChange, onSubmit, onCancel, isEditing }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    const newImages = files
      .filter(file => validTypes.includes(file.type))
      .map(file => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

    Promise.all(newImages).then(images => {
      const updatedProduct = { ...product, images: [...(product.images || []), ...images] };
      onChange(updatedProduct);
      // Note: Database update happens on form submit, not here
    });
  };

  const removeImage = (index: number) => {
    const newImages = (product.images || []).filter((_, i) => i !== index);
    const updatedProduct = { ...product, images: newImages };
    onChange(updatedProduct);
    // Note: Database update happens on form submit, not here
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Product Name *</label>
          <input
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            value={product.name || ''}
            onChange={e => onChange({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Category *</label>
          <select
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            value={product.category || ''}
            onChange={e => onChange({ ...product, category: e.target.value })}
          >
            <option value="">Select Category...</option>
            <option value="Velvet">Velvet</option>
            <option value="Lawn">Lawn</option>
            <option value="Chiffon">Chiffon</option>
            <option value="Jacquard">Jacquard</option>
            <option value="Linen">Linen</option>
            <option value="Party Wear">Party Wear</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Description *</label>
        <textarea
          required
          rows={4}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
          value={product.description || ''}
          onChange={e => onChange({ ...product, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Price (PKR) *</label>
          <input
            required
            type="number"
            min="0"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            value={product.price ?? ''}
            onChange={e => onChange({ ...product, price: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Sale Price (Optional)</label>
          <input
            type="number"
            min="0"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            value={product.salePrice ?? ''}
            onChange={e => onChange({ ...product, salePrice: e.target.value ? parseFloat(e.target.value) : undefined })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Fabric Type *</label>
          <input
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            value={product.fabric || ''}
            onChange={e => onChange({ ...product, fabric: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Page Type *</label>
          <select
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            value={product.pageType || ''}
            onChange={e => onChange({ ...product, pageType: e.target.value as Product['pageType'] })}
          >
            <option value="">Select Page Type...</option>
            <option value="hero">Hero</option>
            <option value="home">Home</option>
            <option value="shop">Shop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Sort Order</label>
          <input
            type="number"
            min="0"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            value={product.sortOrder ?? 0}
            onChange={e => onChange({ ...product, sortOrder: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            id="featured"
            checked={product.featured || false}
            onChange={e => onChange({ ...product, featured: e.target.checked })}
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700 flex items-center">
            <Star size={16} className="mr-1 text-yellow-500" />
            Featured
          </label>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            id="enabled"
            checked={product.enabled ?? true}
            onChange={e => onChange({ ...product, enabled: e.target.checked })}
          />
          <label htmlFor="enabled" className="text-sm font-medium text-gray-700 flex items-center">
            <Eye size={16} className="mr-1 text-green-500" />
            Enabled
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Images</label>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
              <Upload size={16} />
              <span>Upload Images</span>
            </label>
            <span className="text-sm text-gray-500">Supported: JPG, PNG, WebP</span>
          </div>
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={getSafeImage(img)}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-gray-600 hover:bg-gray-100 font-medium rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium rounded"
        >
          {isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'hero' | 'homepage' | 'products' | 'orders'>('hero');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Product Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [showForm, setShowForm] = useState(false);

  // Order State
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [orderStartDate, setOrderStartDate] = useState('');
  const [orderEndDate, setOrderEndDate] = useState('');
  const [orderSort, setOrderSort] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('sam_fabrics_admin');
    if (!isAdmin) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      refreshData();
    }
    setIsLoading(false);
  }, [navigate]);

  const refreshData = () => {
    try {
      setProducts(db.getProducts());
      setOrders(db.getOrders());
      setHeroImages(db.getHeroImages());
      setHeroSlides(db.getAllHeroSlides());
    } catch (error) {
      console.error('Error refreshing data:', error);
      setProducts([]);
      setOrders([]);
      setHeroImages([]);
      setHeroSlides([]);
    }
  };

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('sam_fabrics_admin');
    navigate('/login');
  };

  // Product Handlers
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      db.deleteProduct(id);
      refreshData();
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      images: [],
      pageType: 'shop',
      featured: false,
      sortOrder: 0,
      enabled: true
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData: Product = {
        id: currentProduct.id || `prod_${Date.now()}`,
        name: currentProduct.name?.trim() || '',
        description: currentProduct.description?.trim() || '',
        category: currentProduct.category?.trim() || 'Unstitched',
        fabric: currentProduct.fabric?.trim() || 'Lawn',
        price: Math.max(0, Number(currentProduct.price) || 0),
        salePrice: currentProduct.salePrice ? Math.max(0, Number(currentProduct.salePrice)) : undefined,
        images: currentProduct.images || [],
        page: 'both', // Keeping for compatibility
        pageType: currentProduct.pageType || 'shop',
        featured: currentProduct.featured || false,
        sortOrder: currentProduct.sortOrder || 0,
        enabled: currentProduct.enabled ?? true,
        createdAt: currentProduct.createdAt || new Date().toISOString()
      };

      if (!productData.name || !productData.description) {
        alert('Name and description are required');
        return;
      }

      if (isEditing && currentProduct.id) {
        db.updateProduct(currentProduct.id, productData);
      } else {
        db.addProduct(productData);
      }

      setShowForm(false);
      setCurrentProduct({});
      refreshData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    let productsInSection: Product[] = [];

    if (source.droppableId === 'home') {
      productsInSection = [...homeProducts];
    } else if (source.droppableId === 'shop') {
      productsInSection = [...shopProducts];
    }

    const [removed] = productsInSection.splice(source.index, 1);
    productsInSection.splice(destination.index, 0, removed);

    // Update sortOrder
    productsInSection.forEach((product, index) => {
      db.updateProduct(product.id, { ...product, sortOrder: index });
    });

    refreshData();
  };

  // Order Handlers
  const handleStatusChange = (orderId: string, status: string) => {
    const validStatus = status as Order['status'];
    db.updateOrderStatus(orderId, validStatus);
    refreshData();
  };

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    const searchLower = orderSearch.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower);

    const matchesStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter;

    let matchesDate = true;
    const orderTime = new Date(order.createdAt).getTime();

    if (orderStartDate) {
      const startTime = new Date(orderStartDate).setHours(0, 0, 0, 0);
      if (orderTime < startTime) matchesDate = false;
    }

    if (orderEndDate) {
      const endTime = new Date(orderEndDate).setHours(23, 59, 59, 999);
      if (orderTime > endTime) matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesDate;
  }).sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    switch (orderSort) {
      case 'oldest': return dateA - dateB;
      case 'total-high': return b.total - a.total;
      case 'total-low': return a.total - b.total;
      case 'newest':
      default: return dateB - dateA;
    }
  });

  // Group products by pageType
  const homeProducts = products
    .filter(p => p.pageType === 'home' || p.page === 'home' || p.page === 'both' || p.featured)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.sortOrder - b.sortOrder;
    })
    .slice(0, 6);
  const shopProducts = products.filter(p => p.pageType === 'shop' || (p.page === 'shop' || p.page === 'both')).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <SEO title="Admin Dashboard" description="Admin panel for Sam Fabrics." />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4 md:mb-0">
            <h1 className="font-serif text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your store inventory and orders</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'hero' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <Eye size={20} />
            <span>Hero Slides</span>
          </button>
          <button
            onClick={() => setActiveTab('homepage')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'homepage' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <Star size={20} />
            <span>Homepage</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'products' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <Package size={20} />
            <span>Shop Products</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === 'orders' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <ShoppingCart size={20} />
            <span>Orders</span>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'hero' ? (
          <HeroSlidesManager heroSlides={heroSlides} onRefresh={refreshData} />
        ) : activeTab === 'homepage' ? (
          <HomepageManager products={products} onRefresh={refreshData} />
        ) : activeTab === 'products' ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-serif">Product Management</h2>
              <button
                onClick={handleAddNew}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
              >
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            </div>

            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-600">Hero Section Images</h3>
              <div className="mb-4">
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                    const newImages = files
                      .filter(file => validTypes.includes(file.type))
                      .map(file => {
                        const reader = new FileReader();
                        return new Promise<string>((resolve) => {
                          reader.onload = () => resolve(reader.result as string);
                          reader.readAsDataURL(file);
                        });
                      });
                    Promise.all(newImages).then(images => {
                      const updated = [...heroImages, ...images];
                      setHeroImages(updated);
                      db.updateHeroImages(updated);
                    });
                  }}
                  className="hidden"
                  id="hero-upload"
                />
                <label
                  htmlFor="hero-upload"
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                  <Upload size={16} />
                  <span>Upload Hero Images</span>
                </label>
                <span className="text-sm text-gray-500 ml-4">Supported: JPG, PNG, WebP</span>
              </div>
              <DragDropContext onDragEnd={(result) => {
                if (!result.destination) return;
                const items = Array.from(heroImages);
                const [removed] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, removed);
                setHeroImages(items);
                db.updateHeroImages(items);
              }}>
                <Droppable droppableId="hero-images" direction="horizontal">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex space-x-4 overflow-x-auto">
                      {heroImages.map((image, index) => (
                        <Draggable key={index} draggableId={`hero-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="relative flex-shrink-0"
                            >
                              <img
                                src={getSafeImage(image)}
                                alt={`Hero ${index + 1}`}
                                className="w-32 h-24 object-cover rounded border"
                                onError={(e) => {
                                  e.currentTarget.src = FALLBACK_IMAGE;
                                }}
                              />
                              <button
                                onClick={() => {
                                  const updated = heroImages.filter((_, i) => i !== index);
                                  setHeroImages(updated);
                                  db.updateHeroImages(updated);
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {heroImages.length === 0 && (
                        <p className="text-center text-gray-500 py-8 w-full">No hero images. Upload some to showcase!</p>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* Home Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">Home Page Products</h3>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="home">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {homeProducts.map((product, index) => (
                        <Draggable key={product.id} draggableId={product.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                            >
                              <div {...provided.dragHandleProps} className="cursor-move">
                                <GripVertical size={20} className="text-gray-400" />
                              </div>
                              <GallerySlider images={product.images} className="w-24 flex-shrink-0" />
                              <div className="flex-1">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-gray-500">{product.category} • {product.fabric}</p>
                                <p className="text-sm font-bold">
                                  PKR {product.price.toLocaleString()}
                                  {product.salePrice && <span className="text-red-500 ml-2">Sale: {product.salePrice.toLocaleString()}</span>}
                                </p>
                                {product.featured && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"><Star size={12} className="mr-1" />Featured</span>}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:bg-red-50 p-2 rounded"
                                >
                                  <Trash size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {homeProducts.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No home products. Add some to display!</p>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            {/* Shop Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-600">Shop Page Products</h3>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="shop">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {shopProducts.map((product, index) => (
                        <Draggable key={product.id} draggableId={product.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                            >
                              <div {...provided.dragHandleProps} className="cursor-move">
                                <GripVertical size={20} className="text-gray-400" />
                              </div>
                              <GallerySlider images={product.images} className="w-24 flex-shrink-0" />
                              <div className="flex-1">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-gray-500">{product.category} • {product.fabric}</p>
                                <p className="text-sm font-bold">
                                  PKR {product.price.toLocaleString()}
                                  {product.salePrice && <span className="text-red-500 ml-2">Sale: {product.salePrice.toLocaleString()}</span>}
                                </p>
                                {product.featured && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"><Star size={12} className="mr-1" />Featured</span>}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:bg-red-50 p-2 rounded"
                                >
                                  <Trash size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {shopProducts.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No shop products. Add some to sell!</p>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold font-serif mb-6">Order Management</h2>

            {/* Order Filters */}
            <div className="flex flex-col xl:flex-row gap-4 mb-6 bg-gray-50 p-4 rounded-lg border">
              <div className="flex-1 relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by ID, Name or Email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-300 rounded">
                  <input
                    type="date"
                    className="text-sm focus:outline-none focus:border-gray-900 bg-transparent cursor-pointer w-32"
                    value={orderStartDate}
                    onChange={(e) => setOrderStartDate(e.target.value)}
                    placeholder="Start Date"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="date"
                    className="text-sm focus:outline-none focus:border-gray-900 bg-transparent cursor-pointer w-32"
                    value={orderEndDate}
                    onChange={(e) => setOrderEndDate(e.target.value)}
                    placeholder="End Date"
                  />
                  <Calendar className="text-gray-400 ml-1" size={16} />
                </div>

                <select
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900 bg-white cursor-pointer"
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <select
                  className="pl-3 pr-8 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900 bg-white cursor-pointer"
                  value={orderSort}
                  onChange={(e) => setOrderSort(e.target.value)}
                >
                  <option value="newest">Date: Newest First</option>
                  <option value="oldest">Date: Oldest First</option>
                  <option value="total-high">Total: High to Low</option>
                  <option value="total-low">Total: Low to High</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-600">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono text-sm">#{order.id}</td>
                      <td className="p-4">
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.customerEmail}</div>
                      </td>
                      <td className="p-4 font-bold">PKR {order.total.toLocaleString()}</td>
                      <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`p-2 rounded text-sm border focus:outline-none focus:border-gray-900 cursor-pointer
                            ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                            ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                            ${order.status === 'Shipped' ? 'bg-purple-100 text-purple-800 border-purple-200' : ''}
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                          `}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-gray-500">
                        <p className="mb-1">No orders found matching your criteria.</p>
                        <button
                          onClick={() => {
                            setOrderSearch('');
                            setOrderStatusFilter('All');
                            setOrderStartDate('');
                            setOrderEndDate('');
                          }}
                          className="text-blue-500 underline text-sm"
                        >
                          Clear filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-serif font-bold">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <ProductForm
                  product={currentProduct}
                  onChange={setCurrentProduct}
                  onSubmit={handleProductSubmit}
                  onCancel={() => setShowForm(false)}
                  isEditing={isEditing}
                />
              </div>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-serif font-bold">Order Details - #{selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-red-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Customer Information</h4>
                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                    <p><strong>Address:</strong> {selectedOrder.address}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Order Information</h4>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Total:</strong> PKR {selectedOrder.total.toLocaleString()}</p>
                    <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <GallerySlider images={item.images} className="w-20 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p className="text-sm text-gray-500">{item.category} • {item.fabric}</p>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                          <p className="text-sm font-bold">PKR {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        {activeTab === 'products' ? (
          <div className="bg-white rounded-sm shadow-sm p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-serif">Product List</h2>
              <button 
                onClick={handleAddNew} 
                className="bg-green-600 text-white px-4 py-2 rounded-sm flex items-center space-x-2 hover:bg-green-700 transition-colors text-sm font-bold uppercase tracking-wide"
              >
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-600">
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <img 
                          src={getSafeImage(product.images?.[0])}
                          alt={product.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                          className="w-12 h-12 object-cover rounded-sm border"
                        />
                      </td>
                      <td className="p-4 font-medium text-brand-black">{product.name}</td>
                      <td className="p-4 text-gray-500 text-sm">{product.category}</td>
                      <td className="p-4 font-bold">
                        {product.salePrice ? (
                          <div>
                            <span className="text-brand-pink">{product.salePrice.toLocaleString()}</span>
                            <span className="text-gray-400 text-xs line-through ml-2">{product.price.toLocaleString()}</span>
                          </div>
                        ) : (
                          <span>{product.price.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">No products found. Add one to get started.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-sm shadow-sm p-6 overflow-hidden">
            <h2 className="text-xl font-bold font-serif mb-6">Order Management</h2>
            
            {/* Order Filters Toolbar */}
            <div className="flex flex-col xl:flex-row gap-4 mb-6 bg-gray-50 p-4 rounded-sm border border-gray-100">
              <div className="flex-1 relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by ID, Name or Email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-black"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                {/* Date Range Filter */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-300 rounded-sm">
                   <div className="relative">
                      <input
                        type="date"
                        className="text-sm focus:outline-none focus:border-brand-black bg-transparent cursor-pointer w-32"
                        value={orderStartDate}
                        onChange={(e) => setOrderStartDate(e.target.value)}
                        placeholder="Start Date"
                        aria-label="Start Date"
                      />
                   </div>
                   <span className="text-gray-400">-</span>
                   <div className="relative">
                      <input
                        type="date"
                        className="text-sm focus:outline-none focus:border-brand-black bg-transparent cursor-pointer w-32"
                        value={orderEndDate}
                        onChange={(e) => setOrderEndDate(e.target.value)}
                        placeholder="End Date"
                        aria-label="End Date"
                      />
                   </div>
                   <Calendar className="text-gray-400 ml-1" size={16} />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-black appearance-none bg-white cursor-pointer h-full"
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-brand-black appearance-none bg-white cursor-pointer h-full"
                    value={orderSort}
                    onChange={(e) => setOrderSort(e.target.value)}
                  >
                    <option value="newest">Date: Newest First</option>
                    <option value="oldest">Date: Oldest First</option>
                    <option value="total-high">Total: High to Low</option>
                    <option value="total-low">Total: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-600">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono text-sm">#{order.id}</td>
                      <td className="p-4">
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.customerEmail}</div>
                      </td>
                      <td className="p-4 font-bold">PKR {order.total.toLocaleString()}</td>
                      <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`p-2 rounded-sm text-sm border focus:outline-none focus:border-brand-black cursor-pointer
                            ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                            ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                            ${order.status === 'Shipped' ? 'bg-purple-100 text-purple-800 border-purple-200' : ''}
                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                          `}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-gray-500">
                        <p className="mb-1">No orders found matching your criteria.</p>
                        <button 
                          onClick={() => {
                            setOrderSearch(''); 
                            setOrderStatusFilter('All');
                            setOrderStartDate('');
                            setOrderEndDate('');
                          }}
                          className="text-brand-pink underline text-sm"
                        >
                          Clear filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Hero Slides Manager Component
const HeroSlidesManager: React.FC<{ heroSlides: HeroSlide[]; onRefresh: () => void }> = ({ heroSlides, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState({ image: '', title: '', subtitle: '', enabled: true });

  const handleAdd = () => {
    setEditingSlide(null);
    setFormData({ image: '', title: '', subtitle: '', enabled: true });
    setShowForm(true);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({ image: slide.image, title: slide.title, subtitle: slide.subtitle, enabled: slide.enabled });
    setShowForm(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlide) {
      db.updateHeroSlide(editingSlide.id, formData);
    } else {
      const maxSortOrder = Math.max(...heroSlides.map(s => s.sortOrder), 0);
      db.addHeroSlide({ ...formData, sortOrder: maxSortOrder + 1 });
    }
    setShowForm(false);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      db.deleteHeroSlide(id);
      onRefresh();
    }
  };

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const draggedSlide = heroSlides[dragIndex];
    const newSlides = [...heroSlides];
    newSlides.splice(dragIndex, 1);
    newSlides.splice(hoverIndex, 0, draggedSlide);
    
    newSlides.forEach((slide, index) => {
      db.updateHeroSlide(slide.id, { sortOrder: index });
    });
    onRefresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-serif">Hero Slides Management</h2>
        <button
          onClick={handleAdd}
          className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Slide</span>
        </button>
      </div>

      <div className="grid gap-6">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-4">
              <div className="w-32 h-20 flex-shrink-0">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{slide.title}</h3>
                <p className="text-sm text-gray-600">{slide.subtitle}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs ${slide.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {slide.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <span className="text-xs text-gray-500">Order: {slide.sortOrder}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(slide)} className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(slide.id)} className="text-red-600 hover:bg-red-50 p-2 rounded">
                  <Trash size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{editingSlide ? 'Edit Slide' : 'Add Slide'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImageUpload}
                    className="w-full border border-gray-300 p-2 rounded"
                    required={!editingSlide}
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded border" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={e => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={e => setFormData({...formData, enabled: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm">Enabled</label>
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  {editingSlide ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Homepage Manager Component
const HomepageManager: React.FC<{ products: Product[]; onRefresh: () => void }> = ({ products, onRefresh }) => {
  const homepageProducts = products
    .filter(p => p.pageType === 'home' || p.page === 'home' || p.page === 'both' || p.featured)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.sortOrder - b.sortOrder;
    })
    .slice(0, 8);

  const availableProducts = products.filter(p => !homepageProducts.some(hp => hp.id === p.id));

  const handleAddToHomepage = (product: Product) => {
    db.updateProduct(product.id, { pageType: 'home' });
    onRefresh();
  };

  const handleRemoveFromHomepage = (product: Product) => {
    db.updateProduct(product.id, { pageType: 'shop' });
    onRefresh();
  };

  const handleReorder = (dragIndex: number, hoverIndex: number) => {
    const draggedProduct = homepageProducts[dragIndex];
    const newProducts = [...homepageProducts];
    newProducts.splice(dragIndex, 1);
    newProducts.splice(hoverIndex, 0, draggedProduct);
    
    newProducts.forEach((product, index) => {
      db.updateProduct(product.id, { sortOrder: index });
    });
    onRefresh();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold font-serif mb-4">Homepage Featured Products</h2>
        <p className="text-sm text-gray-600 mb-6">These products appear on the homepage in a 4×2 grid (desktop) or 2×2 grid (mobile).</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-600">Current Homepage Products ({homepageProducts.length}/8)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {homepageProducts.map((product, index) => (
            <div key={product.id} className="border rounded-lg p-4">
              <GallerySlider images={product.images} className="w-full h-24 mb-2" />
              <h4 className="font-medium text-sm truncate">{product.name}</h4>
              <p className="text-xs text-gray-500">{product.category}</p>
              <p className="text-sm font-bold">PKR {product.price.toLocaleString()}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">#{index + 1}</span>
                <button
                  onClick={() => handleRemoveFromHomepage(product)}
                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {homepageProducts.length === 0 && (
          <p className="text-center text-gray-500 py-8">No products on homepage. Add some below.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 text-green-600">Available Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableProducts.map(product => (
            <div key={product.id} className="border rounded-lg p-4 flex items-center space-x-4">
              <GallerySlider images={product.images} className="w-16 h-16 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.category}</p>
                <p className="text-sm font-bold">PKR {product.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleAddToHomepage(product)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          ))}
        </div>
        {availableProducts.length === 0 && (
          <p className="text-center text-gray-500 py-8">All products are already on the homepage.</p>
        )}
      </div>
    </div>
  );
};
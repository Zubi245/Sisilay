import { Product, Order, HeroSlide } from '../types';

const PRODUCTS_KEY = 'sam_fabrics_products';
const PRODUCTS_VERSION_KEY = 'sam_fabrics_products_version';
// Bump this when you change initial product data or image handling
const PRODUCTS_VERSION = '6';
const ORDERS_KEY = 'sam_fabrics_orders';
const HERO_IMAGES_KEY = 'sam_fabrics_hero_images';
const HERO_SLIDES_KEY = 'sam_fabrics_hero_slides';
// Simple, minimal fallback image
const FALLBACK_IMAGE =
  'https://via.placeholder.com/800x1000.png?text=Sam+Fabrics';

// Initial Dummy Data
const INITIAL_PRODUCTS: Product[] = [
  // --- Existing Collection ---
  {
    id: '1',
    name: 'Midnight Velvet Luxury',
    description: 'A stunning black velvet suit with intricate gold embroidery. Perfect for evening wear.',
    price: 8500,
    salePrice: 7999,
    category: 'Velvet',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Premium Velvet',
    images: ['https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Royal Gold Lawn',
    description: 'Summer lawn collection featuring digital prints and chiffon dupatta.',
    price: 4500,
    category: 'Lawn',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Swiss Lawn',
    images: ['https://images.unsplash.com/photo-1621609764095-646fd0537cc6?q=80&w=2000', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069'],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Crimson Rose Festivity',
    description: 'Embroidered chiffon suit in deep pink hues.',
    price: 12000,
    salePrice: 10500,
    category: 'Chiffon',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Pure Chiffon',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Emerald Jacquard',
    description: 'Self-print jacquard suit with silk dupatta.',
    price: 6500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Jacquard',
    images: ['https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Sapphire Breeze',
    description: 'Light blue linen suit for casual wear.',
    price: 3500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Linen',
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Golden Dust Party Wear',
    description: 'Heavy embroidery on net fabric with sequins.',
    price: 15000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Net',
    images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Ivory Silk Elegance',
    description: 'Pure raw silk suit with delicate pearl embellishments.',
    price: 9500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Raw Silk',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964'],
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Teal Bloom Lawn',
    description: 'Vibrant teal lawn suit with floral digital prints.',
    price: 3800,
    salePrice: 3200,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Lawn',
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976'],
    createdAt: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Ruby Red Banarsi',
    description: 'Traditional Banarsi jacquard weave perfect for weddings.',
    price: 11000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Banarsi',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083'],
    createdAt: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Sunset Orange Chiffon',
    description: 'Flowy chiffon fabric with intricate thread work.',
    price: 8900,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Chiffon',
    images: ['https://images.unsplash.com/photo-1550614000-4b9519e090eb?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Obsidian Black Linen',
    description: 'Classic black linen suit with modern cuts.',
    price: 4200,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Linen',
    images: ['https://images.unsplash.com/photo-1529139574466-a302d2052505?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Pastel Pink Net',
    description: 'Soft net fabric with silver zari work.',
    price: 13500,
    salePrice: 11999,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Net',
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '13',
    name: 'Mustard Gold Silk',
    description: 'Rich mustard silk with contrasting blue dupatta.',
    price: 10500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Silk',
    images: ['https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  {
    id: '14',
    name: 'Lavender Mist Lawn',
    description: 'Soothing lavender color with white embroidery.',
    price: 4800,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Lawn',
    images: ['https://images.unsplash.com/photo-1604176354204-9268737828fa?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '15',
    name: 'Charcoal Grey Velvet',
    description: 'Premium grey velvet shawl suit.',
    price: 9200,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Velvet',
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  {
    id: '16',
    name: 'Scarlet Festive',
    description: 'Bright red party wear for festive occasions.',
    price: 16000,
    salePrice: 14500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Chiffon',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1946'],
    createdAt: new Date().toISOString()
  },

  // --- Organza / Festive ---
  {
    id: '17',
    name: 'Ethereal White Organza',
    description: 'Pure white organza with delicate self-embroidery and cutwork borders. A masterpiece of subtlety.',
    price: 18500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Organza',
    images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073'],
    createdAt: new Date().toISOString()
  },
  {
    id: '18',
    name: 'Mystic Black Organza',
    description: 'Sheer black organza featuring vibrant floral embroidery and sequin detailing.',
    price: 16500,
    salePrice: 14999,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Organza',
    images: ['https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  
  // --- Khaddar / Winter ---
  {
    id: '19',
    name: 'Rustic Brown Khaddar',
    description: 'Warm khaddar fabric in rustic earth tones, perfect for the winter season.',
    price: 3200,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Khaddar',
    images: ['https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=2012'],
    createdAt: new Date().toISOString()
  },
  {
    id: '20',
    name: 'Deep Marina Blue',
    description: 'Heavy marina wool blend with contrasting geometric prints.',
    price: 3800,
    salePrice: 2999,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Marina',
    images: ['https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2022'],
    createdAt: new Date().toISOString()
  },
  {
    id: '21',
    name: 'Beige Karandi Classic',
    description: 'Timeless beige karandi suit with minimalist thread work on the neckline.',
    price: 5500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Karandi',
    images: ['https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },

  // --- Cambric / Mid-Season ---
  {
    id: '22',
    name: 'Vibrant Cambric Fusion',
    description: 'High-quality cambric cotton with modern abstract digital prints.',
    price: 2900,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Cambric',
    images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '23',
    name: 'Floral Pink Cambric',
    description: 'Soft pink cambric suit adorned with classic rose patterns.',
    price: 3100,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Cambric',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },

  // --- More Jacquard & Silk ---
  {
    id: '24',
    name: 'Regal Purple Jacquard',
    description: 'Deep purple jacquard weave with gold zari borders.',
    price: 7200,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Jacquard',
    images: ['https://images.unsplash.com/photo-1551488852-d803297ee482?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '25',
    name: 'Cyan Silk Viscose',
    description: 'Smooth silk viscose fabric in a striking cyan shade.',
    price: 6800,
    salePrice: 5500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Silk Viscose',
    images: ['https://images.unsplash.com/photo-1564557284483-a8c6ca6c18c9?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '26',
    name: 'Golden Hour Tissue',
    description: 'Shimmering tissue silk fabric, ideal for wedding guests.',
    price: 14000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Tissue Silk',
    images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },

  // --- Luxury & Formals ---
  {
    id: '27',
    name: 'Emerald Velvet Shawl',
    description: 'A 3-piece suit with a heavily embroidered micro-velvet shawl.',
    price: 22000,
    salePrice: 19500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Velvet',
    images: ['https://images.unsplash.com/photo-1545959681-3046f4943b7f?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '28',
    name: 'Bridal Red Net',
    description: 'Intricate handwork on soft net, designed for the modern bride.',
    price: 45000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Net',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083'],
    createdAt: new Date().toISOString()
  },
  {
    id: '29',
    name: 'Sapphire Chiffon',
    description: 'Deep blue chiffon with silver thread embroidery.',
    price: 11500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Chiffon',
    images: ['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },

  // --- Everyday Wear ---
  {
    id: '30',
    name: 'Daily Wear Cotton',
    description: 'Breathable cotton fabric with block print design.',
    price: 2500,
    salePrice: 2000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Cotton',
    images: ['https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  {
    id: '31',
    name: 'Monochrome Linen',
    description: 'Black and white striped linen suit for office wear.',
    price: 3600,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Linen',
    images: ['https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  {
    id: '32',
    name: 'Olive Green Khaddar',
    description: 'Solid olive green khaddar with embroidered neckline patch.',
    price: 3400,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Khaddar',
    images: ['https://images.unsplash.com/photo-1550614000-4b9519e090eb?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },

  // --- Traditional ---
  {
    id: '33',
    name: 'Sindhi Ajrak Print',
    description: 'Traditional Ajrak block print on premium lawn fabric.',
    price: 3800,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Lawn',
    images: ['https://images.unsplash.com/photo-1621609764095-646fd0537cc6?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '34',
    name: 'Phulkari Inspired',
    description: 'Colorful thread work inspired by traditional Phulkari patterns.',
    price: 5200,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Cotton Net',
    images: ['https://images.unsplash.com/photo-1523260578934-e9318da58c8d?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  
  // --- Festive Special ---
  {
    id: '35',
    name: 'Silver Mist Organza',
    description: 'Grey organza with silver foil work and cutwork dupatta.',
    price: 13000,
    salePrice: 9999,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Organza',
    images: ['https://images.unsplash.com/photo-1605218457336-9276c12c5b08?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  {
    id: '36',
    name: 'Peacock Blue Velvet',
    description: 'Rich blue velvet with heavy antique gold tilla work.',
    price: 19000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Velvet',
    images: ['https://images.unsplash.com/photo-1549488497-29007cb679be?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },

  // --- NEW BATCH (Diversity: Swiss Voile, Cotton Satin, Maisuri, Pashmina) ---
  
  // Swiss Voile
  {
    id: '37',
    name: 'Ivory Gold Swiss Voile',
    description: 'Premium Swiss Voile in ivory with delicate gold tilla work. Lightweight and luxurious.',
    price: 6500,
    salePrice: 5800,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Swiss Voile',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069'],
    createdAt: new Date().toISOString()
  },
  {
    id: '38',
    name: 'Midnight Blue Voile',
    description: 'Deep navy blue Swiss voile with silver embroidery on the neckline.',
    price: 6500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Swiss Voile',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },

  // Cotton Satin
  {
    id: '39',
    name: 'Emerald Green Satin',
    description: 'Smooth cotton satin fabric with a sheen finish, perfect for mid-season evenings.',
    price: 5200,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Cotton Satin',
    images: ['https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '40',
    name: 'Dusty Pink Satin',
    description: 'Elegant dusty pink satin suit with pearl embellishments.',
    price: 5200,
    salePrice: 4500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Cotton Satin',
    images: ['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },

  // Pashmina (Winter Premium)
  {
    id: '41',
    name: 'Crimson Pashmina',
    description: 'Luxury wool pashmina shawl suit in a striking crimson red.',
    price: 12500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Wool Blend',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1946'],
    createdAt: new Date().toISOString()
  },
  {
    id: '42',
    name: 'Charcoal Wool Shawl',
    description: 'Sophisticated charcoal grey suit with a heavy embroidered wool shawl.',
    price: 11000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Wool Blend',
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },

  // High Ticket Party Wear
  {
    id: '43',
    name: 'Golden Tissue Gown',
    description: 'A floor-length tissue gown fabric with heavy zardozi work.',
    price: 28000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Tissue',
    images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '44',
    name: 'Silver Grey Bridal',
    description: 'Exquisite net bridal wear with silver sequins and crystal work.',
    price: 35000,
    salePrice: 30000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Net',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083'],
    createdAt: new Date().toISOString()
  },

  // Budget Prints
  {
    id: '45',
    name: 'Geometric Print Lawn',
    description: 'Contemporary geometric patterns on soft lawn fabric.',
    price: 2800,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Lawn',
    images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '46',
    name: 'Floral Fusion Cotton',
    description: 'Vibrant floral fusion prints on breathable cotton.',
    price: 2800,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Cotton',
    images: ['https://images.unsplash.com/photo-1604176354204-9268737828fa?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '47',
    name: 'Abstract Blue Linen',
    description: 'Modern abstract art prints on linen fabric.',
    price: 3200,
    salePrice: 2500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Linen',
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },

  // Premium Silk
  {
    id: '48',
    name: 'Digital Print Silk',
    description: 'Medium silk fabric with high-definition digital prints.',
    price: 8500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Medium Silk',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964'],
    createdAt: new Date().toISOString()
  },
  {
    id: '49',
    name: 'Hand Painted Raw Silk',
    description: 'Artisan crafted hand-painted floral designs on raw silk.',
    price: 14000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Raw Silk',
    images: ['https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },

  // Chiffon
  {
    id: '50',
    name: 'Black Gold Chiffon',
    description: 'Black chiffon with gold thread embroidery suitable for formal dinners.',
    price: 10500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Chiffon',
    images: ['https://images.unsplash.com/photo-1550614000-4b9519e090eb?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '51',
    name: 'Teal Embroidered',
    description: 'Teal chiffon suit with heavy neckline embroidery.',
    price: 9800,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Chiffon',
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976'],
    createdAt: new Date().toISOString()
  },

  // Traditional Jacquard
  {
    id: '52',
    name: 'Maroon Self Jacquard',
    description: 'Self-textured jacquard fabric in a deep maroon shade.',
    price: 6000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Jacquard',
    images: ['https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  {
    id: '53',
    name: 'Mustard Banarsi',
    description: 'Classic mustard Banarsi weave with pink accents.',
    price: 11500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Banarsi',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083'],
    createdAt: new Date().toISOString()
  },

  // Misc
  {
    id: '54',
    name: 'Lilac Organza Frill',
    description: 'Trendy lilac organza with frill details on the dupatta.',
    price: 15000,
    salePrice: 12000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Organza',
    images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '55',
    name: 'Beige Corduroy',
    description: 'Soft beige corduroy suit for harsh winters.',
    price: 4500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Corduroy',
    images: ['https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '56',
    name: 'Sapphire Velvet',
    description: 'Royal blue velvet suit with silver tilla work.',
    price: 18000,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Velvet',
    images: ['https://images.unsplash.com/photo-1549488497-29007cb679be?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '57',
    name: 'Rose Gold Maisuri',
    description: 'Shimmering rose gold maisuri fabric for festive occasions.',
    price: 9500,
    category: '',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    fabric: 'Maisuri',
    images: ['https://images.unsplash.com/photo-1605218457336-9276c12c5b08?q=80&w=1974'],
    createdAt: new Date().toISOString()
  },
  // --- New Collection: 16 Additional Products ---
  {
    id: '58',
    name: 'Emerald Silk Dreams',
    description: 'Flowing emerald green silk with delicate gold thread work. Perfect for festive occasions.',
    price: 12500,
    salePrice: 11000,
    category: 'Silk',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Pure Silk',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983'],
    createdAt: new Date().toISOString()
  },
  {
    id: '59',
    name: 'Ruby Chiffon Romance',
    description: 'Light and airy ruby chiffon with romantic floral embroidery. Ideal for summer weddings.',
    price: 8900,
    category: 'Chiffon',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Premium Chiffon',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '60',
    name: 'Sapphire Organza Elegance',
    description: 'Sheer sapphire blue organza with intricate cutwork and sequin detailing.',
    price: 15800,
    salePrice: 14200,
    category: 'Organza',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Organza',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964'],
    createdAt: new Date().toISOString()
  },
  {
    id: '61',
    name: 'Golden Jacquard Heritage',
    description: 'Traditional golden jacquard weave with contemporary styling. A timeless classic.',
    price: 7200,
    category: 'Jacquard',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Jacquard',
    images: ['https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '62',
    name: 'Ivory Net Bridal Dreams',
    description: 'Exquisite ivory net fabric with heavy embroidery and crystal work for the perfect bridal look.',
    price: 28500,
    salePrice: 25600,
    category: 'Net',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Net',
    images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '63',
    name: 'Coral Pink Tissue Glamour',
    description: 'Shimmering coral pink tissue silk with gold foil work and delicate embroidery.',
    price: 19200,
    category: 'Tissue',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Tissue Silk',
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '64',
    name: 'Mint Green Lawn Fresh',
    description: 'Refreshing mint green lawn with subtle digital prints and comfortable fit.',
    price: 3800,
    category: 'Lawn',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Lawn',
    images: ['https://images.unsplash.com/photo-1621609764095-646fd0537cc6?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '65',
    name: 'Burgundy Velvet Opulence',
    description: 'Rich burgundy velvet with antique gold tilla work. Perfect for winter festivities.',
    price: 16800,
    salePrice: 15100,
    category: 'Velvet',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Velvet',
    images: ['https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '66',
    name: 'Peach Silk Comfort',
    description: 'Soft peach silk with minimal embroidery. Everyday luxury at its finest.',
    price: 9600,
    category: 'Silk',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Silk',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983'],
    createdAt: new Date().toISOString()
  },
  {
    id: '67',
    name: 'Navy Blue Chiffon Breeze',
    description: 'Flowy navy blue chiffon with silver thread work. Elegant and versatile.',
    price: 7800,
    category: 'Chiffon',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Chiffon',
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070'],
    createdAt: new Date().toISOString()
  },
  {
    id: '68',
    name: 'Rose Gold Organza Romance',
    description: 'Delicate rose gold organza with floral motifs and pearl embellishments.',
    price: 13400,
    category: 'Organza',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Organza',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964'],
    createdAt: new Date().toISOString()
  },
  {
    id: '69',
    name: 'Copper Jacquard Modern',
    description: 'Contemporary copper jacquard with geometric patterns. Trendy and sophisticated.',
    price: 6500,
    category: 'Jacquard',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Jacquard',
    images: ['https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '70',
    name: 'Champagne Net Celebration',
    description: 'Champagne colored net with heavy sequin work. Perfect for celebrations.',
    price: 22500,
    salePrice: 20200,
    category: 'Net',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Net',
    images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '71',
    name: 'Lavender Tissue Dreams',
    description: 'Dreamy lavender tissue silk with silver foil accents and delicate embroidery.',
    price: 17600,
    category: 'Tissue',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Tissue Silk',
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '72',
    name: 'Sky Blue Lawn Casual',
    description: 'Casual sky blue lawn with block prints. Comfortable for everyday wear.',
    price: 3200,
    category: 'Lawn',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Lawn',
    images: ['https://images.unsplash.com/photo-1621609764095-646fd0537cc6?q=80&w=2000'],
    createdAt: new Date().toISOString()
  },
  {
    id: '73',
    name: 'Plum Velvet Luxury',
    description: 'Deep plum velvet with intricate embroidery. A luxurious winter choice.',
    price: 14800,
    salePrice: 13300,
    category: 'Velvet',
    page: 'shop',
    pageType: 'shop',
    featured: false,
    sortOrder: 0,
    enabled: true,
    fabric: 'Velvet',
    images: ['https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070'],
    createdAt: new Date().toISOString()
  }
];

// Initial Hero Images
const INITIAL_HERO_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070',
  'https://images.unsplash.com/photo-1621609764095-646fd0537cc6?q=80&w=2000',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069'
];

// Initial Hero Slides
const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
    title: 'Luxury Unstitched Collection',
    subtitle: 'Experience the elegance of premium fabrics',
    enabled: true,
    sortOrder: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop',
    title: 'Summer Lawn Edition',
    subtitle: 'Vibrant prints for the season',
    enabled: true,
    sortOrder: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1596783439326-8439e3038681?q=80&w=2070&auto=format&fit=crop',
    title: 'COUTURE',
    subtitle: 'Embroidered perfection',
    enabled: true,
    sortOrder: 2,
    createdAt: new Date().toISOString()
  }
];

class MockDatabase {
  constructor() {
    this.init();
  }

  private dispatchEvent(eventType: string) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(eventType));
    }
  }

  private init() {
    if (typeof window === 'undefined') return;
    
    try {
      // Reset products if version changed or data is missing/too short
      const current = localStorage.getItem(PRODUCTS_KEY);
      const currentVersion = localStorage.getItem(PRODUCTS_VERSION_KEY);
      const needsReset =
        !current ||
        !currentVersion ||
        currentVersion !== PRODUCTS_VERSION ||
        JSON.parse(current).length < 70;

      if (needsReset) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
        localStorage.setItem(PRODUCTS_VERSION_KEY, PRODUCTS_VERSION);
      }

      if (!localStorage.getItem(ORDERS_KEY)) {
        localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
      }

      if (!localStorage.getItem(HERO_IMAGES_KEY)) {
        localStorage.setItem(HERO_IMAGES_KEY, JSON.stringify(INITIAL_HERO_IMAGES));
      }

      if (!localStorage.getItem(HERO_SLIDES_KEY)) {
        localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(INITIAL_HERO_SLIDES));
      }
    } catch (e) {
      console.warn('LocalStorage access denied or full', e);
    }
  }

  getProducts(): Product[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(PRODUCTS_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      
      // Sanitize data to prevent rendering errors
      return parsed.map((p: any) => {
        const name: string = p.name || 'Sam Fabrics';
        const safeName = encodeURIComponent(name);
        const imageUrl = `https://via.placeholder.com/800x1000.png?text=${safeName}`;

        return {
          ...p,
          // Always use a minimal, name-based image so every product has a clean visual
          images: [imageUrl],
          price: Number(p.price) || 0,
          salePrice: p.salePrice ? Number(p.salePrice) : undefined,
          // Ensure all required fields exist
          name,
          category: p.category || 'Uncategorized',
          fabric: p.fabric || 'Unknown',
          description: p.description || 'No description available.',
          enabled: p.enabled !== undefined ? p.enabled : true,
        } as Product;
      });
    } catch {
      return [];
    }
  }

  getEnabledProducts(): Product[] {
    return this.getProducts().filter(p => p.enabled);
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    this.dispatchEvent('productsUpdated');
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    let products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    console.log('Product updated:', id, 'Images:', updates.images);
    this.dispatchEvent('productsUpdated');
    return products[index];
  }

  deleteProduct(id: string): boolean {
    let products = this.getProducts();
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    this.dispatchEvent('productsUpdated');
    return products.length !== initialLength;
  }

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    orders.unshift(newOrder); // Newest first
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
  }

  getOrders(): Order[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(ORDERS_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];

      // Sanitize orders to ensure they have all required fields for filtering
      return parsed.map((o: any) => ({
        ...o,
        id: o.id || 'UNKNOWN',
        customerName: o.customerName || 'Unknown',
        customerEmail: o.customerEmail || '',
        status: o.status || 'Pending',
        total: Number(o.total) || 0,
        createdAt: o.createdAt || new Date().toISOString()
      }));
    } catch {
      return [];
    }
  }

  updateOrderStatus(id: string, status: Order['status']): void {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }

  getHeroImages(): string[] {
    if (typeof window === 'undefined') return INITIAL_HERO_IMAGES;
    try {
      const data = localStorage.getItem(HERO_IMAGES_KEY);
      if (!data) return INITIAL_HERO_IMAGES;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return INITIAL_HERO_IMAGES;
      return parsed;
    } catch {
      return INITIAL_HERO_IMAGES;
    }
  }

  updateHeroImages(images: string[]): void {
    localStorage.setItem(HERO_IMAGES_KEY, JSON.stringify(images));
  }

  getHeroSlides(): HeroSlide[] {
    if (typeof window === 'undefined') return INITIAL_HERO_SLIDES;
    try {
      const data = localStorage.getItem(HERO_SLIDES_KEY);
      if (!data) return INITIAL_HERO_SLIDES;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return INITIAL_HERO_SLIDES;
      return parsed.filter(slide => slide.enabled).sort((a, b) => a.sortOrder - b.sortOrder);
    } catch {
      return INITIAL_HERO_SLIDES;
    }
  }

  getAllHeroSlides(): HeroSlide[] {
    if (typeof window === 'undefined') return INITIAL_HERO_SLIDES;
    try {
      const data = localStorage.getItem(HERO_SLIDES_KEY);
      if (!data) return INITIAL_HERO_SLIDES;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return INITIAL_HERO_SLIDES;
      return parsed.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch {
      return INITIAL_HERO_SLIDES;
    }
  }

  addHeroSlide(slide: Omit<HeroSlide, 'id' | 'createdAt'>): HeroSlide {
    const slides = this.getAllHeroSlides();
    const newSlide: HeroSlide = {
      ...slide,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString()
    };
    slides.push(newSlide);
    localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(slides));
    this.dispatchEvent('heroSlidesUpdated');
    return newSlide;
  }

  updateHeroSlide(id: string, updates: Partial<HeroSlide>): HeroSlide | null {
    const slides = this.getAllHeroSlides();
    const index = slides.findIndex(s => s.id === id);
    if (index === -1) return null;
    slides[index] = { ...slides[index], ...updates };
    localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(slides));
    console.log('Hero slide updated:', id, 'Image:', updates.image);
    this.dispatchEvent('heroSlidesUpdated');
    return slides[index];
  }

  deleteHeroSlide(id: string): boolean {
    const slides = this.getAllHeroSlides();
    const filtered = slides.filter(s => s.id !== id);
    if (filtered.length === slides.length) return false;
    localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(filtered));
    this.dispatchEvent('heroSlidesUpdated');
    return true;
  }
}

export const db = new MockDatabase();


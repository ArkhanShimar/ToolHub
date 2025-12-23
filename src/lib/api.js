import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Token is added in individual requests where needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If backend is not available, use mock data for development
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.warn('Backend not available, using mock data for development');
      return handleMockResponse(error.config);
    }
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        // Redirect to login or clear auth state
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Mock data for development
const mockProducts = [
  {
    _id: '1',
    name: 'Professional Drill Set 18V',
    slug: 'bosch-professional-drill-gsb-18v-85c',
    brand: 'Bosch',
    price: 25000,
    salePrice: 22500,
    stockQty: 15,
    images: ['/assets/products/placeholder.svg'],
    description: 'High-performance 18V cordless drill with 2 batteries and charger.',
    categoryId: { name: 'Power Tools', slug: 'power-tools' },
    rating: { average: 4.5, count: 23 },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '2',
    name: 'Angle Grinder 115mm',
    slug: 'makita-ga4530r-angle-grinder-115mm',
    brand: 'Makita',
    price: 18000,
    stockQty: 8,
    images: ['/assets/products/placeholder.svg'],
    description: 'Compact and powerful 115mm angle grinder for cutting and grinding.',
    categoryId: { name: 'Power Tools', slug: 'power-tools' },
    rating: { average: 4.2, count: 15 },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '3',
    name: 'Socket Set 42 Pieces',
    slug: 'socket-set-42-pieces',
    brand: 'Stanley',
    price: 12000,
    salePrice: 10800,
    stockQty: 25,
    images: ['/assets/products/placeholder.svg'],
    description: 'Complete 42-piece socket set with ratchet handle and extension bars.',
    categoryId: { name: 'Hand Tools', slug: 'hand-tools' },
    rating: { average: 4.7, count: 31 },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '4',
    name: 'Welding Helmet Auto-Darkening',
    slug: 'welding-helmet-auto-darkening',
    brand: 'Lincoln Electric',
    price: 35000,
    stockQty: 5,
    images: ['/assets/products/placeholder.svg'],
    description: 'Professional auto-darkening welding helmet with adjustable shade.',
    categoryId: { name: 'Safety Equipment', slug: 'safety-equipment' },
    rating: { average: 4.8, count: 12 },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '5',
    name: 'Circular Saw 185mm',
    slug: 'circular-saw-185mm',
    brand: 'DeWalt',
    price: 28000,
    stockQty: 12,
    images: ['/assets/products/placeholder.svg'],
    description: 'Heavy-duty 185mm circular saw with laser guide and dust collection.',
    categoryId: { name: 'Power Tools', slug: 'power-tools' },
    rating: { average: 4.6, count: 18 },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '6',
    name: 'Tool Box 3-Drawer',
    slug: 'tool-box-3-drawer',
    brand: 'Craftsman',
    price: 15000,
    stockQty: 20,
    images: ['/assets/products/placeholder.svg'],
    description: 'Durable 3-drawer tool box with ball-bearing slides and lock.',
    categoryId: { name: 'Storage', slug: 'storage' },
    rating: { average: 4.3, count: 27 },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '7',
    name: 'Impact Wrench 1/2 Drive',
    slug: 'impact-wrench-half-drive',
    brand: 'Milwaukee',
    price: 32000,
    salePrice: 29000,
    stockQty: 7,
    images: ['/assets/products/placeholder.svg'],
    description: 'High-torque 1/2" drive impact wrench for heavy-duty applications.',
    categoryId: { name: 'Power Tools', slug: 'power-tools' },
    rating: { average: 4.9, count: 8 },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '8',
    name: 'Safety Glasses Clear',
    slug: 'safety-glasses-clear',
    brand: '3M',
    price: 2500,
    stockQty: 50,
    images: ['/assets/products/placeholder.svg'],
    description: 'Clear safety glasses with anti-fog coating and UV protection.',
    categoryId: { name: 'Safety Equipment', slug: 'safety-equipment' },
    rating: { average: 4.1, count: 45 },
    isActive: true,
    isFeatured: true
  }
];

const mockCategories = [
  // Main Categories
  {
    _id: 'cat1',
    name: 'Power Tools',
    slug: 'power-tools',
    description: 'Electric and battery-powered tools for professional use',
    parentId: null,
    isActive: true,
    sortOrder: 1
  },
  {
    _id: 'cat2',
    name: 'Hand Tools',
    slug: 'hand-tools',
    description: 'Manual tools for precision work and general use',
    parentId: null,
    isActive: true,
    sortOrder: 2
  },
  {
    _id: 'cat3',
    name: 'Safety Equipment',
    slug: 'safety-equipment',
    description: 'Personal protective equipment for workplace safety',
    parentId: null,
    isActive: true,
    sortOrder: 3
  },
  {
    _id: 'cat4',
    name: 'Measuring Tools',
    slug: 'measuring-tools',
    description: 'Precision measuring and marking instruments',
    parentId: null,
    isActive: true,
    sortOrder: 4
  },
  {
    _id: 'cat5',
    name: 'Storage & Organization',
    slug: 'storage-organization',
    description: 'Tool boxes, cabinets, and organization solutions',
    parentId: null,
    isActive: true,
    sortOrder: 5
  },
  {
    _id: 'cat6',
    name: 'Spare Parts & Accessories',
    slug: 'spare-parts-accessories',
    description: 'Replacement parts and accessories for tools',
    parentId: null,
    isActive: true,
    sortOrder: 6
  },
  
  // Subcategories for Power Tools
  {
    _id: 'sub1-1',
    name: 'Drills & Drivers',
    slug: 'drills-drivers',
    description: 'Cordless and corded drills, impact drivers',
    parentId: 'cat1',
    isActive: true,
    sortOrder: 1
  },
  {
    _id: 'sub1-2',
    name: 'Saws',
    slug: 'saws',
    description: 'Circular saws, jigsaws, reciprocating saws',
    parentId: 'cat1',
    isActive: true,
    sortOrder: 2
  },
  {
    _id: 'sub1-3',
    name: 'Grinders',
    slug: 'grinders',
    description: 'Angle grinders, bench grinders, die grinders',
    parentId: 'cat1',
    isActive: true,
    sortOrder: 3
  },
  {
    _id: 'sub1-4',
    name: 'Sanders & Planers',
    slug: 'sanders-planers',
    description: 'Orbital sanders, belt sanders, planers',
    parentId: 'cat1',
    isActive: true,
    sortOrder: 4
  },
  
  // Subcategories for Hand Tools
  {
    _id: 'sub2-1',
    name: 'Wrenches & Spanners',
    slug: 'wrenches-spanners',
    description: 'Open end, box end, combination wrenches',
    parentId: 'cat2',
    isActive: true,
    sortOrder: 1
  },
  {
    _id: 'sub2-2',
    name: 'Screwdrivers',
    slug: 'screwdrivers',
    description: 'Phillips, flathead, torx screwdrivers',
    parentId: 'cat2',
    isActive: true,
    sortOrder: 2
  },
  {
    _id: 'sub2-3',
    name: 'Pliers & Cutters',
    slug: 'pliers-cutters',
    description: 'Needle nose, cutting, locking pliers',
    parentId: 'cat2',
    isActive: true,
    sortOrder: 3
  },
  {
    _id: 'sub2-4',
    name: 'Hammers & Mallets',
    slug: 'hammers-mallets',
    description: 'Claw hammers, ball peen, rubber mallets',
    parentId: 'cat2',
    isActive: true,
    sortOrder: 4
  },
  
  // Subcategories for Safety Equipment
  {
    _id: 'sub3-1',
    name: 'Eye Protection',
    slug: 'eye-protection',
    description: 'Safety glasses, goggles, face shields',
    parentId: 'cat3',
    isActive: true,
    sortOrder: 1
  },
  {
    _id: 'sub3-2',
    name: 'Head Protection',
    slug: 'head-protection',
    description: 'Hard hats, welding helmets, bump caps',
    parentId: 'cat3',
    isActive: true,
    sortOrder: 2
  },
  {
    _id: 'sub3-3',
    name: 'Hand Protection',
    slug: 'hand-protection',
    description: 'Work gloves, cut-resistant gloves',
    parentId: 'cat3',
    isActive: true,
    sortOrder: 3
  },
  {
    _id: 'sub3-4',
    name: 'Respiratory Protection',
    slug: 'respiratory-protection',
    description: 'Dust masks, respirators, filters',
    parentId: 'cat3',
    isActive: true,
    sortOrder: 4
  }
];

const mockBrands = [
  'Bosch', 'Makita', 'DeWalt', 'Milwaukee', 'Stanley', 'Craftsman', 
  'Lincoln Electric', '3M', 'Hilti', 'Festool', 'Ryobi', 'Black & Decker'
];

const mockPagination = {
  currentPage: 1,
  totalPages: 3,
  totalProducts: 24,
  hasNextPage: true,
  hasPrevPage: false,
  limit: 8
};

// Mock response handler for development
const handleMockResponse = (config) => {
  const url = config.url;
  
  // Products endpoints
  if (url.includes('/products') && !url.includes('/categories') && !url.includes('/brands')) {
    if (url.includes('/search/query')) {
      const query = new URLSearchParams(url.split('?')[1])?.get('q') || '';
      const filteredProducts = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      );
      return Promise.resolve({
        data: { success: true, products: filteredProducts }
      });
    }
    
    return Promise.resolve({
      data: { success: true, products: mockProducts, pagination: mockPagination }
    });
  }
  
  // Categories endpoint
  if (url.includes('/products/categories/list') || url.includes('/categories')) {
    return Promise.resolve({
      data: { success: true, categories: mockCategories }
    });
  }
  
  // Brands endpoint
  if (url.includes('/products/brands/list')) {
    return Promise.resolve({
      data: { success: true, brands: mockBrands }
    });
  }
  
  // Default mock response
  return Promise.resolve({
    data: { success: true, message: 'Mock response - backend not available' }
  });
};

// API endpoints
export const endpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    profile: '/auth/profile',
  },
  
  // Products
  products: {
    list: '/products',
    detail: (id) => `/products/${id}`,
    search: '/products/search',
    categories: '/products/categories',
    brands: '/products/brands',
  },
  
  // Categories
  categories: {
    list: '/categories',
    detail: (id) => `/categories/${id}`,
  },
  
  // Cart
  cart: {
    get: '/cart',
    add: '/cart/add',
    update: '/cart/update',
    remove: '/cart/remove',
    clear: '/cart/clear',
  },
  
  // Wishlist
  wishlist: {
    get: '/wishlist',
    add: '/wishlist/add',
    remove: '/wishlist/remove',
    clear: '/wishlist/clear',
  },
  
  // Orders
  orders: {
    list: '/orders',
    detail: (id) => `/orders/${id}`,
    create: '/orders',
    update: (id) => `/orders/${id}`,
  },
  
  // Chat
  chat: {
    messages: '/chat/messages',
    send: '/chat/send',
  },
  
  // Admin
  admin: {
    login: '/admin/login',
    dashboard: '/admin/dashboard',
    products: '/admin/products',
    orders: '/admin/orders',
    users: '/admin/users',
    categories: '/admin/categories',
    content: '/admin/content',
    settings: '/admin/settings',
  },
};

export default api;
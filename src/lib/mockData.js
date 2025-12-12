// Mock data for development and testing
export const mockProducts = [
  {
    _id: '1',
    name: 'Professional Drill Set 18V',
    slug: 'professional-drill-set-18v',
    brand: 'Bosch',
    price: 25000,
    salePrice: 22500,
    stockQty: 15,
    images: ['/assets/products/drill-1.jpg'],
    description: 'High-performance 18V cordless drill with 2 batteries and charger.',
    categoryId: { name: 'Power Tools', slug: 'power-tools' },
    rating: { average: 4.5, count: 23 },
    isActive: true,
    isFeatured: true
  },
  {
    _id: '2',
    name: 'Angle Grinder 115mm',
    slug: 'angle-grinder-115mm',
    brand: 'Makita',
    price: 18000,
    stockQty: 8,
    images: ['/assets/products/grinder-1.jpg'],
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
    images: ['/assets/products/socket-set-1.jpg'],
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
    images: ['/assets/products/helmet-1.jpg'],
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
    images: ['/assets/products/saw-1.jpg'],
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
    images: ['/assets/products/toolbox-1.jpg'],
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
    images: ['/assets/products/impact-1.jpg'],
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
    images: ['/assets/products/glasses-1.jpg'],
    description: 'Clear safety glasses with anti-fog coating and UV protection.',
    categoryId: { name: 'Safety Equipment', slug: 'safety-equipment' },
    rating: { average: 4.1, count: 45 },
    isActive: true,
    isFeatured: true
  }
];

export const mockCategories = [
  {
    _id: 'cat1',
    name: 'Power Tools',
    slug: 'power-tools',
    description: 'Electric and battery-powered tools for professional use',
    isActive: true,
    sortOrder: 1
  },
  {
    _id: 'cat2',
    name: 'Hand Tools',
    slug: 'hand-tools',
    description: 'Manual tools for precision work and general use',
    isActive: true,
    sortOrder: 2
  },
  {
    _id: 'cat3',
    name: 'Safety Equipment',
    slug: 'safety-equipment',
    description: 'Personal protective equipment for workplace safety',
    isActive: true,
    sortOrder: 3
  },
  {
    _id: 'cat4',
    name: 'Measuring Tools',
    slug: 'measuring-tools',
    description: 'Precision measuring and marking instruments',
    isActive: true,
    sortOrder: 4
  },
  {
    _id: 'cat5',
    name: 'Storage',
    slug: 'storage',
    description: 'Tool boxes, cabinets, and organization solutions',
    isActive: true,
    sortOrder: 5
  },
  {
    _id: 'cat6',
    name: 'Spare Parts',
    slug: 'spare-parts',
    description: 'Replacement parts and accessories for tools',
    isActive: true,
    sortOrder: 6
  }
];

export const mockBrands = [
  'Bosch', 'Makita', 'DeWalt', 'Milwaukee', 'Stanley', 'Craftsman', 
  'Lincoln Electric', '3M', 'Hilti', 'Festool', 'Ryobi', 'Black & Decker'
];

// Mock API responses
export const createMockApiResponse = (data, pagination = null) => ({
  success: true,
  ...data,
  ...(pagination && { pagination })
});

export const mockPagination = {
  currentPage: 1,
  totalPages: 3,
  totalProducts: 24,
  hasNextPage: true,
  hasPrevPage: false,
  limit: 8
};
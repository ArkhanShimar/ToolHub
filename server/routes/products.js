const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { optionalAuth } = require('../middleware/auth');
const router = express.Router();

// Get all products with filtering, sorting, and pagination
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      brand,
      minPrice,
      maxPrice,
      search,
      sort = 'createdAt',
      order = 'desc',
      featured,
      inStock
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) {
      filter.categoryId = category;
    }

    if (subcategory) {
      filter.subcategoryId = subcategory;
    }

    if (brand) {
      filter.brand = new RegExp(brand, 'i');
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (inStock === 'true') {
      filter.stockQty = { $gt: 0 };
    }

    // Build sort object
    const sortObj = {};
    if (sort === 'price') {
      sortObj.price = order === 'asc' ? 1 : -1;
    } else if (sort === 'name') {
      sortObj.name = order === 'asc' ? 1 : -1;
    } else if (sort === 'popularity') {
      sortObj.popularity = -1;
    } else if (sort === 'rating') {
      sortObj['rating.average'] = -1;
    } else {
      sortObj.createdAt = order === 'asc' ? 1 : -1;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('categoryId', 'name slug')
        .populate('subcategoryId', 'name slug')
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(filter)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.json({
      success: true,
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts: total,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get products'
    });
  }
});

// Get single product by ID or slug
router.get('/:identifier', optionalAuth, async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Try to find by slug first, then by ID
    let product = await Product.findOne({ 
      slug: identifier, 
      isActive: true 
    })
    .populate('categoryId', 'name slug')
    .populate('subcategoryId', 'name slug')
    .populate('relatedProducts', 'name slug price salePrice images brand stockQty')
    .populate('spareProducts', 'name slug price salePrice images brand stockQty');

    if (!product) {
      product = await Product.findOne({ 
        _id: identifier, 
        isActive: true 
      })
      .populate('categoryId', 'name slug')
      .populate('subcategoryId', 'name slug')
      .populate('relatedProducts', 'name slug price salePrice images brand stockQty')
      .populate('spareProducts', 'name slug price salePrice images brand stockQty');
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment popularity
    product.popularity += 1;
    await product.save();

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get product'
    });
  }
});

// Search products
router.get('/search/query', optionalAuth, async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.json({
        success: true,
        products: []
      });
    }

    const searchRegex = new RegExp(q.trim(), 'i');
    
    const products = await Product.find({
      isActive: true,
      $or: [
        { name: searchRegex },
        { brand: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } }
      ]
    })
    .select('name slug brand price salePrice images stockQty')
    .limit(parseInt(limit))
    .lean();

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed'
    });
  }
});

// Get product categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Category.find({ 
      isActive: true,
      parentId: null 
    })
    .populate('subcategories')
    .sort({ sortOrder: 1, name: 1 });

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get categories'
    });
  }
});

// Get product brands
router.get('/brands/list', async (req, res) => {
  try {
    const brands = await Product.distinct('brand', { 
      isActive: true,
      brand: { $ne: null, $ne: '' }
    });

    res.json({
      success: true,
      brands: brands.sort()
    });
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get brands'
    });
  }
});

// Get price range
router.get('/price/range', async (req, res) => {
  try {
    const priceRange = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);

    res.json({
      success: true,
      priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 }
    });
  } catch (error) {
    console.error('Get price range error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get price range'
    });
  }
});

module.exports = router;
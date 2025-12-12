# Hardware Tools Sri Lanka - E-commerce Platform

A complete, professional, and scalable e-commerce platform built specifically for hardware tools and spare parts businesses in Sri Lanka. Features a modern responsive design, comprehensive admin panel, real-time chat, and mobile-first approach.

## 🚀 Features

### Customer Features
- **Modern Responsive Design** - Mobile-first approach with beautiful animations
- **Product Catalog** - 3000+ products with advanced filtering and search
- **User Authentication** - Firebase-powered secure login/registration
- **Shopping Cart & Wishlist** - Persistent across devices
- **Order Management** - Complete order tracking and history
- **Real-time Chat** - Instant support with admin
- **Payment System** - Bank transfer with receipt upload (Card payments coming soon)
- **Delivery Tracking** - Island-wide delivery with courier integration

### Admin Features
- **Comprehensive Dashboard** - Sales analytics and insights
- **Product Management** - Add, edit, delete products with bulk operations
- **Order Management** - Process orders, update status, manage payments
- **Customer Support** - Real-time chat with customers
- **Content Management** - Edit website content, banners, policies
- **Inventory Management** - Stock tracking and low stock alerts
- **User Management** - Customer accounts and admin roles

### Technical Features
- **SEO Optimized** - Next.js with server-side rendering
- **Real-time Updates** - Socket.io for live chat and notifications
- **Image Management** - Cloudinary integration for optimized images
- **Database** - MongoDB with optimized queries and indexing
- **Security** - Firebase Auth, JWT tokens, rate limiting, CORS
- **Performance** - Lazy loading, caching, optimized bundles
- **Mobile Responsive** - Perfect experience on all devices

## 🛠 Tech Stack

### Frontend
- **Next.js** - React framework with SSR/SSG
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **ShadCN Components** - Modern UI components
- **Firebase Auth** - Authentication system

### Backend
- **Node.js + Express** - Server and API
- **MongoDB Atlas** - Cloud database
- **Socket.io** - Real-time communication
- **Cloudinary** - Image storage and optimization
- **Firebase Admin** - Server-side authentication

### Deployment
- **Frontend** - Vercel (optimized for Next.js)
- **Backend** - Render (Node.js hosting)
- **Database** - MongoDB Atlas (free tier → scalable)
- **Images** - Cloudinary (free tier → paid)
- **Domain** - .lk domain (Sri Lankan)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Firebase project
- Cloudinary account

### 1. Clone Repository
```bash
git clone <repository-url>
cd hardware-tools-ecommerce
```

### 2. Install Dependencies
```bash
# Install all dependencies
npm install
```

### 3. Environment Setup
Create `.env.local` file in root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side)
FIREBASE_ADMIN_PRIVATE_KEY=your_private_key
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
FIREBASE_ADMIN_PROJECT_ID=your_project_id

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hardware_tools_db

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Admin Credentials
ADMIN_EMAIL=admin@hardwaretools.lk
ADMIN_PASSWORD=admin123456
```

### 4. Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication with Email/Password
3. Generate service account key for Firebase Admin
4. Add your domain to authorized domains

### 5. MongoDB Setup
1. Create MongoDB Atlas cluster
2. Create database user
3. Whitelist your IP address
4. Get connection string

### 6. Cloudinary Setup
1. Create Cloudinary account
2. Get cloud name, API key, and API secret
3. Configure upload presets (optional)

### 7. Run Development Servers

```bash
# Start backend server
npm run server:dev

# In another terminal, start frontend
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Add all `NEXT_PUBLIC_*` variables in Vercel dashboard

3. **Custom Domain**
   - Purchase .lk domain from LK Domain Registry
   - Add domain in Vercel dashboard
   - Update DNS records

### Backend Deployment (Render)

1. **Create Render Account**
   - Connect GitHub repository
   - Choose "Web Service"

2. **Configuration**
   ```yaml
   # Use provided render.yaml
   Build Command: npm install
   Start Command: npm run server
   ```

3. **Environment Variables**
   Add all server environment variables in Render dashboard

### Database (MongoDB Atlas)

1. **Production Setup**
   - Upgrade to paid tier for production
   - Enable backup
   - Set up monitoring
   - Configure IP whitelist for Render

### Domain Setup (.lk Domain)

1. **Purchase Domain**
   - Visit LK Domain Registry or authorized reseller
   - Cost: ~Rs. 3,000-4,000/year

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: @
   Value: your-vercel-app.vercel.app
   
   Type: CNAME  
   Name: www
   Value: your-vercel-app.vercel.app
   ```

## 📱 Mobile Responsiveness

The platform is built with mobile-first approach:

- **Responsive Grid System** - Adapts to all screen sizes
- **Touch-Friendly Interface** - Optimized for mobile interactions
- **Fast Loading** - Optimized images and lazy loading
- **Offline Support** - Service worker for basic offline functionality
- **PWA Ready** - Can be installed as mobile app

## 🔧 Admin Panel Access

### Default Admin Login
- URL: `/admin/login`
- Email: `admin@hardwaretools.lk`
- Password: `admin123456` (change immediately)

### Admin Features
- Dashboard with analytics
- Product management (CRUD operations)
- Order processing and tracking
- Customer chat support
- Content management
- Settings and configuration

## 💳 Payment Integration

### Current: Bank Transfer
- Customer uploads payment receipt
- Admin reviews and confirms payment
- Order status updates automatically

### Coming Soon: Card Payments
- Stripe/PayHere integration ready
- Just need to enable in admin settings
- Automatic payment processing

## 📞 Support & Maintenance

### Monthly Maintenance Plans (Sri Lankan Market)

**Basic Plan - Rs. 5,000/month**
- Minor content updates
- Bug fixes
- Basic support

**Standard Plan - Rs. 12,000/month**
- Content management
- Product updates
- Feature enhancements
- Priority support

**Premium Plan - Rs. 20,000+/month**
- Custom development
- Advanced features
- 24/7 support
- Performance optimization

### Hosting Costs (Monthly)
- **Vercel (Frontend)**: Free → $20/month
- **Render (Backend)**: Free → $7/month  
- **MongoDB Atlas**: Free → $9/month
- **Cloudinary**: Free → $89/month
- **Domain (.lk)**: Rs. 250-350/month

## 🔒 Security Features

- **Firebase Authentication** - Secure user management
- **JWT Tokens** - API authentication
- **Rate Limiting** - Prevent abuse
- **CORS Protection** - Cross-origin security
- **Input Validation** - Prevent injection attacks
- **HTTPS Enforcement** - Secure data transmission
- **Environment Variables** - Secure configuration

## 📊 Performance Optimization

- **Next.js Optimization** - Automatic code splitting
- **Image Optimization** - Cloudinary transformations
- **Lazy Loading** - Load content as needed
- **Caching Strategy** - Redis for session management
- **CDN Integration** - Global content delivery
- **Database Indexing** - Optimized queries

## 🎨 Design System

### Color Palette
```css
--brand-900: #0b1620 (Deep slate)
--brand-500: #2a6f8f (Primary teal)
--accent-500: #f59e0b (Amber accent)
--success-500: #16a34a (Green)
--danger-500: #ef4444 (Red)
```

### Typography
- **Primary**: Inter (400, 600, 700, 800)
- **Secondary**: Poppins (400, 600, 700, 800)

### Components
- Glass morphism effects
- Smooth animations (Framer Motion)
- Custom cursor interactions
- Skeleton loading states
- Toast notifications

## 📈 SEO & Marketing

- **Meta Tags** - Optimized for search engines
- **Open Graph** - Social media sharing
- **Structured Data** - Rich snippets
- **Sitemap** - Automatic generation
- **Analytics Ready** - Google Analytics integration
- **Newsletter** - Email collection system

## 🔄 Future Enhancements

### Phase 2 Features
- **Mobile App** - React Native version
- **Advanced Analytics** - Business intelligence
- **Multi-language** - Sinhala/Tamil support
- **Loyalty Program** - Customer rewards
- **Bulk Orders** - B2B functionality
- **API Integration** - Third-party services

### Scalability
- **Microservices** - Service separation
- **Load Balancing** - High availability
- **Database Sharding** - Performance scaling
- **CDN Optimization** - Global performance
- **Monitoring** - Application performance monitoring

## 📞 Contact & Support

For technical support or customization requests:

- **Email**: support@hardwaretools.lk
- **Phone**: +94 11 234 5678
- **Address**: 123 Main Street, Colombo 03, Sri Lanka

## 📄 License

This project is proprietary software developed for Hardware Tools Sri Lanka. All rights reserved.

---

**Built with ❤️ for Sri Lankan businesses**

*Professional, scalable, and ready for production use.*
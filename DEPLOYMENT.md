# Deployment Guide - Hardware Tools Sri Lanka

Complete step-by-step deployment guide for production environment.

## 🚀 Pre-Deployment Checklist

### 1. Accounts Setup
- [ ] Firebase project created and configured
- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account setup
- [ ] Vercel account connected to GitHub
- [ ] Render account created
- [ ] Domain purchased (.lk domain)

### 2. Environment Variables Ready
- [ ] All Firebase configuration keys
- [ ] MongoDB connection string
- [ ] Cloudinary credentials
- [ ] JWT secret generated
- [ ] Admin credentials set

### 3. Code Preparation
- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Build process verified
- [ ] Database models and indexes ready

## 📱 Frontend Deployment (Vercel)

### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: hardware-tools-frontend
# - Directory: ./
# - Override settings? No
```

### Step 3: Configure Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hardware-tools-lk.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hardware-tools-lk
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hardware-tools-lk.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://your-backend.onrender.com
```

### Step 4: Custom Domain Setup
1. **Add Domain in Vercel**
   - Go to Project → Settings → Domains
   - Add your .lk domain (e.g., hardwaretools.lk)

2. **Configure DNS Records**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP)
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Step 5: Production Deployment
```bash
# Deploy to production
vercel --prod

# Your site will be available at:
# https://hardwaretools.lk
```

## 🖥 Backend Deployment (Render)

### Step 1: Create Web Service
1. Go to Render Dashboard
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Configure:
   ```
   Name: hardware-tools-api
   Environment: Node
   Build Command: npm install
   Start Command: npm run server
   ```

### Step 2: Environment Variables
Add in Render Dashboard → Environment:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hardware_tools_db
JWT_SECRET=your-super-secret-jwt-key-256-bit
FIREBASE_ADMIN_PROJECT_ID=hardware-tools-lk
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@hardware-tools-lk.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----"
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-cloudinary-secret
ADMIN_EMAIL=admin@hardwaretools.lk
ADMIN_PASSWORD=secure-admin-password-2024
PORT=5000
```

### Step 3: Deploy
1. Click "Create Web Service"
2. Wait for build to complete
3. Your API will be available at: `https://your-service.onrender.com`

### Step 4: Update Frontend Environment
Update Vercel environment variables with your Render URL:
```env
NEXT_PUBLIC_API_URL=https://your-service.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://your-service.onrender.com
```

## 🗄 Database Setup (MongoDB Atlas)

### Step 1: Production Cluster
1. **Upgrade to Paid Tier**
   - Go to MongoDB Atlas Dashboard
   - Upgrade from M0 (free) to M10 (production)
   - Choose region closest to your users (Singapore for Sri Lanka)

2. **Security Configuration**
   ```
   Database Access:
   - Username: hardware_tools_prod
   - Password: [Generate secure password]
   - Roles: readWrite@hardware_tools_db
   
   Network Access:
   - Add Render IP addresses
   - 0.0.0.0/0 (for development, restrict in production)
   ```

### Step 2: Database Optimization
```javascript
// Create indexes for better performance
db.products.createIndex({ name: "text", description: "text", brand: "text" })
db.products.createIndex({ categoryId: 1 })
db.products.createIndex({ brand: 1 })
db.products.createIndex({ price: 1 })
db.products.createIndex({ isActive: 1, isFeatured: 1 })
db.users.createIndex({ firebaseUID: 1 })
db.users.createIndex({ email: 1 })
db.orders.createIndex({ userId: 1 })
db.orders.createIndex({ orderNumber: 1 })
```

### Step 3: Backup Configuration
1. Enable automated backups
2. Set retention period (7 days minimum)
3. Configure backup schedule

## 🖼 Image Storage (Cloudinary)

### Step 1: Production Setup
1. **Upgrade Account**
   - Free tier: 25GB storage, 25GB bandwidth
   - Paid tier: Unlimited storage, pay per usage

2. **Upload Presets**
   ```javascript
   // Create upload preset for products
   {
     "name": "hardware_products",
     "unsigned": false,
     "folder": "products",
     "transformation": [
       {"quality": "auto", "fetch_format": "auto"},
       {"width": 800, "height": 800, "crop": "limit"}
     ]
   }
   ```

### Step 2: Optimization Settings
```javascript
// Auto-optimization settings
{
  "quality": "auto:good",
  "fetch_format": "auto",
  "flags": "progressive",
  "dpr": "auto"
}
```

## 🌐 Domain Configuration (.lk Domain)

### Step 1: Purchase Domain
1. **Authorized Registrars**
   - LK Domain Registry (official)
   - Web.lk
   - Domains.lk
   - SLTMobitel

2. **Cost**: Rs. 3,000 - 4,000 per year

### Step 2: DNS Configuration
```
# Main domain
Type: A
Name: @
Value: 76.76.19.61
TTL: 3600

# WWW subdomain  
Type: CNAME
Name: www
Value: hardwaretools.lk
TTL: 3600

# API subdomain (optional)
Type: CNAME
Name: api
Value: your-service.onrender.com
TTL: 3600
```

### Step 3: SSL Certificate
- Vercel automatically provides SSL certificates
- Certificate auto-renewal enabled
- Force HTTPS redirect enabled

## 🔒 Security Configuration

### Step 1: Firebase Security Rules
```javascript
// Firestore rules (if using Firestore)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Step 2: CORS Configuration
```javascript
// In server/index.js
app.use(cors({
  origin: [
    'https://hardwaretools.lk',
    'https://www.hardwaretools.lk'
  ],
  credentials: true
}));
```

### Step 3: Rate Limiting
```javascript
// Production rate limits
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
```

## 📊 Monitoring & Analytics

### Step 1: Application Monitoring
1. **Render Monitoring**
   - Built-in metrics dashboard
   - CPU, memory, response time monitoring
   - Error tracking and alerts

2. **Vercel Analytics**
   - Core Web Vitals monitoring
   - Performance insights
   - Real user monitoring

### Step 2: Database Monitoring
1. **MongoDB Atlas Monitoring**
   - Performance advisor
   - Real-time metrics
   - Alert configuration

### Step 3: Error Tracking
```javascript
// Add error tracking service (optional)
// Sentry, LogRocket, or similar
```

## 🚀 Go-Live Checklist

### Pre-Launch
- [ ] All environment variables configured
- [ ] Database indexes created
- [ ] SSL certificates active
- [ ] Domain DNS propagated
- [ ] Admin account created and tested
- [ ] Payment system tested
- [ ] Email notifications working
- [ ] Chat system functional
- [ ] Mobile responsiveness verified

### Launch Day
- [ ] Deploy latest code to production
- [ ] Verify all functionality
- [ ] Test order flow end-to-end
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Announce launch

### Post-Launch
- [ ] Monitor traffic and performance
- [ ] Set up regular backups
- [ ] Configure monitoring alerts
- [ ] Plan maintenance schedule
- [ ] Gather user feedback

## 🔧 Maintenance & Updates

### Daily Tasks
- Monitor error logs
- Check system performance
- Review new orders
- Respond to customer inquiries

### Weekly Tasks
- Database backup verification
- Security updates check
- Performance optimization
- Content updates

### Monthly Tasks
- Full system backup
- Security audit
- Performance review
- Feature planning

## 📞 Support Contacts

### Technical Issues
- **Vercel Support**: https://vercel.com/support
- **Render Support**: https://render.com/support  
- **MongoDB Support**: https://support.mongodb.com
- **Firebase Support**: https://firebase.google.com/support

### Domain Issues
- **LK Domain Registry**: +94 11 2 369 099
- **Email**: info@nic.lk

## 💰 Cost Breakdown (Monthly)

### Hosting Costs
```
Vercel Pro: $20/month (after free tier)
Render: $7/month (after free tier)
MongoDB Atlas M10: $57/month
Cloudinary: $89/month (after free tier)
Domain: ~Rs. 300/month (~$1)

Total: ~$174/month (~Rs. 52,000/month)
```

### Scaling Options
- Start with free tiers
- Upgrade based on traffic
- Monitor usage and costs
- Optimize for Sri Lankan market

---

**🎉 Congratulations! Your Hardware Tools e-commerce platform is now live!**

Visit your site at: https://hardwaretools.lk
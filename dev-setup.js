// Development setup script
console.log('🚀 Hardware Tools E-commerce Development Setup');
console.log('');
console.log('📋 Quick Setup Checklist:');
console.log('');
console.log('1. ✅ Dependencies installed');
console.log('2. ⚠️  Environment variables needed (.env.local)');
console.log('3. ⚠️  Firebase project setup required');
console.log('4. ⚠️  MongoDB connection needed');
console.log('');
console.log('🔧 For quick testing without backend:');
console.log('   - Frontend will run on http://localhost:3000');
console.log('   - Some features will show mock data');
console.log('   - Authentication will be disabled');
console.log('');
console.log('📖 See README.md for complete setup instructions');
console.log('');

// Check if .env.local exists
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  Creating sample .env.local file...');
  
  const sampleEnv = `# Firebase Configuration (Required for authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# API URLs (Backend)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# For development without backend, you can use mock data
# Just leave the API URLs as above and the frontend will handle gracefully
`;

  fs.writeFileSync(envPath, sampleEnv);
  console.log('✅ Sample .env.local created');
} else {
  console.log('✅ .env.local file exists');
}

console.log('');
console.log('🚀 Ready to start development server!');
console.log('   Run: npm run dev');
console.log('');
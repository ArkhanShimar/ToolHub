import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '../contexts/WishlistContext';
import '../styles/globals.css';

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Hardware Tools Sri Lanka - Professional Grade Tools & Spare Parts</title>
        <meta name="description" content="Sri Lanka's premier destination for professional hardware tools, spare parts, and machinery essentials. Quality products with reliable service." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hardwaretools.lk/" />
        <meta property="og:title" content="Hardware Tools Sri Lanka - Professional Grade Tools" />
        <meta property="og:description" content="Sri Lanka's premier destination for professional hardware tools, spare parts, and machinery essentials." />
        <meta property="og:image" content="/assets/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hardwaretools.lk/" />
        <meta property="twitter:title" content="Hardware Tools Sri Lanka - Professional Grade Tools" />
        <meta property="twitter:description" content="Sri Lanka's premier destination for professional hardware tools, spare parts, and machinery essentials." />
        <meta property="twitter:image" content="/assets/og-image.jpg" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Layout>
              <AnimatePresence mode="wait" initial={false}>
                <Component {...pageProps} key={router.asPath} />
              </AnimatePresence>
            </Layout>
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#333',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(11,16,20,0.08)',
                  border: '1px solid #e5e7eb',
                },
                success: {
                  iconTheme: {
                    primary: '#16a34a',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
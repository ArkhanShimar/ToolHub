import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from '../CustomCursor';
import ChatWidget from '../Common/ChatWidget';
import { pageTransition } from '../../lib/motionVariants';

export default function Layout({ children }) {
  const router = useRouter();
  
  // Don't show header/footer on admin pages
  const isAdminPage = router.pathname.startsWith('/admin');
  
  if (isAdminPage) {
    return (
      <>
        <CustomCursor />
        <AnimatePresence mode="wait">
          <motion.main
            key={router.pathname}
            variants={pageTransition}
            initial="initial"
            animate="enter"
            exit="exit"
            className="min-h-screen"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen flex flex-col relative">
        <Header />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={router.pathname}
            variants={pageTransition}
            initial="initial"
            animate="enter"
            exit="exit"
            className="flex-1"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        
        <Footer />
        
        {/* Chat Widget */}
        <ChatWidget />
      </div>
    </>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon,
  PaperAirplaneIcon 
} from '@heroicons/react/24/outline';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How can we help you today?",
      sender: 'support',
      timestamp: new Date()
    }
  ]);

  // Close chat when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.chat-widget')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleCloseChat = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate support response
    setTimeout(() => {
      const supportResponse = {
        id: Date.now() + 1,
        text: "Thanks for your message! Our team will get back to you shortly.",
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button - Mobile Responsive */}
      <motion.button
        onClick={handleToggleChat}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-accent-500 text-white rounded-full shadow-lg hover:bg-accent-600 transition-all hover:scale-110 flex items-center justify-center chat-widget"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <XMarkIcon className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window - Mobile Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-16 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm md:w-80 h-80 md:h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden chat-widget"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Mobile Responsive */}
            <div className="bg-accent-500 text-white p-3 md:p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm md:text-base">Live Support</h3>
                <p className="text-xs md:text-sm text-accent-100">We're here to help!</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full"></div>
                <button
                  onClick={handleCloseChat}
                  className="p-1 hover:bg-accent-600 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <XMarkIcon className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            {/* Messages - Mobile Responsive */}
            <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-2 md:space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-xs px-2.5 py-1.5 md:px-3 md:py-2 rounded-lg text-xs md:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-accent-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input - Mobile Responsive */}
            <form onSubmit={handleSendMessage} className="p-3 md:p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-2.5 py-1.5 md:px-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-xs md:text-sm"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1.5 md:px-3 md:py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors flex items-center justify-center"
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
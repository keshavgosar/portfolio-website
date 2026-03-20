import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function WoodenPanel({ title, children, onClose }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [children]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50 }}
      className="absolute inset-2 md:inset-8 z-50 flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="bg-wood-dark p-2 md:p-3 rounded-2xl shadow-2xl border-4 border-black pointer-events-auto w-full max-w-7xl h-full max-h-full relative flex flex-col">
        
        {/* CHANGED: Adjusted positioning so it doesn't get cut off on mobile screens */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-red-600 border-2 border-black rounded-full p-2 text-white hover:bg-red-500 z-50 shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>

        <div className="bg-wood rounded-xl p-3 md:p-6 border-4 border-wood-light flex flex-col flex-1 overflow-hidden">
          
          {/* CHANGED: Scaled down the title text for mobile phones */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-medieval text-white text-center mb-3 md:mb-4 drop-shadow-md border-b-2 border-wood-light pb-2 shrink-0">
            {title}
          </h2>
          
          <div 
            ref={scrollRef} 
            className="bg-parchment rounded-lg p-3 md:p-8 flex-1 overflow-y-auto font-casual text-base md:text-lg border-2 border-wood-dark shadow-inner text-gray-800"
          >
            {children}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
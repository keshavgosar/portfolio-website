import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sword, Target, ScrollText, Mail, LogOut } from 'lucide-react';

export default function MapScene({ onNavigate, onBack }) {
  // Define our map locations
  const locations = [
    { id: 'about', label: 'The Castle (About Me)', icon: Shield, x: '30%', y: '25%', color: 'text-blue-400' },
    { id: 'skills', label: 'Training Ground (Skills)', icon: Sword, x: '10%', y: '55%', color: 'text-gray-300' },
    { id: 'projects', label: 'The Dungeon (Projects)', icon: Target, x: '58%', y: '18%', color: 'text-red-500' },
    { id: 'experience', label: 'The Tavern (Experience)', icon: ScrollText, x: '32%', y: '65%', color: 'text-amber-500' },
    { id: 'contact', label: 'Message Board (Contact)', icon: Mail, x: '60%', y: '62%', color: 'text-green-400' },
  ];

  // Animation variants for the nodes popping in
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } // Nodes appear one after another
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.5 } }
  };

   return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full flex flex-col bg-[#2b1d14]" 
    >
      {/* Back to Title Button */}
      <button 
        onClick={onBack}
        className="absolute top-2 left-2 md:top-4 md:left-4 z-20 bg-wood-dark border-2 border-wood-light text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
        title="Return to Title Screen"
      >
        <LogOut size={24} className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Header */}
      <div className="w-full text-center z-10 pt-3 pb-3 md:pt-4 md:pb-4 shrink-0 bg-wood-dark border-b-4 border-wood shadow-2xl relative">
        <h2 className="text-2xl md:text-5xl font-medieval text-white drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
          Select Your Quest
        </h2>
      </div>

      {/* MAP AREA */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden flex items-center justify-center p-2">
        
        {/* THIS IS THE MAGIC FIX: 
            By using an inline-block wrapper and an img tag, this box tightly hugs the 
            image at all times. This ensures your % coordinates NEVER float off the map! */}
        <div className="relative inline-block max-w-full max-h-full shadow-2xl rounded-xl overflow-hidden">
          
          <img 
            src="/assets/map.png" 
            alt="World Map" 
            className="block w-auto h-auto max-w-full max-h-[80vh]" 
          />
          
          {/* Slight dark overlay */}
          <div className="absolute inset-0 bg-[#4A2C1A]/40 pointer-events-none" />

          {/* Interactive Map Nodes */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="absolute inset-0 z-10"
          >
            {locations.map((loc) => (
              <motion.button
                key={loc.id}
                variants={nodeVariants}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(loc.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center"
                style={{ top: loc.y, left: loc.x }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20" />
                  
                  {/* Pin Icons shrink on mobile to prevent overlapping */}
                  <div className="w-10 h-10 md:w-20 md:h-20 bg-wood border-2 md:border-4 border-wood-light rounded-full flex items-center justify-center text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] group-hover:bg-wood-light transition-colors relative z-10">
                    <loc.icon className={`w-5 h-5 md:w-9 md:h-9 drop-shadow-lg ${loc.color}`} />
                  </div>
                </div>
                
                {/* Text Labels shrink and wrap dynamically on mobile */}
                <div className="mt-1 md:mt-3 bg-wood-dark border-2 border-black px-2 py-0.5 md:px-4 md:py-1 rounded shadow-lg max-w-[70px] md:max-w-none text-center">
                  <span className="text-white font-casual text-[9px] leading-tight md:text-base font-bold md:whitespace-nowrap drop-shadow-md block">
                    {loc.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
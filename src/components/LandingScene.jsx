import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- ADD YOUR VIDEO CLIPS HERE ---
const highlightClips = [
  "/assets/projectclips/verdant-souls/verdantsoulsdemo3 (1).webm",
  "/assets/projectclips/nightfall-chronicles/CombatMechanic.webm",
  "/assets/projectclips/dungeon-puzzle/DungeonPuzzlemain.webm",
  "/assets/projectclips/toon-tanks/ToonTanksCombat.webm"
];

export default function LandingScene({ onEnter }) {
  const [currentClip, setCurrentClip] = useState(0);

  const nextClip = () => {
    setCurrentClip((prev) => (prev + 1) % highlightClips.length);
  };

  const prevClip = () => {
    setCurrentClip((prev) => (prev === 0 ? highlightClips.length - 1 : prev - 1));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black relative p-4 md:p-8">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('assets/landscape.png')] opacity-30 bg-cover bg-center" />
      
      {/* 
        Main Container 
        flex-col on mobile (stacked)
        md:flex-row on desktop (side-by-side)
      */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* LEFT SIDE: Name and Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center md:items-start text-center md:text-left flex-1"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medieval text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-700 drop-shadow-[0_5px_5px_rgba(0,0,0,1)] mb-4 leading-tight">
            Keshav Gosar
          </h1>
          <h2 className="text-xl md:text-3xl text-gray-300 font-casual italic mb-8 md:mb-12">
            Gameplay Programmer
          </h2>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(253, 224, 71, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="bg-red-800 text-yellow-100 border-2 border-yellow-600 px-8 py-4 rounded-lg font-medieval text-2xl uppercase tracking-widest transition-all shadow-xl"
          >
            Begin Quest
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE: Video Slider */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="flex-1 w-full max-w-2xl flex justify-center md:justify-end"
        >
          {/* TV/Frame for the video */}
          <div className="relative w-full aspect-video bg-wood-dark border-4 border-wood-light rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden group">
            
            {/* The Video Player with Crossfade */}
            <AnimatePresence mode="wait">
              <motion.video
                key={currentClip} // The key forces React to crossfade when the clip changes
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={highlightClips[currentClip]}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Left Control Arrow */}
            <button 
              onClick={prevClip}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-600 border-2 border-wood-light text-white p-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all z-20 active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Control Arrow */}
            <button 
              onClick={nextClip}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-600 border-2 border-wood-light text-white p-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all z-20 active:scale-95"
            >
              <ChevronRight size={24} />
            </button>

            {/* Video Indicators (Little dots at the bottom) */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {highlightClips.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-3 h-3 rounded-full border-2 border-black transition-colors ${
                    idx === currentClip ? 'bg-yellow-400' : 'bg-gray-400/50'
                  }`} 
                />
              ))}
            </div>

            {/* Inner Shadow overlay to make it look like an inset screen */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none z-10" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
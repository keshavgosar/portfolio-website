import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, Linkedin, Youtube } from 'lucide-react';

const highlightClips = [
  "/assets/projectclips/verdant-souls/verdantsoulsdemo3 (1).webm",
  "/assets/projectclips/nightfall-chronicles/CombatMechanic.webm",
  "/assets/projectclips/toon-tanks/ToonTanksCombat.webm",
  "/assets/projectclips/dungeon-puzzle/DungeonPuzzlemain.webm"
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
      <div className="absolute inset-0 bg-[url('/assets/landscape.png')] opacity-30 bg-cover bg-center" />
      
      {/* --- HEADER: Social Links (Top Right) --- */}
      {/* CHANGED: Added a dark gradient that fades downward (from-black/90 to-transparent) and dimmed the icons to text-gray-500 */}
      <div className="absolute top-0 w-full p-4 md:p-6 flex justify-end items-center gap-4 md:gap-6 z-50 bg-gradient-to-b from-black/90 via-black/50 to-transparent pb-12">
        <a 
          href="https://www.linkedin.com/in/keshav-gosar-479460227" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 hover:text-amber-500 hover:scale-110 transition-all drop-shadow-md cursor-pointer"
        >
          <Linkedin size={28} className="md:w-8 md:h-8" />
        </a>
        <a 
          href="https://github.com/keshavgosar" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 hover:text-amber-500 hover:scale-110 transition-all drop-shadow-md cursor-pointer"
        >
          <Github size={28} className="md:w-8 md:h-8" />
        </a>
        <a 
          href="https://youtube.com/@keshavgosar?si=tzOAaueMIfgCApq_" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-500 hover:text-amber-500 hover:scale-110 transition-all drop-shadow-md cursor-pointer"
        >
          <Youtube size={32} className="md:w-9 md:h-9" />
        </a>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mt-8 md:mt-0">
        
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
          <h2 className="text-xl md:text-3xl text-gray-300 font-casual italic mb-8 md:mb-6">
            Gameplay Programmer
          </h2>
          <p className="text-xl md:text-1xl text-gray-300 font-casual italic mb-8 md:mb-12 max-w-lg">
          Forging immersive player experiences and robust game systems through the power of Unreal Engine and Unity.
          </p>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(253, 224, 71, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="bg-red-800 text-yellow-100 border-2 border-yellow-600 px-8 py-4 rounded-lg font-medieval text-2xl uppercase tracking-widest transition-all shadow-xl cursor-pointer"
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
          <div className="relative w-full aspect-video bg-wood-dark border-4 border-wood-light rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden group">
            
            <AnimatePresence mode="wait">
              <motion.video
                key={currentClip}
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

            <button 
              onClick={prevClip}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-600 border-2 border-wood-light text-white p-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all z-20 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              onClick={nextClip}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-600 border-2 border-wood-light text-white p-2 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-all z-20 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>

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

            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none z-10" />
          </div>
        </motion.div>
      </div>

      {/* --- FOOTER: Copyright (Bottom Center) --- */}
      {/* CHANGED: Added dark gradient fading upwards (from-black/90 to-transparent) and dimmed text to text-gray-500 */}
      <div className="absolute bottom-0 w-full text-center z-50 pointer-events-none bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-2 md:pb-4">
        <p className="text-gray-500 font-casual text-[10px] md:text-sm tracking-wider drop-shadow-md">
          © 2026 Keshav Gosar. All rights reserved.
        </p>
      </div>

    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Swords } from 'lucide-react';

export default function ProjectSlider({ projects, onSelectProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  if (!projects || projects.length === 0) return null;
  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-wood border-4 border-wood-dark rounded-xl p-4 shadow-xl">
      
      {/* MEDIA DISPLAY */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border-2 border-wood-light shadow-inner mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {currentProject.mediaType === 'video' ? (
              <video src={currentProject.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={currentProject.mediaUrl} alt={currentProject.title} className="w-full h-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>

        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-wood-dark border-2 border-wood-light text-white p-1 rounded-full hover:bg-yellow-600 transition-colors z-10"><ChevronLeft size={28} /></button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-wood-dark border-2 border-wood-light text-white p-1 rounded-full hover:bg-yellow-600 transition-colors z-10"><ChevronRight size={28} /></button>
      </div>

      {/* PROJECT INFO (Slider View) */}
      <div className="text-center bg-parchment p-4 rounded-lg border-2 border-wood-dark shadow-inner flex flex-col items-center">
        <h3 className="text-3xl font-medieval text-wood-dark font-bold mb-1">{currentProject.title}</h3>
        
        {/* Very small description */}
        <p className="text-gray-600 text-xs md:text-sm italic mb-3 max-w-md">
          {currentProject.shortDescription}
        </p>

        {/* Highlighted Game Systems */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {currentProject.mainSystems.map((sys, idx) => (
            <span key={idx} className="bg-blue-900 border border-blue-400 text-blue-100 px-3 py-1 rounded-md text-xs font-bold shadow-sm">
              {sys}
            </span>
          ))}
        </div>

        {/* OPEN DEEP DIVE BUTTON */}
        <button 
          onClick={() => onSelectProject(currentProject)}
          className="inline-flex items-center gap-2 bg-gradient-to-b from-red-700 to-red-900 border-2 border-black text-white px-6 py-2 rounded-lg font-medieval text-lg hover:from-red-600 hover:to-red-800 transition-all shadow-md active:scale-95 mt-2"
        >
          <Swords size={20} />
          View Quest Details
        </button>
      </div>

    </div>
  );
}
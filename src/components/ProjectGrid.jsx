import React from 'react';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';

export default function ProjectGrid({ projects, onSelectProject }) {
  if (!projects || projects.length === 0) return null;

  return (
    // The grid! 1 column on small screens, 2 columns side-by-side on medium+ screens
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
      {projects.map((project, index) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }} // Stagger the animation so they pop in one after another
          className="bg-wood border-4 border-wood-dark rounded-xl p-4 shadow-xl flex flex-col h-full"
        >
          {/* MEDIA DISPLAY */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border-2 border-wood-light shadow-inner mb-4 shrink-0">
            {project.mediaType === 'video' ? (
              <video src={project.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={project.mediaUrl} alt={project.title} className="w-full h-full object-cover" />
            )}
          </div>

          {/* PROJECT INFO */}
          <div className="bg-parchment p-4 rounded-lg border-2 border-wood-dark shadow-inner flex flex-col items-center flex-1">
            <h3 className="text-2xl lg:text-3xl font-medieval text-wood-dark font-bold mb-1 text-center">
              {project.title}
            </h3>
            
            {/* Very small description */}
            <p className="text-gray-600 text-xs md:text-sm italic mb-4 text-center line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Highlighted Game Systems */}
            <div className="flex flex-wrap justify-center gap-2 mb-auto pb-4">
              {project.mainSystems.map((sys, idx) => (
                <span key={idx} className="bg-blue-900 border border-blue-400 text-blue-100 px-2 py-1 rounded text-xs font-bold shadow-sm">
                  {sys}
                </span>
              ))}
            </div>

            {/* OPEN DEEP DIVE BUTTON */}
            <button 
              onClick={() => onSelectProject(project)}
              className="mt-4 w-full justify-center inline-flex items-center gap-2 bg-gradient-to-b from-red-700 to-red-900 border-2 border-black text-white px-4 py-2 rounded-lg font-medieval text-lg hover:from-red-600 hover:to-red-800 transition-all shadow-md active:scale-95"
            >
              <Swords size={20} />
              View Quest Details
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
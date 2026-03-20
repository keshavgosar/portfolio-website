import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Download } from 'lucide-react';

export default function ProjectDetail({ project, onBack }) {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col gap-6"
    >
      {/* HEADER: Back Button, Title, Tags, & Download Link */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b-4 border-wood-light pb-4">
        
        <div className="flex items-start gap-4">
          <button 
            onClick={onBack}
            className="bg-wood-dark border-2 border-wood-light text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-md active:scale-95 mt-1 shrink-0"
            title="Back to Quests"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div>
            <h2 className="text-4xl font-medieval text-wood-dark font-bold drop-shadow-sm">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.skills.map((skill, idx) => (
                <span key={idx} className="bg-amber-100 border border-amber-600 text-amber-900 px-2 py-1 rounded text-xs font-bold shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* DOWNLOAD / PLAY BUTTON */}
        {project.downloadUrl && project.downloadUrl !== "#" && (
          <a 
            href={project.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-green-600 to-green-800 border-2 border-green-900 text-white px-6 py-2 rounded-lg font-medieval text-xl hover:from-green-500 hover:to-green-700 transition-all shadow-md active:scale-95 shrink-0 whitespace-nowrap"
          >
            <Download size={20} />
            Play / View Quest
          </a>
        )}

      </div>

      {/* OVERVIEW SECTION */}
      <div className="bg-white/50 p-4 rounded-lg border-2 border-wood-light shadow-inner">
        <h3 className="text-2xl font-medieval text-wood-dark font-bold mb-2">Quest Overview</h3>
        <p className="text-gray-800 leading-relaxed text-sm md:text-base">
          {project.longDescription}
        </p>
      </div>

      {/* CORE MECHANICS SECTION */}
      <div>
        <h3 className="text-3xl font-medieval text-wood-dark font-bold mb-4 text-center decoration-wood-light underline decoration-4 underline-offset-8">
          Core Mechanics
        </h3>
        <div className="flex flex-col gap-6">
          {project.mechanics.map((mech, idx) => (
            <div key={idx} className="bg-wood border-4 border-wood-dark rounded-xl p-2 shadow-lg flex flex-col md:flex-row gap-4">
              
              {/* Mechanic Video Clip */}
              <div className="relative w-full md:w-1/2 aspect-video bg-black rounded-lg overflow-hidden border-2 border-wood-light shrink-0">
                <video src={mech.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                
                {/* Corner Title */}
                <div className="absolute top-0 left-0 bg-red-700 border-b-2 border-r-2 border-black text-white px-3 py-1 rounded-br-lg font-medieval font-bold shadow-md z-10">
                  {mech.title}
                </div>
              </div>

              {/* Mechanic Description & Features */}
              <div className="bg-parchment flex-1 rounded-lg p-4 border-2 border-wood-dark shadow-inner">
                <p className="text-gray-800 text-sm mb-3 font-semibold border-b border-gray-300 pb-2">
                  {mech.description}
                </p>
                <ul className="space-y-2">
                  {mech.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* YOUTUBE DEMO SECTION */}
      {project.youtubeUrl && (
        <div className="mt-4 bg-wood-dark p-4 rounded-xl shadow-xl border-4 border-black">
          <h3 className="text-2xl font-medieval text-white text-center mb-4">Full Gameplay Demo</h3>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-wood-light">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src={project.youtubeUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </motion.div>
  );
}
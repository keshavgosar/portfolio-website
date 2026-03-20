import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, Star, MapPin } from 'lucide-react';

const questData = [
  {
    id: 1,
    title: "Game Programmer Intern",
    guild: "EdTech Creation",
    era: "July 2025 - Feb 2026",
    description: "Joined the guild (Remote / Hongkong) to work across multiple titles using Unreal Engine 5. Focused heavily on UI architecture, network replication, and core gameplay mechanics.",
    achievements: [
      "Designed a full gameplay replay system recording frame-by-frame actor states and projectile data.",
      "Built a 3D math trajectory prediction system to render projectile paths in real-time.",
      "Collaborated on multiplayer features, ensuring projectile logic was correctly replicated across clients.",
      "Engineered a data-driven level management system using JSON so designers could modify levels without code.",
      "Developed complex dynamic UI using UMG, binding data models directly to interface elements."
    ]
  },
  {
    id: 2,
    title: "B.Tech, Computer Science",
    guild: "Prestige Institute of Engineering Management & Research",
    era: "Class of May 2026",
    description: "Training in the foundational arts of software engineering, data structures, and computer architecture in Indore, India.",
    achievements: [
      "Specializing in programming fundamentals and software architecture.",
      "Building a strong foundation in C++, C#, and 3D math.",
      "Applying academic logic directly into complex game engine development."
    ]
  }
];

export default function QuestLog() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-4">
      {/* Vertical Timeline Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 bg-wood-dark border-x border-wood-light transform md:-translate-x-1/2 rounded-full" />

      <div className="flex flex-col gap-12">
        {questData.map((quest, index) => {
          // Alternate left and right for desktop
          const isLeft = index % 2 === 0;

          return (
            <motion.div 
              key={quest.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-500 border-4 border-wood-dark rounded-full flex items-center justify-center z-10 shadow-lg">
                <Scroll size={20} className="text-wood-dark" />
              </div>

              {/* Spacer for the other side on desktop */}
              <div className="hidden md:block w-1/2" />

              {/* Quest Card */}
              <div className={`w-full md:w-1/2 pl-16 pr-4 md:px-8 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                <div className="bg-white/80 p-6 rounded-xl border-4 border-wood shadow-xl relative overflow-hidden group hover:bg-white transition-colors">
                  
                  {/* Decorative Background Icon */}
                  <Star className={`absolute opacity-5 w-32 h-32 -bottom-4 ${isLeft ? '-left-4' : '-right-4'} text-wood-dark`} />
                  
                  <h3 className="text-2xl font-medieval text-wood-dark font-bold mb-1">{quest.title}</h3>
                  
                  <div className={`flex items-center gap-2 text-sm font-bold text-red-700 mb-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                    <MapPin size={16} />
                    {quest.guild}
                  </div>
                  
                  <span className="inline-block bg-wood-dark text-white px-3 py-1 rounded-full text-xs font-casual mb-4 shadow-inner">
                    Era: {quest.era}
                  </span>

                  <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
                    {quest.description}
                  </p>

                  <ul className={`space-y-2 text-sm text-gray-800 ${isLeft ? 'md:ml-auto md:text-right' : ''}`}>
                    {quest.achievements.map((achieve, aIdx) => (
                      <li key={aIdx} className={`flex items-start gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-green-600 mt-1 shrink-0">⚔️</span>
                        <span className={isLeft ? 'text-right' : 'text-left'}>{achieve}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
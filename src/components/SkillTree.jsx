import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Box, Wrench } from 'lucide-react';

// --- SKILL DATA ---
const skillData = [
  {
    branch: "Languages & Tools",
    icon: Code2,
    skills: [
      { id: 'cpp', name: "C++", level: "Expert", desc: "My primary weapon. Extensive experience building scalable engine architecture, modular AI systems, and core combat logic in Unreal Engine." },
      { id: 'csharp', name: "C#", level: "Expert", desc: "Used extensively in Unity to architect branching RPG systems, state machines, and data persistence via JSON serialization." },
      { id: 'js', name: "JSON / Data", level: "Adept", desc: "Strong understanding of data-driven architecture. Used JSON to build scalable level management systems and save-state serialization." },
      { id: 'git', name: "Git & GitHub", level: "Adept", desc: "Proficient in version control, managing project repositories, branching strategies, and collaborative development workflows." }
    ]
  },
  {
    branch: "Engines & Art",
    icon: Box,
    skills: [
      { id: 'unreal', name: "Unreal Engine 5", level: "Expert", desc: "Deep knowledge of UE5 C++ and Blueprints. Experienced with Behavior Trees, Network Replication, and building custom Replay Systems." },
      { id: 'unity', name: "Unity", level: "Adept", desc: "Proficient in 2D/3D development, physics, custom editor scripting, and using ScriptableObjects for modular inventory databases." },
      { id: 'umg', name: "UMG / UI Toolkit", level: "Expert", desc: "Developed complex, dynamic UI. Highly skilled at binding data models directly to interface elements for real-time updates." },
      { id: 'blender', name: "Blender 3D", level: "Adept", desc: "Experience in 3D modeling, CGI, and VFX art creation for importing custom visual assets into game engines." }
    ]
  },
  {
    branch: "Gameplay Systems",
    icon: Wrench,
    skills: [
      { id: 'ai', name: "AI / Behavior", level: "Expert", desc: "Architected modular enemy AI using Unreal Behavior Trees, Blackboards, and perception-based agro states." },
      { id: 'network', name: "Network Replication", level: "Adept", desc: "Collaborated on multiplayer features in Unreal Engine, ensuring projectile logic and game states were correctly replicated across clients." },
      { id: 'fsm', name: "State Machines", level: "Expert", desc: "Designed responsive player and enemy controllers handling complex movement states, combat transitions, and i-frames." },
      { id: 'math', name: "3D Math", level: "Adept", desc: "Utilized vector math and trigonometry to build trajectory prediction systems and render real-time projectile paths." }
    ]
  }
];

export default function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState(skillData[0].skills[0]); // Default to first skill

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl md:text-2xl text-center text-gray-700 italic mb-6">
        "Select a node to inspect my current power levels."
      </h3>

      {/* SKILL TREE BRANCHES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 flex-1">
        {skillData.map((category, bIdx) => (
          <div key={bIdx} className="flex flex-col items-center">
            
            {/* Branch Header */}
            <div className="bg-wood-dark border-2 border-wood-light px-4 py-2 rounded-t-lg text-white font-medieval flex items-center gap-2 shadow-md w-full justify-center">
              <category.icon size={20} className="text-yellow-400" />
              {category.branch}
            </div>

            {/* Tree Nodes Background */}
            <div className="bg-wood border-x-4 border-b-4 border-wood-dark rounded-b-lg p-4 w-full flex flex-col gap-4 relative shadow-inner h-full">
              
              {/* Connecting Line (Visual) */}
              <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-wood-dark/50 z-0" />

              {/* Skill Nodes */}
              {category.skills.map((skill, sIdx) => {
                const isSelected = selectedSkill.id === skill.id;
                
                return (
                  <motion.button
                    key={sIdx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSkill(skill)}
                    className={`relative z-10 w-full py-3 px-2 rounded-xl border-4 font-bold text-sm lg:text-base transition-all shadow-lg whitespace-nowrap overflow-hidden text-ellipsis
                      ${isSelected 
                        ? 'bg-yellow-500 border-white text-black shadow-[0_0_15px_rgba(250,204,21,0.8)]' 
                        : 'bg-stone-700 border-stone-900 text-stone-200 hover:bg-stone-600'
                      }`}
                  >
                    {skill.name}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* SELECTED SKILL DETAILS (The Tooltip/Info Box) */}
      <motion.div 
        key={selectedSkill.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-parchment border-4 border-wood-dark p-6 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-6 mt-auto"
      >
        {/* Level Badge */}
        <div className="bg-wood-dark border-2 border-wood-light rounded-full w-24 h-24 flex items-center justify-center text-center shrink-0 shadow-lg">
          <span className="text-yellow-400 font-medieval font-bold text-lg leading-tight">
            {selectedSkill.level}
          </span>
        </div>

        {/* Skill Info */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-3xl font-medieval text-wood-dark font-bold border-b-2 border-gray-400 inline-block pb-1 mb-3">
            {selectedSkill.name}
          </h4>
          <p className="text-gray-800 text-lg leading-relaxed font-casual">
            {selectedSkill.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
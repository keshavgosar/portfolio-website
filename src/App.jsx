import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingScene from './components/LandingScene';
import MapScene from './components/MapScene';
import WoodenPanel from './components/WoodenPanel';
import BirdFlock from './components/BirdFlock';
// IMPORT THE NEW GRID COMPONENT INSTEAD OF SLIDER
import ProjectGrid from './components/ProjectGrid'; 
import ProjectDetail from './components/ProjectDetail';
import SkillTree from './components/SkillTree';
import QuestLog from './components/QuestLog';
import MessageBoard from './components/MessageBoard';

const myProjects = [
  {
    id: 1,
    title: "Nightfall Chronicles",
    mediaType: "video",
    // Make sure to add a short gameplay loop here!
    mediaUrl: "/assets/projectclips/nightfall-chronicles/NightfallMain (1).webm", 
    shortDescription: "A 2D pixel-art Action RPG focused on modular system design, player progression, and classic RPG mechanics.",
    mainSystems: ["Modular Skill System", "JSON Persistence", "State Machine Player"],
    longDescription: "Nightfall Chronicles is a 2D Metroidvania RPG built from the ground up in Unity. I focused heavily on modular architecture and data-driven design, allowing new skills, enemies, and items to be added with minimal code changes. It features a deep economy, branching skill paths, and a robust Auto-Save system using JSON serialization to track player state between sessions.",
    skills: ["C#", "Unity 2D", "JSON Serialization", "ScriptableObjects", "State Machines"],
    mechanics: [
      {
        title: "Movement & Combat",
        videoUrl: "/assets/projectclips/nightfall-chronicles/CombatMechanic.webm", // Add a short video showing dashing/attacking
        description: "A highly responsive player controller driven by a custom State Machine.",
        features: [
          "Seamless transitions between Wall Sliding, Dashing, and Jumping",
          "Combat and movement tightly integrated for fluid action",
          "Upgradeable dash enhancing distance and cooldowns"
        ]
      },
      {
        title: "RPG Progression",
        videoUrl: "/assets/projectclips/nightfall-chronicles/skilltree.webm", // Add a video showing the skill tree or stats
        description: "A layered stats system and a choice-based branching skill tree.",
        features: [
          "Granular stats divided into Major, Defense, Elemental, and Resources",
          "Unique unlockable mechanics like 'Time Echo' and 'Domain Expansion'",
          "Encourages replayability and diverse character builds"
        ]
      },
      {
        title: "Inventory & Economy",
        videoUrl: "/assets/projectclips/nightfall-chronicles/NPC Interaction.webm", // Add a video showing the merchant/inventory
        description: "A comprehensive item management and NPC interaction system.",
        features: [
          "Supports equipment, consumables, buffs, and crafting materials",
          "Merchant system for buying, selling, and quest progression",
          "Blacksmith system for item storage and crafting"
        ]
      }
    ],
    // Replace this with your actual YouTube gameplay trailer URL (use /embed/ format)
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    downloadUrl: "https://keshav567.itch.io/nightfall-chronicles"
  },
  {
    id: 2,
    title: "Verdant Souls",
    mediaType: "video", // Or use "image" with a .webp if you don't have a main video yet
    mediaUrl: "/assets/projectclips/verdant-souls/VerdantSoulMain (1).webm", 
    shortDescription: "A 3D combat-focused RPG prototype built in Unreal Engine 5 showcasing scalable C++ architecture.",
    mainSystems: ["Modular Enemy AI", "Melee Combat Logic", "Stamina Management"],
    longDescription: "Verdant Souls is a robust RPG prototype developed to strengthen my core C++ gameplay programming skills in Unreal Engine 5. The primary focus of this project was to build a clean, extendable framework for 3D combat. It features a fully modular enemy base class, state-driven AI behavior, and a comprehensive health/stamina action limitation system.",
    skills: ["Unreal Engine 5", "C++", "State-Driven AI", "Combat Systems", "System Architecture"],
    mechanics: [
      {
        title: "Melee Combat",
        videoUrl: "/assets/projectclips/verdant-souls/verdantsoulsdemo3 (1).webm", 
        description: "A responsive, hit-detection based combat system.",
        features: [
          "Stamina-based action limitation (attacking and dodging)",
          "Precise hit detection and damage calculation logic",
          "Modular equipment system allowing weapon swapping"
        ]
      },
      {
        title: "Enemy AI",
        videoUrl: "/assets/projectclips/verdant-souls/verdantsoulsdemo2 (1).webm", 
        description: "A scalable, state-driven AI system for multiple enemy types.",
        features: [
          "Patrolling, sight-based player detection, and chasing behavior",
          "Easily extendable C++ base class to add new archetypes with minimal code",
          "Includes logic for both standard grunts and complex boss fights"
        ]
      },
      {
        title: "Loot System",
        videoUrl: "/assets/projectclips/verdant-souls/destroyverdantsouls1 (1).webm", 
        description: "A dynamic enemy drop and item pickup mechanic.",
        features: [
          "Enemies drop specific loot types like Gold and Souls",
          "Clean inventory interactions for player pickups",
          "Designed for scalability to easily support new item variants"
        ]
      }
    ],
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video embed link
    downloadUrl: "https://github.com/keshavgosar/verdant-souls-ue5" // Linking to GitHub since it's a code prototype
  },
  {
    id: 3,
    title: "Dungeon Puzzle",
    mediaType: "video",
    mediaUrl: "/assets/projectclips/dungeon-puzzle/DungeonPuzzlemain.webm", 
    shortDescription: "A first-person puzzle game where observation and logic are tested through in-world riddles and clues.",
    mainSystems: ["Environmental Storytelling", "Input Sequences", "Auto-Reset Logic"],
    longDescription: "Dungeon-Puzzle is a short, atmospheric first-person puzzle room built in Unreal Engine 5.5 using C++ and Blueprints. The player must use environmental clues to deduce a correct interaction sequence. Choosing incorrectly instantly resets the room, requiring the player to learn from their mistakes and try again. The game heavily emphasizes interaction mechanics and game-state management.",
    skills: ["Unreal Engine 5.5", "C++", "Blueprints", "Game State Management"],
    mechanics: [
      {
        title: "Interaction & Logic",
        videoUrl: "/assets/projectclips/dungeon-puzzle/DungeonPuzzlemain.webm", 
        description: "A dynamic puzzle room requiring precise execution of clues.",
        features: [
          "Hint-based gameplay using hidden riddles and world text",
          "Sequence deduction requiring specific button activation",
          "Automatic level reset system upon incorrect input"
        ]
      }
    ],
    youtubeUrl: "",
    downloadUrl: "https://keshav567.itch.io/dungeon-puzzle"
  },
  {
    id: 4,
    title: "Toon Tanks",
    mediaType: "video", 
    mediaUrl: "/assets/projectclips/toon-tanks/ToonTanksMain.webm", 
    shortDescription: "A fast-paced arcade shooter featuring dynamic enemy turrets and explosive VFX.",
    mainSystems: ["Projectile Math", "Dynamic AI Tracking", "VFX Spawning"],
    longDescription: "Toon Tanks is an arcade shooter where strategy and reflexes decide your fate. Players take control of a fully mobile tank to face off against deadly enemy turrets that dynamically track movement. The game features responsive shooting mechanics, impactful explosion VFX upon hit detection, and a complete game loop with clear win/loss conditions.",
    skills: ["Unreal Engine", "C++", "3D Math", "VFX Integration", "Game Loops"],
    mechanics: [
      {
        title: "Dynamic Aiming",
        videoUrl: "/assets/projectclips/toon-tanks/ToonTanksMain.webm", 
        description: "Intelligent enemy turrets that lock onto the player's position.",
        features: [
          "Rotational math to calculate look-at angles towards the player",
          "Distance-based attack logic (only fires when in range)",
          "Responsive player shooting mechanics to strike back"
        ]
      },
      {
        title: "Combat & VFX",
        videoUrl: "/assets/projectclips/toon-tanks/ToonTanksCombat.webm", 
        description: "Satisfying visual feedback and damage calculation.",
        features: [
          "Impactful explosion VFX triggered on every projectile hit",
          "Health component tracking for both player and enemies",
          "UI feedback integrated into the win/lose conditions"
        ]
      }
    ],
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video embed link
    downloadUrl: "https://drive.google.com/drive/folders/1T2_76YtypkTyfzIWQCwH75y6p9lmyaFf?usp=sharing"
  },
  {
    id: 5,
    title: "Crypt Quest",
    mediaType: "video", 
    mediaUrl: "/assets/crypt-gameplay.webm", 
    shortDescription: "A 3D puzzle-adventure exploring a forgotten underground world with intricate environmental puzzles.",
    mainSystems: ["Environmental Puzzles", "Level Streaming", "Atmospheric Lighting"],
    longDescription: "Step into the shadows of an ancient crypt in Crypt Quest, a 3D puzzle-adventure built using Unreal Engine (C++ and Blueprints). The game focuses on immersive exploration and environmental storytelling. Players must use observation and logic to unlock mechanisms and progress deeper into the crypt. A heavy emphasis was placed on atmospheric lighting and optimized level transitions to maintain a seamless, immersive experience.",
    skills: ["Unreal Engine", "C++", "Blueprints", "Lighting & Rendering", "Level Design"],
    mechanics: [
      {
        title: "Environmental Puzzles",
        videoUrl: "/assets/crypt-puzzles.webm", 
        description: "Interactive elements that require logic and observation.",
        features: [
          "Physics and logic-based mechanisms built with C++ and Blueprints",
          "Hidden pathways that unlock based on correct puzzle sequences",
          "Reward systems tied to exploration and clever thinking"
        ]
      },
      {
        title: "Atmosphere & Progression",
        videoUrl: "/assets/crypt-atmosphere.webm", 
        description: "Seamless world exploration and optimized rendering.",
        features: [
          "Atmospheric lighting design to guide player focus and enhance immersion",
          "Seamless level transitions to maintain the underground illusion",
          "Optimized asset loading for smooth performance during exploration"
        ]
      }
    ],
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video link
    downloadUrl: "https://keshav567.itch.io/cryptraider" // Link to itch.io or GitHub
  },
  {
    id: 6,
    title: "Obstacle Assault",
    mediaType: "video", 
    mediaUrl: "/assets/obstacle-gameplay.webm", 
    shortDescription: "A thrilling 3D platformer where players navigate dynamic obstacle courses requiring precision and timing.",
    mainSystems: ["Character Controller", "Dynamic Hazards", "Platforming Logic"],
    longDescription: "Test your reflexes and precision in Obstacle Assault, a 3D platformer built in Unreal Engine 5. The game challenges players to navigate through intricate obstacle courses filled with moving platforms and hazards. The core focus during development was creating a highly responsive character controller and designing levels with an increasing difficulty curve that rewards patience, timing, and quick decision-making.",
    skills: ["Unreal Engine 5", "Blueprints", "C++", "Level Design", "Player Physics"],
    mechanics: [
      {
        title: "Precision Movement",
        videoUrl: "/assets/obstacle-movement.webm", 
        description: "A highly tuned character controller built specifically for platforming.",
        features: [
          "Smooth and responsive jump physics",
          "Clean control scheme allowing for quick mid-air adjustments",
          "Immediate reset loops to keep players engaged after failing a jump"
        ]
      },
      {
        title: "Dynamic Hazards",
        videoUrl: "/assets/obstacle-hazards.webm", 
        description: "Interactive world elements designed to test player timing.",
        features: [
          "Moving platforms utilizing interpolation and timeline math",
          "Punishing hazard zones that trigger immediate failure states",
          "Iterative level design that naturally ramps up in mechanical complexity"
        ]
      }
    ],
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video link
    downloadUrl: "#" // Link to itch.io or GitHub
  }
];

export default function App() {
  const [gameState, setGameState] = useState('landing'); 
  const [selectedProject, setSelectedProject] = useState(null); 

  const closePanel = () => {
    setGameState('map');
    setSelectedProject(null);
  };

  return (
    <div className="w-screen h-[100dvh] bg-black overflow-hidden font-casual select-none">
      <AnimatePresence mode="wait">
        {gameState === 'landing' && <LandingScene key="landing" onEnter={() => setGameState('map')} />}
        {gameState !== 'landing' && (
          <motion.div key="map" className="absolute inset-0">
            <MapScene onNavigate={setGameState} onBack={() => setGameState('landing')} />
            {/* The Easter Egg Birds */}
            <BirdFlock />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameState === 'projects' && (
          <WoodenPanel title={selectedProject ? "Quest Details" : "Dungeon Quests (Projects)"} onClose={closePanel}>
            
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <ProjectDetail 
                  key="detail" 
                  project={selectedProject} 
                  onBack={() => setSelectedProject(null)} 
                />
              ) : (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-3xl font-medieval text-center text-wood-dark border-b-2 border-wood-light pb-2 mb-6">
                    Completed Campaigns
                  </h3>
                  {/* USE THE NEW GRID HERE */}
                  <ProjectGrid 
                    projects={myProjects} 
                    onSelectProject={(proj) => setSelectedProject(proj)} 
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </WoodenPanel>
        )}

        {/* SKILLS PANEL (Training Ground) */}
        {gameState === 'skills' && (
          <WoodenPanel title="Training Ground (Skill Tree)" onClose={closePanel}>
            <SkillTree />
          </WoodenPanel>
        )}

         {/* The Castle: About Me */}
        {gameState === 'about' && (
          <WoodenPanel title="Character Lore" onClose={closePanel}>
            <div className="space-y-6">
              
              {/* Introduction */}
              <div>
                <h3 className="text-3xl font-bold text-wood-dark border-b-2 border-wood-light pb-2 mb-3 font-medieval">
                  Greetings, Traveler!
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  I am <strong className="text-red-800">Keshav Gosar</strong>, a passionate Game Programmer based in Indore, India. I specialize in forging immersive worlds and robust gameplay systems using <strong className="text-wood-dark">Unreal Engine 5</strong> and <strong className="text-wood-dark">Unity</strong>. I am currently honing my foundational tech magic by pursuing my B.Tech in Computer Science.
                </p>
              </div>

              {/* Experience Summary */}
              <div>
                <h4 className="text-xl font-bold text-wood-dark mb-2 font-medieval">The Journey So Far</h4>
                <p className="text-gray-800 leading-relaxed mb-3">
                  During my recent adventure as a Game Programmer Intern at EdTech Creation, I engineered complex systems in Unreal Engine—including frame-by-frame replay mechanics, 3D trajectory prediction, and multiplayer network replication. 
                </p>
                <p className="text-gray-800 leading-relaxed">
                  Whether I am writing scalable <strong className="text-blue-700">C++</strong> to build modular enemy AI, or using <strong className="text-blue-700">C#</strong> to architect branching RPG skill trees and JSON persistence systems, I thrive on tackling heavy technical logic and turning it into seamless player experiences.
                </p>
              </div>

              {/* Stats / Hobbies */}
              <div className="bg-white/50 p-4 rounded-lg border-2 border-wood-light shadow-inner mt-4">
                <h4 className="text-lg font-bold text-wood-dark mb-2 font-medieval">Attributes & Interests</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-800">
                  <li className="flex items-center gap-2"><span className="text-green-700">⚔️</span> <strong>Class:</strong> Gameplay & UI Engineer</li>
                  <li className="flex items-center gap-2"><span className="text-green-700">🛡️</span> <strong>Strength:</strong> C++, C#, Data-Driven Arch.</li>
                  <li className="flex items-center gap-2"><span className="text-green-700">⛰️</span> <strong>Passions:</strong> Mountain Trekking</li>
                  <li className="flex items-center gap-2"><span className="text-green-700">💪</span> <strong>Training:</strong> Weightlifting</li>
                </ul>
              </div>

            </div>
          </WoodenPanel>
        )}

         {/* The Tavern: Experience / Quest Log */}
        {gameState === 'experience' && (
          <WoodenPanel title="Quest Log (Experience)" onClose={closePanel}>
            <QuestLog />
          </WoodenPanel>
        )}

        {/* Message Board: Contact */}
        {gameState === 'contact' && (
          <WoodenPanel title="Message Board (Contact)" onClose={closePanel}>
            <MessageBoard />
          </WoodenPanel>
        )}
      </AnimatePresence>
    </div>
  );
}
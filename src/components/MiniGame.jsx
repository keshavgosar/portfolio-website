import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MiniGame() {
  const [score, setScore] = useState(0);
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });

  // Move the target to a random location
  const moveTarget = () => {
    const top = Math.floor(Math.random() * 80) + 10;
    const left = Math.floor(Math.random() * 80) + 10;
    setTargetPos({ top: `${top}%`, left: `${left}%` });
  };

  // Handle a successful hit
  const hitTarget = (e) => {
    e.stopPropagation(); // Prevent the "miss" click from firing
    setScore(s => s + 100);
    moveTarget();
  };

  // Move the target every 1.5 seconds automatically
  useEffect(() => {
    const interval = setInterval(moveTarget, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-medieval font-bold text-wood-dark">Target Practice</h3>
        <span className="bg-wood-dark text-white px-3 py-1 rounded border-2 border-wood-light font-medieval">
          Score: {score}
        </span>
      </div>
      
      {/* Game Board */}
      <div 
        className="h-64 bg-green-800 rounded-lg relative overflow-hidden border-4 border-wood-dark cursor-crosshair shadow-inner" 
        onClick={() => setScore(s => Math.max(0, s - 10))} // Penalize for missing
      >
        <motion.button 
          animate={targetPos}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={hitTarget}
          className="absolute w-12 h-12 bg-red-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </motion.button>
      </div>
      <p className="text-sm mt-2 text-gray-600 italic text-center">
        Prove your worth! Click the target to score points. Misses cost 10 points!
      </p>
    </div>
  );
}
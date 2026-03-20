import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// REMOVED: import { Bird } from 'lucide-react';

// Generates a quick, game-like "chirp" sound without needing an external audio file
const playChirp = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.error("Audio not supported");
  }
};

const getRandomPos = () => ({
  x: Math.random() * (window.innerWidth - 100) + 50,
  y: Math.random() * (window.innerHeight - 100) + 50
});

// Generates random flight paths for the birds
const generateWaypoints = (count) => {
  const pts = [];
  for (let i = 0; i < count; i++) pts.push(getRandomPos());
  return pts;
};

const SingleBird = ({ id, startX, startY, onMultiply, onRemove }) => {
  const [waypoints] = useState(() => generateWaypoints(6)); // Increased to 6 waypoints for more chaotic flying

  useEffect(() => {
    // Bird flies away (destroys itself) after 10 seconds
    const timer = setTimeout(() => {
      onRemove(id);
    }, 10000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const handleClick = (e) => {
    e.stopPropagation();
    playChirp();
    // Spawn 2 new birds near the mouse click to "multiply"
    onMultiply(e.clientX, e.clientY);
  };

  return (
    <motion.div
      role='button'
      onClick={handleClick}
      initial={{ x: startX, y: startY, opacity: 0, scale: 0 }}
      animate={{
        x: waypoints.map(p => p.x),
        y: waypoints.map(p => p.y),
        opacity: [0, 1, 1, 1, 1, 0], // Fades in at start, fades out at the very end
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 15, // Made the flight path longer so it's smoother
        ease: "linear",
        repeat: Infinity, // THIS IS THE FIX! It will never stop moving now.
        repeatType: "mirror" // Bounces back and forth through the waypoints
      }}
      className="absolute drop-shadow-lg cursor-pointer pointer-events-auto hover:brightness-125 hover:scale-110 transition-all z-40"
    >
      {/* Flapping/Hover animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src="/assets/Avatars_06.png" 
          alt="Flying Creature" 
          className="w-12 h-12 object-contain select-none"
          draggable="false"
        />
      </motion.div>
    </motion.div>
  );
};

export default function BirdFlock() {
  const [birds, setBirds] = useState([]);
  const [birdCounter, setBirdCounter] = useState(0);

  // If there are no birds, spawn one after a short delay
  useEffect(() => {
    if (birds.length === 0) {
      const spawnTimer = setTimeout(() => {
        setBirds([{ id: birdCounter, ...getRandomPos() }]);
        setBirdCounter(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(spawnTimer);
    }
  }, [birds.length, birdCounter]);

  const handleMultiply = (x, y) => {
    setBirds(prev => {
      // OPTIMIZATION: Cap the maximum number of birds on screen to 20
      // This guarantees the website will never lag, even if they click like crazy!
      if (prev.length >= 20) return prev; 
      
      return [
        ...prev,
        { id: birdCounter + 1, x: x + 30, y: y + 30 },
        { id: birdCounter + 2, x: x - 30, y: y - 30 }
      ];
    });
    setBirdCounter(prev => prev + 2);
  };

  const handleRemove = (idToRemove) => {
    setBirds(prev => prev.filter(b => b.id !== idToRemove));
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      <AnimatePresence>
        {birds.map(bird => (
          <SingleBird
            key={bird.id}
            id={bird.id}
            startX={bird.x}
            startY={bird.y}
            onMultiply={handleMultiply}
            onRemove={handleRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
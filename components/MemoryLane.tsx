
import React, { useEffect, useState, useRef } from 'react';
import { MEMORIES } from '../constants';
import { generateMemoryNarrative } from '../services/geminiService';
import GeneratedImage from './GeneratedImage';

interface SceneProps {
  isActive: boolean;
}

const MemoryLane: React.FC<SceneProps> = ({ isActive }) => {
  const [narrative, setNarrative] = useState("");
  const hoverAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  
  // Refs for interaction and animation
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
        generateMemoryNarrative().then(setNarrative);
        
        // Start animation loop
        requestRef.current = requestAnimationFrame(animate);

    } else {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive]);

  // The main animation loop
  const animate = () => {
    if (!isActive) return;

    // Only auto-scroll if user is NOT dragging
    if (!isDraggingRef.current) {
       // Speed: 1.5 pixels per frame (approx 90px/sec)
       positionRef.current -= 1.5; 
    }

    // Apply the transform
    if (scrollContainerRef.current) {
        scrollContainerRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  // Mouse Down: Start dragging on Right Click
  const handleMouseDown = (e: React.MouseEvent) => {
    // Button 2 is Right Click
    if (e.button === 2) {
        e.preventDefault();
        isDraggingRef.current = true;
        lastMouseXRef.current = e.clientX;
    }
  };

  // Global mouse listeners to handle dragging outside the element
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (isDraggingRef.current) {
            const delta = e.clientX - lastMouseXRef.current;
            positionRef.current += delta;
            lastMouseXRef.current = e.clientX;
            
            // Boundary check: prevent scrolling into empty space on the left
            if (positionRef.current > 0) positionRef.current = 0;
        }
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Prevent context menu on the container so right-click works for drag
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const playHoverSound = () => {
    if (hoverAudioRef.current) {
        hoverAudioRef.current.currentTime = 0;
        hoverAudioRef.current.volume = 0.3;
        hoverAudioRef.current.play().catch(() => {});
    }
  };

  const playClickSound = () => {
    if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.volume = 0.6;
        clickAudioRef.current.play().catch(() => {});
    }
  };

  return (
    <section 
      className="absolute inset-0 bg-[#0F172A] overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
    >
      
      <audio ref={hoverAudioRef} src="https://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3" preload="auto" />
      <audio ref={clickAudioRef} src="https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3" preload="auto" />

      {/* Moving Stars Background */}
      <div className="absolute inset-0 z-0 opacity-50 animate-pan bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Dynamic Red String SVG Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-visible">
         <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <path 
                d="M-100,650 Q400,750 800,550 T1600,650 T2400,500 T3200,650" 
                stroke="#EF4444" 
                strokeWidth="3" 
                fill="none" 
                strokeDasharray="10,5"
                filter="url(#neon-glow)"
                className="animate-pulse opacity-80"
            />
         </svg>
      </div>

      {/* Header Section */}
      <div className="absolute top-0 left-0 w-full z-30 pt-8 px-4 flex flex-col items-center pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-serif text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] mb-20 text-center mt-4">
            The Red String
          </h2>
          
          <div className="relative bg-black/60 backdrop-blur-md border border-pink-500/30 p-4 md:p-6 rounded-2xl max-w-2xl shadow-xl transform transition-all mt-10">
             <p className="text-base md:text-lg text-pink-200 font-script glow-text leading-relaxed text-center">
                {narrative || "Across time and space, an unbreakable red string of fate pulls Baba and her partner towards the love they were always destined to share."}
             </p>
          </div>
      </div>

      {/* Scrolling Gallery */}
      <div 
        ref={scrollContainerRef}
        className="absolute top-0 left-0 h-full items-center pl-[20vw]"
        style={{ 
            display: 'flex',
            gap: '15rem',
            paddingTop: '300px',
            willChange: 'transform',
        }}
      >
        {MEMORIES.map((memory, index) => (
          <div 
              key={memory.id} 
              className="relative flex-shrink-0 w-80 md:w-96 polaroid-frame transform transition-all duration-500 hover:z-50 bg-white cursor-pointer"
              style={{ 
                  transform: `rotate(${memory.rotation}deg) translateY(${index % 2 === 0 ? '-30px' : '30px'})`,
              }}
              onMouseEnter={playHoverSound}
              onClick={(e) => {
                  e.stopPropagation(); // Prevent interfering with drag
                  playClickSound();
              }}
          >
             <div className="w-full h-72 md:h-80 bg-gray-100 overflow-hidden shadow-inner mb-4 relative">
                <GeneratedImage 
                    src={memory.url} 
                    alt={memory.caption}
                    fit="cover" 
                    context={`A magical 3D Pixar-style memory: "${memory.caption}". Soft cinematic lighting. A glowing, mythical red string of fate is gently weaving through the scene, symbolizing an eternal connection. High quality 3D render.`}
                    className="w-full h-full"
                />
             </div>
            
            <div className="text-center px-2 pb-2">
                <p className="font-script text-2xl md:text-3xl text-gray-800 leading-tight">{memory.caption}</p>
            </div>

            {/* Decorative Knots */}
            <div className="absolute top-[45%] -left-3 w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_red] z-20"></div>
            <div className="absolute top-[45%] -right-3 w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_red] z-20"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemoryLane;

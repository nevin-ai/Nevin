
import React, { useState, useEffect, useRef } from 'react';
import ChocolateGate from './components/ChocolateGate';
import MatriarchyParty from './components/MatriarchyParty';
import MemoryLane from './components/MemoryLane';
import ApologySection from './components/ApologySection';
import FinaleSection from './components/FinaleSection';
import { useImageSize, ImageSize } from './contexts/ImageSizeContext';
import { SCENE_SOUNDS, IMAGES } from './constants';

// Scene Configuration - Adjusted timings for better flow
const SCENES = [
  { id: 0, component: ChocolateGate, duration: 12000 }, // Intro
  { id: 1, component: MatriarchyParty, duration: 12000 }, // Party (Cats)
  { id: 2, component: MemoryLane, duration: 169000 }, // Memories (Increased to 125s to ensure full scroll)
  { id: 3, component: ApologySection, duration: 30000 }, // Apology & Garden Merged
  { id: 4, component: FinaleSection, duration: 0 }, // Finale (Stays)
];

const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { size, setSize } = useImageSize();

  useEffect(() => {
    if (!isPlaying && currentSceneIndex === 0) return; // Wait for start

    const currentScene = SCENES[currentSceneIndex];
    if (currentScene.duration > 0) {
      const timer = setTimeout(() => {
        setCurrentSceneIndex((prev) => Math.min(prev + 1, SCENES.length - 1));
      }, currentScene.duration);
      return () => clearTimeout(timer);
    }
  }, [currentSceneIndex, isPlaying]);

  const startVideo = () => {
    setIsPlaying(true);
    if (audioRef.current) {
        // Set volume higher so it can be heard clearly
        audioRef.current.volume = 0.6;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                if (error.name !== 'AbortError') {
                    console.log("Background audio play prevented:", error);
                }
            });
        }
    }
  };

  const handleAudioToggle = (muteBackground: boolean) => {
      if (audioRef.current) {
          // Fade out/in could be added here for smoother transition
          audioRef.current.volume = muteBackground ? 0 : 0.6;
      }
  };

  const handleNavigation = (e: React.MouseEvent) => {
      if (!isPlaying) return;

      // Prevent navigation if clicking interactive elements (like buttons or selects)
      if ((e.target as HTMLElement).closest('button, select')) return;

      const width = window.innerWidth;
      const clickX = e.clientX;

      if (clickX > width / 2) {
          // Go Forward
          setCurrentSceneIndex((prev) => Math.min(prev + 1, SCENES.length - 1));
      } else {
          // Go Backward
          setCurrentSceneIndex((prev) => Math.max(prev - 1, 0));
      }
  };

  return (
    <div 
        className="h-screen w-screen overflow-hidden bg-black relative font-sans text-white cursor-tulip"
        onClick={handleNavigation}
    >
      
      {/* Image Quality Selector Affordance */}
      <div className="absolute top-4 right-4 z-[100]">
         <select 
            value={size} 
            onChange={(e) => setSize(e.target.value as ImageSize)} 
            className="bg-black/40 text-pink-200 border border-pink-500/30 rounded-lg px-2 py-1 text-xs backdrop-blur-md focus:outline-none hover:bg-black/60 transition-colors"
         >
            <option value="1K">Quality: 1K</option>
            <option value="2K">Quality: 2K</option>
            <option value="4K">Quality: 4K</option>
         </select>
      </div>

      {/* Soundtrack (Global Main Audio) */}
      <audio ref={audioRef} loop crossOrigin="anonymous" preload="auto">
        <source src={SCENE_SOUNDS.mainAppSoundtrack} type="audio/mpeg" />
      </audio>

      {/* PRELOADER: Hidden images to ensure assets are ready for subsequent scenes */}
      <div className="hidden">
        {Object.values(IMAGES).map((src, idx) => (
           <img key={idx} src={src} alt="preload" />
        ))}
      </div>

      {/* Start Overlay - Theme matched to Finale (Pink/Purple Gradient) */}
      {!isPlaying && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-b from-[#2E1065] to-[#4C1D95] transition-opacity duration-1000">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pan"></div>
          
          <div className="relative z-10 text-center p-8 backdrop-blur-sm bg-black/10 rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-4">
            <h1 className="text-6xl md:text-8xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-8 animate-float drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Baba's Journey
            </h1>
            <button 
              onClick={(e) => { e.stopPropagation(); startVideo(); }}
              className="group relative px-12 py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-serif text-xl md:text-2xl rounded-full shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:scale-105 transition-transform overflow-hidden border border-pink-400/50"
            >
              <span className="relative z-10 tracking-widest flex items-center gap-2">
                 <span>▶</span> BEGIN JOURNEY
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
            <p className="mt-8 text-pink-200/70 font-light tracking-[0.3em] text-xs uppercase">Turn on your sound for the full experience</p>
          </div>
        </div>
      )}

      {/* Scene Stack with Cinematic Transitions */}
      <div className="w-full h-full relative perspective-container">
        {SCENES.map((scene, index) => {
           const Component = scene.component;
           const isCurrent = index === currentSceneIndex;
           const isPast = index < currentSceneIndex;
           
           // Optimization: Don't render too far ahead or behind
           if (index < currentSceneIndex - 1) return null;
           if (index > currentSceneIndex + 1) return null;

           let transitionStyle = '';
           
           if (isCurrent) {
               // Active Scene: Visible, Scale 1
               transitionStyle = 'opacity-100 scale-100 blur-0 z-20';
           } else if (isPast) {
               // Past Scene: Fade out, Scale Up (moves towards camera), Blur (depth of field)
               transitionStyle = 'opacity-0 scale-110 blur-md z-10 pointer-events-none';
           } else {
               // Future Scene: Invisible, Scale Down (waiting in background)
               transitionStyle = 'opacity-0 scale-95 blur-sm z-0';
           }

           return (
             <div 
                key={scene.id}
                className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] cubic-bezier(0.22, 1, 0.36, 1) ${transitionStyle}`}
             >
                {/* We pass onToggleAudio only to FinaleSection (index 4 now) */}
                <Component 
                    isActive={isPlaying && (isCurrent || isPast)} 
                    {...(index === 4 ? { onToggleAudio: handleAudioToggle } : {})}
                />
             </div>
           );
        })}
      </div>

      {/* Navigation Hints */}
      {isPlaying && currentSceneIndex < SCENES.length - 1 && (
         <div className="absolute bottom-10 w-full flex justify-between px-10 pointer-events-none opacity-30 text-white text-sm">
            <span>← Prev</span>
            <span>Next →</span>
         </div>
      )}

      {/* Cinematic Progress Bar */}
      {isPlaying && currentSceneIndex < SCENES.length - 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-900 z-50">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(236,72,153,0.8)] transition-all duration-1000 ease-linear"
            style={{ width: `${((currentSceneIndex + 1) / SCENES.length) * 100}%` }}
          ></div>
        </div>
      )}
      
      {/* Global Grain Overlay for Film Look */}
      <div className="pointer-events-none absolute inset-0 z-[100] opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")' }}></div>
    </div>
  );
};

export default App;

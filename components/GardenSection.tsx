
import React from 'react';
import { IMAGES } from '../constants';
import GeneratedImage from './GeneratedImage';

interface SceneProps {
  isActive: boolean;
}

const GardenSection: React.FC<SceneProps> = ({ isActive }) => {
  return (
    <section className="absolute inset-0 overflow-hidden bg-black">
        
        {/* Full Screen Background - Bright Tulips */}
        <div className="absolute inset-0 z-0">
             <GeneratedImage 
                src={IMAGES.whiteKurtiCat} 
                alt="Field of Bright Tulips"
                fit="cover"
                context="A spectacular, vast field of bright, glowing pink, purple, and yellow tulips stretching to the horizon. Cinematic lighting, magical atmosphere, fireflies, 3d pixar animated movie style, vibrant colors."
                className={`w-full h-full transition-transform duration-[20000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}
             />
             {/* Gradient Overlay for Text Readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-80"></div>
        </div>

        {/* Fireflies Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(30)].map((_, i) => (
                <div key={i} className="absolute w-1 h-1 md:w-2 md:h-2 bg-yellow-300 rounded-full animate-float opacity-80 shadow-[0_0_10px_yellow]" style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${3 + Math.random() * 5}s`,
                    animationDelay: `${Math.random() * 2}s`
                }}></div>
            ))}
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 p-6">
            
            {/* Card 1: Garden of Healing */}
            <div className={`backdrop-blur-md bg-black/30 p-8 md:p-10 rounded-[2rem] border border-pink-400/40 shadow-[0_0_50px_rgba(236,72,153,0.3)] max-w-md text-center transform transition-all duration-[1500ms] ease-out ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                 <h2 className="text-5xl font-script text-pink-300 mb-6 drop-shadow-lg">Garden of Healing</h2>
                 <div className="h-1 w-16 bg-pink-500 mx-auto mb-6 rounded-full"></div>
                 <p className="text-2xl text-white font-serif italic leading-relaxed">"I'll never leave you, Baba."</p>
            </div>

            {/* Card 2: Promise */}
            <div className={`backdrop-blur-md bg-black/30 p-8 md:p-10 rounded-[2rem] border border-purple-400/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] max-w-md text-center transform transition-all duration-[1500ms] ease-out delay-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                 <h2 className="text-4xl font-serif text-purple-200 mb-6 drop-shadow-lg">The Promise</h2>
                 <p className="text-xl text-pink-100 mb-6 font-light leading-relaxed">
                    Like the vast mountains of Meghalaya, our love stands tall.
                 </p>
                 <span className="text-yellow-400 font-bold text-4xl tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(250,204,21,0.6)] font-serif">Forever.</span>
            </div>

        </div>
    </section>
  );
};

export default GardenSection;

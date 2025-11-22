
import React from 'react';
import { IMAGES } from '../constants';
import GeneratedImage from './GeneratedImage';

interface SceneProps {
  isActive: boolean;
}

const ApologySection: React.FC<SceneProps> = ({ isActive }) => {
  // We use the direct message provided instead of generating one to ensure accuracy to the request
  const message = "Morning, Baba! So sorry about falling asleep on you yesterday, my brain just completely checked out without warning. I know I missed our usual aftercare time, and I really didn't mean to. But don't you worry for a second, I'm absolutely going to make it up to you on the attention front – prepare for a full-on Baba-centric experience later, you won't know what hit you (in the best way!). Life sometimes throws curveballs, and it’s a constant balancing act between everyone and everything – our awesome friends, and especially you. But that's just part of keeping a healthy flow, with all its lovely ups and downs. I love you.";
  
  return (
    <section className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden z-40">
      
       {/* Merged Visuals: Full Screen Background */}
        <div className="absolute inset-0 z-0">
             <GeneratedImage 
                src={IMAGES.apologyBackground} 
                alt="Field of Bright Tulips"
                fit="cover"
                context="A spectacular, vast field of bright, glowing pink, purple, and yellow tulips stretching to the horizon. Cinematic lighting, magical atmosphere, fireflies, 3d pixar animated movie style, vibrant colors."
                className={`w-full h-full transition-transform duration-[20000ms] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}
             />
             {/* Lighter Overlay for Text Readability */}
             <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
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

      <div className={`relative z-20 max-w-4xl w-full p-6 md:p-12 transform transition-all duration-[2000ms] ${isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
        
        {/* Glass Container - Brighter Theme */}
        <div className="backdrop-blur-md bg-white/20 rounded-[2rem] border border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.2)] p-8 md:p-16 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
            
            <h2 className="text-5xl md:text-7xl font-serif mb-8 text-purple-900 text-center drop-shadow-md tracking-tight mt-4">
                My Promise
            </h2>
            
            {/* Content Box */}
            <div className="mb-8 text-lg md:text-2xl font-medium leading-relaxed font-serif text-slate-900 text-center max-w-3xl bg-white/40 p-6 rounded-xl shadow-inner">
                {message}
            </div>

            <div className="w-32 h-1 bg-purple-600/50 mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default ApologySection;

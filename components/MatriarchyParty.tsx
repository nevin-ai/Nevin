
import React from 'react';
import { CATS, IMAGES } from '../constants';
import GeneratedImage from './GeneratedImage';

interface SceneProps {
  isActive: boolean;
}

const MatriarchyParty: React.FC<SceneProps> = ({ isActive }) => {
  return (
    <section className="absolute inset-0 bg-gradient-to-b from-pink-100 to-purple-200 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 animate-pan" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/confetti.png")' }}></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute bg-pink-400 rounded-full opacity-50 animate-float" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 15 + 5}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + Math.random() * 4}s`
            }} />
        ))}
      </div>

      {/* Header Text */}
      <div className="relative z-10 text-center mb-6 md:mb-10 transform transition-all duration-1000 delay-300" style={{ transform: isActive ? 'translateY(0)' : 'translateY(-50px)', opacity: isActive ? 1 : 0 }}>
        <h2 className="text-5xl md:text-7xl font-serif text-purple-900 mb-2 drop-shadow-[0_2px_0_#fff] tracking-wider">The Matriarchy</h2>
        <p className="text-2xl text-purple-700 font-script">Big Baby & Little Baby's Kingdom</p>
      </div>

      {/* Cats Grid */}
      <div className="flex w-full max-w-7xl justify-center items-center gap-8 md:gap-12 flex-wrap z-20 px-4 pb-10">
         {CATS.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center transform hover:-translate-y-3 transition-transform duration-300 group">
                {/* Image Container - Significantly Increased Sizes */}
                <div className="w-36 h-36 md:w-52 md:h-52 rounded-full border-4 border-white shadow-[0_8px_20px_rgba(236,72,153,0.4)] overflow-hidden bg-pink-50 relative z-10">
                   <GeneratedImage 
                      src={cat.image || IMAGES.diego} 
                      alt={cat.name}
                      fit="cover"
                      context={`A very cute, fluffy 3d animated movie style cat named ${cat.name}, soft studio lighting, bright eyes, disney pixar style`}
                      className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                   />
                </div>
                
                {/* Name Tag - Styled Thematically */}
                <div className="mt-4 z-20 relative">
                    <div className="bg-white/90 backdrop-blur-sm text-purple-900 px-6 py-1.5 rounded-lg shadow-lg border-b-4 border-pink-400 transform group-hover:scale-105 transition-transform">
                        <span className="font-bold font-serif text-xl tracking-wide">{cat.name}</span>
                    </div>
                </div>
            </div>
         ))}
      </div>
    </section>
  );
};

export default MatriarchyParty;

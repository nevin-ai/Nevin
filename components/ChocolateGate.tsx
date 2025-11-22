
import React, { useEffect, useState } from 'react';

interface SceneProps {
  isActive: boolean;
  onNext?: () => void;
}

const ChocolateGate: React.FC<SceneProps> = ({ isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-purple-950">
      
      {/* Left Door - Pink/Purple Theme - Slightly brighter for Cherry Blossom vibe */}
      <div 
        className={`absolute left-0 top-0 h-full w-1/2 bg-gradient-to-br from-pink-500 to-purple-900 border-r border-pink-400/30 shadow-[10px_0_30px_rgba(0,0,0,0.8)] transition-transform duration-[3000ms] cubic-bezier(0.4, 0, 0.2, 1) z-20 flex flex-col items-center justify-center ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
      >
        {/* Accent Panel */}
        <div className="absolute left-10 top-10 bottom-10 right-4 border border-pink-200/20 rounded-lg"></div>
        
        <div className="p-12 border-4 border-pink-300 rounded-full bg-purple-900/50 text-pink-200 shadow-[0_0_30px_rgba(236,72,153,0.3)] transform hover:scale-105 transition-transform relative z-10 backdrop-blur-md">
          <span className="text-7xl font-serif font-bold drop-shadow-md">B</span>
        </div>
        <div className="mt-8 text-pink-100 font-serif text-3xl tracking-[0.3em] uppercase drop-shadow-lg">Baba</div>
      </div>

      {/* Right Door - Pink/Purple Theme */}
      <div 
        className={`absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-pink-500 to-purple-900 border-l border-pink-400/30 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] transition-transform duration-[3000ms] cubic-bezier(0.4, 0, 0.2, 1) z-20 flex flex-col items-center justify-center ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
      >
         {/* Accent Panel */}
         <div className="absolute right-10 top-10 bottom-10 left-4 border border-pink-200/20 rounded-lg"></div>

         <div className="p-12 border-4 border-pink-300 rounded-full bg-purple-900/50 text-pink-200 shadow-[0_0_30px_rgba(236,72,153,0.3)] transform hover:scale-105 transition-transform relative z-10 backdrop-blur-md">
          <span className="text-7xl font-serif font-bold drop-shadow-md">M</span>
        </div>
        <div className="mt-8 text-pink-100 font-serif text-3xl tracking-[0.3em] uppercase drop-shadow-lg">Me</div>
      </div>

      {/* Inner Content revealed */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black transition-all duration-[2000ms] delay-500 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
         
         {/* Deep space background for depth */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/60 via-black to-black z-0"></div>

         {/* Fireworks Background Layer */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
             <div className="firework" style={{ left: '20%', top: '20%', animationDelay: '0.2s' }}></div>
             <div className="firework" style={{ left: '80%', top: '15%', animationDelay: '1.5s' }}></div>
             <div className="firework" style={{ left: '50%', top: '30%', animationDelay: '2.8s' }}></div>
             <div className="firework" style={{ left: '15%', top: '60%', animationDelay: '0.8s' }}></div>
             <div className="firework" style={{ left: '85%', top: '50%', animationDelay: '2.2s' }}></div>
         </div>

         {/* Cherry Blossom Particles Layer */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(30)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-pink-300/80 rounded-full blur-[0.5px]"
                    style={{
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}%`,
                        animation: `fall ${Math.random() * 10 + 12}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                ></div>
            ))}
         </div>

         <div className="animate-float text-center relative z-10 p-8">
            <h1 className="text-6xl md:text-9xl font-script text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-200 to-purple-300 mb-6 drop-shadow-[0_0_35px_rgba(236,72,153,0.8)] filter brightness-125">Hi Babyy</h1>
            <p className="text-2xl font-serif text-pink-100 tracking-[0.3em] drop-shadow-md">A JOURNEY FOR YOU</p>
         </div>
      </div>

      <style>{`
        @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        @keyframes explode {
            0% { transform: scale(0.1); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
        }

        .firework {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            box-shadow: 
                0 -40px 10px #ec4899, 
                35px -20px 10px #a855f7, 
                35px 20px 10px #fbbf24, 
                0 40px 10px #ec4899, 
                -35px 20px 10px #a855f7, 
                -35px -20px 10px #fbbf24;
            animation: explode 3s ease-out infinite;
            opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ChocolateGate;


import React, { useState, useRef, useEffect } from 'react';
import { SONGS, IMAGES } from '../constants';
import GeneratedImage from './GeneratedImage';

interface SceneProps {
  isActive: boolean;
  onNext?: () => void;
  onToggleAudio?: (playing: boolean) => void;
}

const FinaleSection: React.FC<SceneProps> = ({ isActive, onToggleAudio }) => {
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSong = async (url: string) => {
    if (audioRef.current) {
        setError(null);
        // If clicking the same song, pause it (toggle off)
        if (currentSong === url) {
            stopSong();
            return;
        }

        setCurrentSong(url);
        if (onToggleAudio) onToggleAudio(true);
        
        try {
            audioRef.current.src = url;
            audioRef.current.load(); // Force reload of the audio element
            await audioRef.current.play();
            // Reset consecutive errors on successful play start
            setConsecutiveErrors(0);
        } catch (err) {
            // Catch initial play errors (like AbortError if skipped quickly)
            if ((err as Error).name !== 'AbortError') {
                console.error("Song playback start failed", err);
                // Trigger error handling logic manually if play promise rejects
                handleAudioError();
            }
        }
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        setCurrentSong(null);
        if (onToggleAudio) onToggleAudio(false);
    }
  };

  const playNext = () => {
      // Find current index, default to -1 if not found
      const currentIndex = currentSong ? SONGS.findIndex(s => s.audioUrl === currentSong) : -1;
      // Calculate next index, wrapping around
      const nextIndex = (currentIndex + 1) % SONGS.length;
      playSong(SONGS[nextIndex].audioUrl);
  };

  // Handle when audio source completely fails (404, decode error)
  const handleAudioError = () => {
      console.error("Audio source failed to load.");
      
      // Prevent infinite loops if all songs are broken (e.g. network down)
      if (consecutiveErrors >= SONGS.length) {
          setError("Soundtrack unavailable. Please check connection.");
          stopSong();
          return;
      }

      setConsecutiveErrors(prev => prev + 1);
      setError(`Track unavailable. Skipping to next song...`);
      
      // Attempt to skip to next song after a short delay
      setTimeout(() => {
          if (isActive) {
              playNext();
          }
      }, 1500);
  };

  // Ensure audio stops if scene becomes inactive
  useEffect(() => {
    if (!isActive) {
        stopSong();
    }
  }, [isActive]);

  return (
    <section className="absolute inset-0 bg-gradient-to-b from-[#2E1065] to-[#4C1D95] overflow-y-auto overflow-x-hidden">
        
        <audio 
            ref={audioRef} 
            onEnded={playNext} 
            onError={handleAudioError}
            preload="auto"
        />

        {/* Cherry Blossom Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
            {[...Array(30)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-pink-300 rounded-full opacity-60 animate-float"
                    style={{
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}%`,
                        animation: `fall ${Math.random() * 10 + 10}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                ></div>
            ))}
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center text-center min-h-screen">
            
            <div className={`transition-all duration-[1500ms] ease-out transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <h2 className="text-6xl md:text-9xl font-script text-pink-300 mb-2 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">Cherry Blossom Festival</h2>
                <div className="flex items-center justify-center gap-4 text-xl text-pink-200 mb-12 tracking-[0.2em] uppercase font-light">
                    <span>Shillong</span>
                    <span>•</span>
                    <span className="font-bold text-white">Baba</span>
                    <span>•</span>
                    <span>Forever</span>
                </div>

                {/* Animated Progress/Decoration Bar */}
                <div className="w-full max-w-3xl mx-auto h-4 bg-white/10 rounded-full mb-16 overflow-hidden border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.5)] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-pan w-[200%]"></div>
                </div>

                {/* Main Cinematic Visual */}
                <div className="relative w-full max-w-2xl mx-auto mb-16 group perspective-container">
                    <div className="card-3d relative rounded-[2rem] p-2 bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl transform transition-transform group-hover:scale-105">
                         <div className="relative rounded-[1.8rem] overflow-hidden h-96 md:h-[28rem] bg-black">
                             <GeneratedImage 
                                src={IMAGES.finaleBackground} 
                                alt="Us at Festival" 
                                fit="cover"
                                context="A romantic couple (me and sharon) at a night music festival, fireworks, cherry blossoms, Studio Ghibli anime art style, hand-painted background, hayao miyazaki style, love in the air"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                imgClassName="scale-110 object-center"
                             />
                         </div>
                    </div>
                </div>

                {/* Interactive Soundtrack Player */}
                <div className="bg-white/5 backdrop-blur-xl max-w-2xl mx-auto rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.3)] p-8 border border-white/10">
                    <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center gap-3">
                        <span className="text-pink-400">🎵</span> Our Soundtrack
                    </h3>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm animate-pulse shadow-inner">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-3">
                        {SONGS.map((song, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => playSong(song.audioUrl)}
                                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] ${currentSong === song.audioUrl ? 'bg-pink-600/40 border-pink-500' : 'hover:bg-white/10 border-transparent'} border`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all ${currentSong === song.audioUrl ? 'bg-pink-500 scale-110' : 'bg-purple-700 group-hover:bg-pink-600'}`}>
                                        {currentSong === song.audioUrl ? '❚❚' : '▶'}
                                    </div>
                                    <div className="text-left">
                                        <p className={`font-bold text-lg transition-colors ${currentSong === song.audioUrl ? 'text-pink-300' : 'text-white'}`}>{song.title}</p>
                                        <p className="text-xs text-gray-400">{song.artist}</p>
                                    </div>
                                </div>
                                {currentSong === song.audioUrl && (
                                    <div className="flex gap-1 h-4 items-end">
                                        <div className="w-1 bg-pink-400 animate-[bounce_1s_infinite]"></div>
                                        <div className="w-1 bg-pink-400 animate-[bounce_1.2s_infinite]"></div>
                                        <div className="w-1 bg-pink-400 animate-[bounce_0.8s_infinite]"></div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-20 pb-20">
                    <h1 className="text-7xl font-serif text-white mb-4 drop-shadow-2xl">Happy One Month</h1>
                    <p className="text-3xl text-pink-300 font-script animate-pulse">To infinity and beyond.</p>
                </div>
            </div>
        </div>

        <style>{`
            @keyframes fall {
                0% { transform: translateY(-10%) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
            }
        `}</style>
    </section>
  );
};

export default FinaleSection;

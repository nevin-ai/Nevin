
import React, { useState, useEffect } from 'react';

interface GeneratedImageProps {
  src: string;
  alt: string;
  context?: string; // Kept for interface compatibility, unused
  className?: string;
  style?: React.CSSProperties;
  fit?: 'cover' | 'contain';
  imgClassName?: string;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ src, alt, className, style, fit = 'cover', imgClassName }) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [retryCount, setRetryCount] = useState(0);

  // If the source prop changes, reset state
  useEffect(() => {
    setImgSrc(src);
    setRetryCount(0);
  }, [src]);

  // Retry mechanism: When retryCount changes (and is > 0), update the src to force reload
  useEffect(() => {
    if (retryCount > 0) {
        const timeout = setTimeout(() => {
            // Append a timestamp query parameter to bypass browser cache and force a re-fetch
            const separator = src.includes('?') ? '&' : '?';
            setImgSrc(`${src}${separator}retry=${Date.now()}`);
        }, 2000); // Wait 2 seconds before retrying
        
        return () => clearTimeout(timeout);
    }
  }, [retryCount, src]);

  const handleError = () => {
      console.log(`Image failed to load: ${alt}. Retrying... (${retryCount + 1})`);
      // Increment retry count to trigger the effect
      setRetryCount(prev => prev + 1);
  };

  return (
    <div className={`relative overflow-hidden bg-gray-900 ${className}`} style={style}>
      {/* 
          Blurred Background Layer: 
          Provides the aesthetic fill. Uses original src to attempt filling color even if main fails momentarily.
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-125 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${imgSrc})` }}
      ></div>

      {/* 
          Main Image Layer:
          Standard Image tag.
          - Zoom default: scale-125 (cinematic)
          - Position default: object-[center_20%] (faces)
          - Overrides: imgClassName prop allows specific scene tweaks (like the finale)
      */}
      <img 
        src={imgSrc} 
        alt={alt} 
        onError={handleError}
        className={`relative w-full h-full transition-all duration-[2s] ease-in-out z-10 
          ${fit === 'contain' ? 'object-contain' : 'object-cover'} 
          ${imgClassName || 'scale-125 object-[center_20%]'}`} 
        loading="eager"
        fetchPriority="high"
      />

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")' }}></div>
    </div>
  );
};

export default GeneratedImage;

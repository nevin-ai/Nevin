import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ImageSize = '1K' | '2K' | '4K';

interface ImageSizeContextType {
  size: ImageSize;
  setSize: (size: ImageSize) => void;
}

const ImageSizeContext = createContext<ImageSizeContextType | undefined>(undefined);

export const ImageSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [size, setSize] = useState<ImageSize>('1K');

  return (
    <ImageSizeContext.Provider value={{ size, setSize }}>
      {children}
    </ImageSizeContext.Provider>
  );
};

export const useImageSize = () => {
  const context = useContext(ImageSizeContext);
  if (!context) {
    throw new Error('useImageSize must be used within an ImageSizeProvider');
  }
  return context;
};


import { Cat, Memory, Song } from './types';

export const IMAGES = {
  // Memories - User provided URLs
  childhoodYellow: "https://i.ibb.co/GBWMftp/Gemini-Generated-Image-s3075qs3075qs307.png", 
  whiteKurtiCat: "https://i.ibb.co/xKQ3pRrX/Gemini-Generated-Image-ktbwkgktbwkgktbw.png", 
  whiteKurti: "https://i.ibb.co/tpTSHDYq/Whats-App-Image-2025-11-22-at-18-51-11.jpg".replace(/ /g, '%20'), 
  closeSelfie: "https://i.ibb.co/8DJpghgs/Gemini-Generated-Image-t38rbht38rbht38r.png", 
  coupleRedHair: "https://i.ibb.co/sJRmtJ45/Gemini-Generated-Image-yk1lrwyk1lrwyk1l.png", 
  walkingBack: "https://i.ibb.co/5Xy3KRYC/Gemini-Generated-Image-ndcf3yndcf3yndcf.png", 
  groupEvent: "https://i.ibb.co/ZCd52DX/Gemini-Generated-Image-rspa2srspa2srspa.png", 
  childhoodBoy: "https://i.ibb.co/xKQ3pRrX/Gemini-Generated-Image-ktbwkgktbwkgktbw.png", 
  coupleWalkingBlue: "https://i.ibb.co/NdZzhHfd/Gemini-Generated-Image-gz1wl6gz1wl6gz1w.png", 
  redHairSolo: "https://i.ibb.co/KpkwLDBh/Gemini-Generated-Image-12qee112qee112qe.png", 
  redTopCar: "https://i.ibb.co/WNkwK36q/Gemini-Generated-Image-flrinflrinflrinf.png",
  mirrorRedTop: "https://i.ibb.co/391LY2qw/Gemini-Generated-Image-83qmp783qmp783qm.png", 
  carSelfieClosedEyes: "https://i.ibb.co/6JV3j36r/Gemini-Generated-Image-n4y5yen4y5yen4y5.png", 
  blackShirtSmile: "https://i.ibb.co/Kjd1F3kf/Gemini-Generated-Image-4bcl6m4bcl6m4bcl.png", 
  basketballTeam: "https://i.ibb.co/Psh4Qcjs/Whats-App-Image-2025-11-22-at-20-08-23.jpg".replace(/ /g, '%20'), 

  // Cats (Matriarchy) - Keeping existing placeholders to prevent errors if not provided
  diego: "https://i.ibb.co/nNpM14Xz/Gemini-Generated-Image-fqmm87fqmm87fqmm.png",
  archie: "https://i.ibb.co/BKvB3Rf3/Whats-App-Image-2025-11-22-at-20-02-43.jpg".replace(/ /g, '%20'),
  katy: "https://i.ibb.co/mFzTMTTX/Gemini-Generated-Image-od3o85od3o85od3o.png",
  casper: "https://i.ibb.co/gLY0gy1B/Whats-App-Image-2025-11-22-at-20-01-20.jpg".replace(/ /g, '%20'),
  leonard: "https://i.ibb.co/zHLJpNz5/Whats-App-Image-2025-11-22-at-20-04-14.jpg".replace(/ /g, '%20'),
  snowbell: "https://i.ibb.co/TM9rBf0Z/Whats-App-Image-2025-11-22-at-20-04-28.jpg".replace(/ /g, '%20'),
  oliver: "https://i.ibb.co/ZRFCB8p3/Gemini-Generated-Image-7zvdah7zvdah7zvd.png",
  
  // Scenes
  whiteKurtiCatScene: "https://i.ibb.co/xKQ3pRrX/Gemini-Generated-Image-ktbwkgktbwkgktbw.png",
  
  // Scene Background Placeholders
  apologyBackground: "https://i.ibb.co/xKQ3pRrX/Gemini-Generated-Image-ktbwkgktbwkgktbw.png", // Scene 4 (Apology) Background
  finaleBackground: "https://i.ibb.co/39PHZbJk/Gemini-Generated-Image-khavqukhavqukhav.png".replace(/ /g, '%20') // Scene 5 (Finale) Background
};

export const CATS: Cat[] = [
  { name: 'Diego', image: IMAGES.diego },
  { name: 'Archie', image: IMAGES.archie },
  { name: 'Katy', image: IMAGES.katy },
  { name: 'Casper', image: IMAGES.casper },
  { name: 'Leonard', image: IMAGES.leonard },
  { name: 'Snowbell', image: IMAGES.snowbell}, 
  { name: 'Oliver', image: IMAGES.oliver },
];

// PLACEHOLDERS: Replace audioUrl with your local music paths (e.g. "/music/song1.mp3")
export const SONGS: (Song & { audioUrl: string })[] = [
  { 
    title: 'Coconut Tree', 
    artist: 'Mohombi', 
    audioUrl: 'https://files.catbox.moe/nzg8w1.mp3' 
  },
  { 
    title: 'In Your Head', 
    artist: 'Mohombi', 
    audioUrl: 'https://files.catbox.moe/0pfjsv.mp3' 
  },
  { 
    title: 'What Am I', 
    artist: 'Why Don’t We', 
    audioUrl: 'https://files.catbox.moe/whnpt7.mp3' 
  },
  { 
    title: 'Don’t Change', 
    artist: 'Why Don’t We', 
    audioUrl: 'https://files.catbox.moe/hcaa1e.mp3' 
  },
  { 
    title: '8 Letters', 
    artist: 'Why Don’t We', 
    audioUrl: 'https://files.catbox.moe/iupne9.mp3' 
  },
];

// Organized by mood: Childhood/Innocence -> Joy/Fun -> Connection/Romance
export const MEMORIES: Memory[] = [
  { id: 1, url: IMAGES.childhoodYellow, caption: "Where it all began", rotation: -4 },
  { id: 2, url: IMAGES.childhoodBoy, caption: "Little You", rotation: 3 },
  { id: 3, url: IMAGES.basketballTeam, caption: "Team Spirit #16", rotation: -2 },
  { id: 4, url: IMAGES.whiteKurti, caption: "Pure Joy", rotation: 2 },
  { id: 5, url: IMAGES.redHairSolo, caption: "Stunning", rotation: 1 },
  { id: 6, url: IMAGES.mirrorRedTop, caption: "Selfie Queen", rotation: -3 },
  { id: 7, url: IMAGES.closeSelfie, caption: "That Smile", rotation: 2 },
  { id: 8, url: IMAGES.blackShirtSmile, caption: "Infectious Happiness", rotation: -2 },
  { id: 9, url: IMAGES.redTopCar, caption: "Road Trips", rotation: 4 },
  { id: 10, url: IMAGES.carSelfieClosedEyes, caption: "Peace", rotation: -1 },
  { id: 11, url: IMAGES.coupleWalkingBlue, caption: "Side by Side", rotation: 3 },
  { id: 12, url: IMAGES.walkingBack, caption: "I Got You", rotation: -2 },
  { id: 13, url: IMAGES.coupleRedHair, caption: "Us Against The World", rotation: 1 },
  { id: 14, url: IMAGES.groupEvent, caption: "Celebrations", rotation: -3 },
];

// Working URLs for ambient background sounds
export const SCENE_SOUNDS = {
  // Main Global Soundtrack (The single audio file for the app)
  mainAppSoundtrack: "https://files.catbox.moe/wsppup.mp3" 
};

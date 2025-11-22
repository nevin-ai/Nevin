export interface Song {
  title: string;
  artist: string;
}

export interface Cat {
  name: string;
  image?: string;
}

export interface Memory {
  id: number;
  url: string;
  caption: string;
  rotation: number;
}

export enum AppState {
  LOCKED = 'LOCKED',
  ENTERED = 'ENTERED',
  FINALE = 'FINALE'
}
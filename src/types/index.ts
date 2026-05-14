// src/types/index.ts
// Interfaces e tipos compartilhados por todo o portfólio

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  url: string;
  homepage?: string;
  language: string;
  isFeatured?: boolean;
  featured?: {
    challenge: string;
    solution: string;
    highlight: string;
  };
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface TechItem {
  name: string;
  icon: string; // SVG path or component key
  color: string; // original brand color for hover
}

export interface SpotifyTrack {
  isPlaying: boolean;
  track?: string;
  artist?: string;
  url?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  avatar?: string;
  createdAt: string;
}

export type CursorState = 'default' | 'link' | 'text' | 'image';

export type Theme = 'light' | 'dark';

export interface CommandResult {
  type: 'text' | 'success' | 'error' | 'audio' | 'ascii';
  lines: string[];
}

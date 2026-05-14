// src/hooks/useSpotify.ts
// Mock do widget Spotify — preparado para integração com a Spotify Web API
import { useState, useEffect } from 'react';
import type { SpotifyTrack } from '../types';

const MOCK_DATA: SpotifyTrack = {
  isPlaying: true,
  track: 'Voz da Verdade',
  artist: 'KayBlack',
  url: 'https://open.spotify.com',
};

export function useSpotify(): SpotifyTrack {
  const [data, setData] = useState<SpotifyTrack>({ isPlaying: false });

  useEffect(() => {
    // TODO: Substituir por chamada real à API NestJS:
    // const res = await fetch('/api/spotify/now-playing');
    // const json = await res.json();
    // setData(json);
    
    // Simula delay de rede
    const timer = setTimeout(() => setData(MOCK_DATA), 800);
    return () => clearTimeout(timer);
  }, []);

  return data;
}

// src/components/ui/KonamiOverlay.tsx
// Overlay do Konami Code com arte ASCII do Botafogo
import { useEffect, useRef } from 'react';

const BOTAFOGO_ASCII = `
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⢉⣉⣉⣉⡉⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡿⠿⠿⠟⣋⣁⣤⡾⠿⠛⠛⠉⠛⠛⠿⢷⣤⣈⣙⠻⠿⠿⢿⣿⣿
⣿⣿⡇⣶⡶⠿⠛⠛⠉⠄⠄⠄⠄⢀⠄⠄⠄⠄⠉⠛⠛⠿⢶⣶⢸⣿⣿
⣿⣿⡇⣿⡇⠄⠄⠄⠄⠄⠄⠄⢠⣿⡄⠄⠄⠄⠄⠄⠄⠄⢸⣿⢸⣿⣿
⣿⣿⡇⢿⡇⠄⠄⠄⠄⠄⠄⠄⣸⣿⣇⠄⠄⠄⠄⠄⠄⠄⢸⡿⢸⣿⣿
⣿⣿⡇⢸⣷⠄⠄⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠃⠄⠄⣾⡇⢸⣿⣿
⣿⣿⣇⠈⣿⣆⠄⠄⠄⠄⢉⣿⣿⣿⣿⣿⡉⠄⠄⠄⠄⣰⣿⠁⣸⣿⣿
⣿⣿⣿⣆⠻⣿⡀⠄⠄⠄⣼⡿⠟⠉⠻⢿⣧⠄⠄⠄⢀⣿⠟⣰⣿⣿⣿
⣿⣿⣿⣿⡀⠙⣷⡄⠄⠐⠉⠄⠄⠄⠄⠄⠉⠃⠄⢠⣾⠋⢀⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣆⠙⢿⣄⡀⠄⠄⠄⠄⠄⠄⠄⢀⣠⡿⠋⣰⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣧⡌⠛⢷⣤⡀⠄⠄⠄⢀⣤⡾⠛⢡⣾⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣶⣎⠉⠿⣶⣶⣶⠿⠉⣱⣶⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⣉⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
`;

interface KonamiOverlayProps {
  active: boolean;
  onClose: () => void;
}

export function KonamiOverlay({ active, onClose }: KonamiOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [active, onClose]);

  return (
    <div
      id="konami-overlay"
      ref={ref}
      className={active ? 'active' : ''}
      onClick={onClose}
      role="dialog"
      aria-label="Easter egg Botafogo"
      aria-hidden={!active}
    >
      <div className="text-center">
        <pre style={{ fontFamily: 'monospace', color: '#ffffff', lineHeight: 1.3, fontSize: 'clamp(0.5rem, 1.5vw, 0.9rem)' }}>
          {BOTAFOGO_ASCII}
        </pre>
        <p style={{ color: '#555', fontSize: '0.7rem', fontFamily: 'monospace', marginTop: '1rem' }}>
          ↑↑↓↓←→←→BA — você encontrou o easter egg. Clique para fechar.
        </p>
      </div>
    </div>
  );
}

// src/hooks/useKonami.ts
// Detecta a sequência do Konami Code ou a palavra secreta globalmente
import { useEffect, useCallback } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];
const SECRET_WORD = 'botafogo'.split('');

export function useKonami(onSuccess: () => void) {
  const handler = useCallback(() => {
    let konamiIndex = 0;
    let wordIndex = 0;

    const keydown = (e: KeyboardEvent) => {
      // Checa Konami
      if (e.key === KONAMI_SEQUENCE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_SEQUENCE.length) {
          onSuccess();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = e.key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }

      // Checa palavra secreta
      if (e.key.toLowerCase() === SECRET_WORD[wordIndex]) {
        wordIndex++;
        if (wordIndex === SECRET_WORD.length) {
          onSuccess();
          wordIndex = 0;
        }
      } else {
        wordIndex = e.key.toLowerCase() === SECRET_WORD[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [onSuccess]);

  useEffect(() => {
    return handler();
  }, [handler]);
}

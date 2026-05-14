// src/hooks/useKudos.ts
// Mock do sistema de Kudos — preparado para integração com API/banco de dados
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'portfolio-kudos-count';
const USER_CLICKED_KEY = 'portfolio-kudos-clicked';

export function useKudos() {
  const [count, setCount] = useState<number>(() => {
    return parseInt(localStorage.getItem(STORAGE_KEY) ?? '42', 10);
  });
  const [justClicked, setJustClicked] = useState(false);

  const increment = useCallback(async () => {
    // TODO: Substituir por chamada real à API:
    // await fetch('/api/kudos', { method: 'POST' })
    const newCount = count + 1;
    setCount(newCount);
    setJustClicked(true);
    localStorage.setItem(STORAGE_KEY, String(newCount));
    // Registra que o usuário interagiu (para analytics futuros)
    localStorage.setItem(USER_CLICKED_KEY, 'true');
    setTimeout(() => setJustClicked(false), 1000);
  }, [count]);

  return { count, increment, justClicked };
}

// src/hooks/useDarkMode.ts
// Dark/Light mode com persistência em localStorage
import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Tema escuro como padrão principal
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return { theme, toggle, isDark: theme === 'dark' };
}

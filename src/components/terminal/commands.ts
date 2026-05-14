// src/components/terminal/commands.ts
// Mapa de comandos do Terminal Interativo + Easter Eggs
import type { CommandResult } from '../../types';

// ─── Acorde de violão em Mi menor (Em) via Web Audio API ──────────────────────
function playGuitar(): void {
  const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  
  // Notas do acorde Em: E2, B2, E3, G3, B3, E4
  const frequencies = [82.41, 123.47, 164.81, 196.0, 246.94, 329.63];
  
  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Timbre mais próximo de violão: onda triangular
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    // ADSR suave — ataque por corda (strum)
    const startTime = ctx.currentTime + i * 0.04;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 2.5);
    
    osc.start(startTime);
    osc.stop(startTime + 2.5);
  });
}

// ─── Mapa de comandos ─────────────────────────────────────────────────────────
export const COMMANDS: Record<string, () => CommandResult> = {
  help: () => ({
    type: 'text',
    lines: [
      '╔══════════════════════════════════════╗',
      '║  Comandos disponíveis                ║',
      '╠══════════════════════════════════════╣',
      '║  whoami        → perfil técnico      ║',
      '║  skills        → stack tecnológica   ║',
      '║  play_guitar   → easter egg 🎸       ║',
      '║  clear         → limpar terminal     ║',
      '║  help          → este menu           ║',
      '╚══════════════════════════════════════╝',
    ],
  }),

  whoami: () => ({
    type: 'success',
    lines: [
      '> Lucas Jesus',
      '> Desenvolvedor Full-Stack — JavaScript Ecosystem',
      '─────────────────────────────────────────',
      '  Localização   Rio de Janeiro (Engenho de Dentro)',
      '  Idade         21 anos',
      '  Formação      7º Período — Ciência da Computação (Estácio)',
      '                Bootcamp Full-Stack (Generation Brasil)',
      '─────────────────────────────────────────',
      '  Foco          TypeScript · Node.js · NestJS · React',
      '  Ferramentas   VS Code · Git · GitHub · MySQL · Insomnia · Vercel',
      '─────────────────────────────────────────',
      '  github.com/lucasrjesus',
    ],
  }),

  skills: () => ({
    type: 'success',
    lines: [
      '> Stack tecnológica',
      '─────────────────────────────────────────',
      '  Front-end     TypeScript · React · Tailwind CSS',
      '  Back-end      Node.js · NestJS · REST API',
      '  Banco         MySQL · TypeORM',
      '  Ferramentas   Git · GitHub · Vite · Vercel · Insomnia',
      '  Estudando     Three.js · GSAP · Docker',
      '─────────────────────────────────────────',
      '  Aberto a novas oportunidades ✓',
    ],
  }),

  play_guitar: () => {
    // Efeito colateral: toca o acorde
    try { playGuitar(); } catch { /* AudioContext pode estar suspenso */ }
    return {
      type: 'audio',
      lines: [
        '♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪',
        '',
        '  Nas horas vagas, sou violonista autodidata.',
        '  Acorde: Mi menor (Em) — o mais melancólico. 🎸',
        '',
        '♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪',
      ],
    };
  },

  clear: () => ({
    type: 'text',
    lines: ['__CLEAR__'], // sinal especial para o Terminal limpar o histórico
  }),
};

export const WELCOME_LINES = [
  '╔══════════════════════════════════════════╗',
  '║  Portfolio Terminal v1.0                 ║',
  '║  github.com/lucasrjesus                  ║',
  '╚══════════════════════════════════════════╝',
  '',
  '  Digite "help" para ver os comandos.',
  '',
];

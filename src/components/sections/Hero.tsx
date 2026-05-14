// src/components/sections/Hero.tsx
// Hero Section remodelada com grid 2 colunas e terminal
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Terminal } from '../terminal/Terminal';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação em cascata para os elementos da esquerda
      gsap.fromTo(
        '.hero-stagger',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );

      // Terminal entra pela direita
      gsap.fromTo(
        '.hero-terminal',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
      style={{ background: 'var(--hero-gradient)' }}
      aria-label="Apresentação"
    >
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center"
      >
        {/* Lado Esquerdo: Textos e Botões */}
        <div className="flex flex-col items-start text-left space-y-6">
          <div className="hero-stagger mb-2">
            <p className="font-mono text-sm text-[var(--accent-color)] font-medium">
              Olá, eu sou o Lucas Jesus
            </p>
          </div>

          <h1 className="hero-stagger text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight">
            Desenvolvedor <br />
            <span className="text-gradient">Full Stack.</span>
          </h1>

          <p className="hero-stagger text-lg text-[var(--text-muted)] max-w-md leading-relaxed">
            Focado em criar aplicações web modernas, escaláveis e com alto desempenho. Apaixonado por transformar ideias em código e gerar impacto real.
          </p>

          <div className="hero-stagger flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-7 py-3.5 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
              style={{ background: 'var(--gradient-sun)' }}
            >
              Ver Projetos
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 border border-[var(--border)] text-[var(--text-primary)] bg-[var(--surface)] rounded-xl font-medium hover:bg-[var(--bg)] transition-colors shadow-sm"
            >
              Entrar em Contato
            </a>
          </div>
        </div>

        {/* Lado Direito: Terminal */}
        <div className="hero-terminal w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
          <Terminal />
        </div>
      </div>
    </section>
  );
}

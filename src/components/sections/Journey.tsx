// src/components/sections/Journey.tsx
// Linha do tempo vertical com ScrollTrigger GSAP
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { JourneyMilestone } from '../../types';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES: JourneyMilestone[] = [
  {
    year: '2023',
    title: 'Estácio — Ciência da Computação',
    subtitle: '7º Período',
    description: 'Graduação em andamento: estruturas de dados, sistemas operacionais, banco de dados e engenharia de software.',
  },
  {
    year: '2026',
    title: 'Generation Brasil',
    subtitle: 'Bootcamp Full-Stack',
    description: 'Bootcamp intensivo focado no ecossistema JavaScript. TypeScript, React, Node.js, NestJS e MySQL na prática, com mentalidade ágil e colaboração em equipe.',
  },
  {
    year: '2026 →',
    title: 'ConnectElas & Mercado',
    subtitle: 'Full-Stack Developer',
    description: 'Desenvolvimento do projeto ConnectElas, portfólio de projetos reais e busca ativa por oportunidades na área de tecnologia.',
  },
];

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Linha vertical sendo desenhada
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      // Cards aparecendo com scroll
      const cards = sectionRef.current?.querySelectorAll('.milestone-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -32 : 32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-32 px-6 relative"
      aria-labelledby="journey-title"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">
            02 / Jornada
          </span>
          <h2
            id="journey-title"
            className="text-4xl md:text-5xl font-light text-[var(--text-primary)] mt-3 tracking-tight"
          >
            A trajetória
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Linha vertical */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border)] origin-top"
            aria-hidden="true"
          />

          <div className="space-y-16">
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                className="milestone-card relative"
              >
                {/* Ponto na linha */}
                <div
                  className="absolute -left-8 top-1.5 w-2.5 h-2.5 rounded-full translate-x-[calc(-50%+0.5px)]"
                  style={{ background: 'var(--accent-color)', boxShadow: '0 0 0 3px var(--bg), 0 0 0 4px var(--accent-color)' }}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
                    {m.year}
                  </span>
                  <h3 className="text-xl font-medium text-[var(--text-primary)] leading-tight">
                    {m.title}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-widest">
                    {m.subtitle}
                  </span>
                  <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

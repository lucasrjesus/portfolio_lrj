// src/components/sections/TechStack.tsx
// Seção de ferramentas — pills elegantes com cor no hover, sem SVG frágil
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Tech {
  name: string;
  color: string;       // cor no hover
  category: string;
}

const STACK: Tech[] = [
  // ── Linguagens
  { name: 'TypeScript', color: '#3178C6', category: 'Linguagem' },
  { name: 'JavaScript', color: '#F7DF1E', category: 'Linguagem' },

  // ── Front-end
  { name: 'React',      color: '#61DAFB', category: 'Front-end' },
  { name: 'Tailwind CSS', color: '#06B6D4', category: 'Front-end' },
  { name: 'HTML',       color: '#E34F26', category: 'Front-end' },
  { name: 'CSS',        color: '#1572B6', category: 'Front-end' },

  // ── Back-end
  { name: 'Node.js',   color: '#339933', category: 'Back-end' },
  { name: 'NestJS',    color: '#E0234E', category: 'Back-end' },
  { name: 'Spring Boot', color: '#6DB33F', category: 'Back-end' },

  // ── Banco de dados
  { name: 'MySQL',     color: '#4479A1', category: 'Banco de dados' },
  { name: 'TypeORM',   color: '#FE0902', category: 'Banco de dados' },

  // ── Ferramentas
  { name: 'Git',       color: '#F05032', category: 'Ferramentas' },
  { name: 'GitHub',    color: '#ffffff', category: 'Ferramentas' },
  { name: 'VS Code',   color: '#007ACC', category: 'Ferramentas' },
  { name: 'Vite',      color: '#646CFF', category: 'Ferramentas' },
  { name: 'Vercel',    color: '#ffffff', category: 'Ferramentas' },
  { name: 'Insomnia',  color: '#4000BF', category: 'Ferramentas' },
];

const CATEGORIES = ['Linguagem', 'Front-end', 'Back-end', 'Banco de dados', 'Ferramentas'];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const groups = sectionRef.current?.querySelectorAll('.tech-group');
      groups?.forEach((group, i) => {
        gsap.fromTo(
          group,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      id="stack"
      ref={sectionRef}
      className="py-32 px-6"
      aria-labelledby="stack-title"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">
            04 / Stack
          </span>
          <h2
            id="stack-title"
            className="text-4xl md:text-5xl font-light text-[var(--text-primary)] mt-3 tracking-tight"
          >
            Ferramentas
          </h2>
        </div>

        {/* Grid por categoria */}
        <div className="space-y-10">
          {CATEGORIES.map(cat => {
            const items = STACK.filter(t => t.category === cat);
            return (
              <div key={cat} className="tech-group">
                {/* Label da categoria */}
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4">
                  {cat}
                </p>
                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {items.map(tech => (
                    <TechPill key={tech.name} tech={tech} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TechPill({ tech }: { tech: Tech }) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-mono text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-default select-none"
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.style.borderColor = tech.color;
          ref.current.style.color = tech.color;
          ref.current.style.boxShadow = `0 0 12px ${tech.color}22`;
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.style.borderColor = '';
          ref.current.style.color = '';
          ref.current.style.boxShadow = '';
        }
      }}
    >
      {/* Dot colorido sempre visível */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
        style={{ background: tech.color }}
      />
      {tech.name}
    </span>
  );
}

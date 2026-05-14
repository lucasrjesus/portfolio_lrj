// src/components/sections/Projects.tsx
// Bento Grid assimétrico com cards de projetos e reveal effect
import { useState, useRef, type MouseEvent } from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { PROJECTS } from '../../data/projects';
import type { Project } from '../../types';

// ─── Tech filter tags ─────────────────────────────────────────────────────────
const ALL_TECH = ['Todos', 'TypeScript', 'React', 'Node.js', 'NestJS', 'JavaScript', 'CSS'];

// ─── Glow effect no mouse ────────────────────────────────────────────────────
function useCardGlow() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current!.style.setProperty('--mx', `${x}%`);
    ref.current!.style.setProperty('--my', `${y}%`);
  };

  return { ref, handleMouseMove };
}

// ─── Card do projeto destaque (ConnectElas) ───────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
  const [tab, setTab] = useState<'challenge' | 'solution' | 'highlight'>('challenge');
  const { ref, handleMouseMove } = useCardGlow();

  const tabs = [
    { id: 'challenge' as const, label: 'Desafio' },
    { id: 'solution' as const, label: 'Solução' },
    { id: 'highlight' as const, label: 'Destaque Técnico' },
  ];

  const content = {
    challenge: project.featured?.challenge,
    solution: project.featured?.solution,
    highlight: project.featured?.highlight,
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="card-glow col-span-1 md:col-span-2 lg:row-span-2 p-6 md:p-8 border border-[var(--border)] rounded-2xl bg-[var(--surface)] flex flex-col gap-6 group transition-colors duration-300 hover:border-[var(--text-muted)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
              Featured
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <h3 className="text-2xl font-medium text-[var(--text-primary)]">{project.name}</h3>
          <p className="text-sm text-[var(--text-muted)] mt-1 leading-relaxed max-w-sm">
            {project.description}
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver código do ${project.name} no GitHub`}
            className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors"
          >
            <GithubIcon size={14} />
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver demo do ${project.name}`}
              className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-0 border border-[var(--border)] rounded-lg overflow-hidden w-fit max-w-full">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            className={`px-4 py-2 text-xs font-mono transition-colors ${
              tab === t.id
                ? 'bg-[var(--text-primary)] text-[var(--bg)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
        {content[tab]}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map(t => (
          <span
            key={t}
            className="text-xs font-mono px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Card padrão ──────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const { ref, handleMouseMove } = useCardGlow();

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="card-glow p-6 border border-[var(--border)] rounded-2xl bg-[var(--surface)] flex flex-col gap-4 group transition-colors duration-300 hover:border-[var(--text-muted)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium text-[var(--text-primary)] group-hover:translate-x-0.5 transition-transform">
            {project.name}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map(t => (
          <span
            key={t}
            className="text-xs font-mono px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Código do ${project.name}`}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <GithubIcon size={12} />
          Código
        </a>
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Demo do ${project.name}`}
            className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ExternalLink size={12} />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Seção principal ──────────────────────────────────────────────────────────
export function Projects() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const featured = PROJECTS.find(p => p.isFeatured)!;
  const others = PROJECTS.filter(p => !p.isFeatured);

  const filteredOthers = activeFilter === 'Todos'
    ? others
    : others.filter(p => p.tech.some(t => t === activeFilter));

  return (
    <section
      id="projects"
      className="py-32 px-6"
      aria-labelledby="projects-title"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">
            03 / Projetos
          </span>
          <h2
            id="projects-title"
            className="text-4xl md:text-5xl font-light text-[var(--text-primary)] mt-3 tracking-tight"
          >
            O que construí
          </h2>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrar por tecnologia">
          {ALL_TECH.map(tech => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              id={`filter-${tech.toLowerCase()}`}
              aria-pressed={activeFilter === tech}
              className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                activeFilter === tech
                  ? 'bg-[var(--text-primary)] text-[var(--bg)] border-transparent'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* ConnectElas — bloco destaque 2×2 */}
          {(activeFilter === 'Todos' || featured.tech.some(t => t === activeFilter)) && (
            <FeaturedCard project={featured} />
          )}

          {/* Projetos restantes */}
          {filteredOthers.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Link para GitHub */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/lucasrjesus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border-b border-transparent hover:border-[var(--text-muted)] pb-0.5"
          >
            <GithubIcon size={14} />
            Ver todos os repositórios
          </a>
        </div>
      </div>
    </section>
  );
}

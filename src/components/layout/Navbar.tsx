// src/components/layout/Navbar.tsx
// Navegação minimalista com dark mode toggle
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import type { Theme } from '../../types';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: '#about', label: 'Sobre' },
  { href: '#journey', label: 'Jornada' },
  { href: '#projects', label: 'Projetos' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contato' },
];

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md'
          : 'py-6'
      }`}
      role="banner"
    >
      <nav
        className="max-w-5xl mx-auto px-6 flex items-center justify-between"
        aria-label="Navegação principal"
      >
        {/* Logotipo / nome */}
        <a
          href="#hero"
          className="text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors font-medium"
          aria-label="Voltar ao início"
        >
          lrj.
        </a>

        {/* Links centrais */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Ações */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            aria-label={`Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

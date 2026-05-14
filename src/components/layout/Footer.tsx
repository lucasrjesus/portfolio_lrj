// src/components/layout/Footer.tsx
// Rodapé limpo e minimalista com links de contato direto

import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--border)] py-12 px-6"
      role="contentinfo"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[var(--text-muted)] font-mono">
            © {new Date().getFullYear()} Lucas Jesus — Rio de Janeiro
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/lucasrjesus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
              <span className="text-sm font-mono">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lucasrjesuss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
              <span className="text-sm font-mono">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// src/components/layout/Footer.tsx
// Rodapé limpo e minimalista com links de contato direto

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--border)] py-12 px-6"
      role="contentinfo"
    >
      <div className="max-w-5xl mx-auto flex justify-center">
        <p className="text-sm text-[var(--text-muted)] font-mono text-center">
          © {new Date().getFullYear()} Lucas Jesus — Rio de Janeiro
        </p>
      </div>
    </footer>
  );
}

// src/App.tsx
// Composição principal da aplicação — orquestra todos os componentes
import { useState } from 'react';
import { ParticleField } from './components/three/ParticleField';
import { ReadingProgress } from './components/ui/ReadingProgress';
import { KonamiOverlay } from './components/ui/KonamiOverlay';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Journey } from './components/sections/Journey';
import { Projects } from './components/sections/Projects';
import { TechStack } from './components/sections/TechStack';
import { Contact } from './components/sections/Contact';
import { useDarkMode } from './hooks/useDarkMode';
import { useKonami } from './hooks/useKonami';

function App() {
  const { theme, toggle } = useDarkMode();
  const [konamiActive, setKonamiActive] = useState(false);

  // Ativa o overlay do Konami Code
  useKonami(() => setKonamiActive(true));

  return (
    <>
      {/* ── Camada de fundo 3D ─────────────────────────── */}
      <ParticleField />

      {/* ── UI global ──────────────────────────────────── */}
      <ReadingProgress />
      <KonamiOverlay
        active={konamiActive}
        onClose={() => setKonamiActive(false)}
      />

      {/* ── Layout principal ───────────────────────────── */}
      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={toggle} />

        <main id="main-content" role="main">
          <Hero />

          <div className="max-w-5xl mx-auto px-6">
            <div className="h-px bg-[var(--border)]" aria-hidden="true" />
          </div>

          <About />

          {/* Divisor sutil */}
          <div className="max-w-5xl mx-auto px-6">
            <div className="h-px bg-[var(--border)]" aria-hidden="true" />
          </div>

          <Journey />

          <div className="max-w-5xl mx-auto px-6">
            <div className="h-px bg-[var(--border)]" aria-hidden="true" />
          </div>

          <Projects />

          <div className="max-w-5xl mx-auto px-6">
            <div className="h-px bg-[var(--border)]" aria-hidden="true" />
          </div>

          <TechStack />

          <div className="max-w-5xl mx-auto px-6">
            <div className="h-px bg-[var(--border)]" aria-hidden="true" />
          </div>

          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;

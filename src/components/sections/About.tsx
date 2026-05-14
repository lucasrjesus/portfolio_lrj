// src/components/sections/About.tsx
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AVATAR_URL = 'https://avatars.githubusercontent.com/u/179963444?v=4';

export function About() {
  const [stats, setStats] = useState({ followers: 0, repos: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/lucasrjesus')
      .then(res => res.json())
      .then(data => {
        setStats({ followers: data.followers, repos: data.public_repos });
      })
      .catch(console.error);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Lado Esquerdo: Foto */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden p-1 group">
            {/* Gradiente animado de fundo */}
            <div 
              className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'var(--gradient-sun)' }} 
            />
            {/* Imagem */}
            <img 
              src={AVATAR_URL} 
              alt="Lucas Jesus" 
              className="relative w-full h-full object-cover rounded-[1.35rem] grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Lado Direito: Textos e Status */}
        <div className="w-full lg:w-3/5 flex flex-col space-y-8">
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-[var(--accent-color)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Sobre mim</h2>
            </div>
            <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text-primary)] font-medium">Desenvolvedor Full Stack</strong> com foco em <span className="text-[var(--text-primary)]">JavaScript, TypeScript e Node.js</span>, atuando no desenvolvimento de APIs REST e aplicações web. Estudante de Ciência da Computação e formado pela Generation Brasil.
            </p>
            <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
              Experiência prática em <strong className="text-[var(--text-primary)] font-medium">back-end e front-end</strong>, aplicando POO, boas práticas e organização de código. Atualmente, aprofundo conhecimentos para evoluir na carreira.
            </p>
            <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed">
              Busco uma oportunidade para atuar em projetos reais e gerar impacto no mercado de tecnologia.
            </p>
          </div>

          {/* Stats & Buttons */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="flex-1 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-center shadow-sm">
                <span className="block text-4xl font-bold text-gradient mb-1">{stats.followers}</span>
                <span className="text-sm text-[var(--text-muted)] font-mono">Seguidores</span>
              </div>
              <div className="flex-1 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-center shadow-sm">
                <span className="block text-4xl font-bold text-gradient mb-1">{stats.repos}</span>
                <span className="text-sm text-[var(--text-muted)] font-mono">Repositórios</span>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <a
                href="https://github.com/lucasrjesus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3.5 border border-[var(--border)] text-[var(--text-primary)] rounded-xl font-medium hover:bg-[var(--surface)] transition-colors shadow-sm"
              >
                Meu GitHub
              </a>
              <a
                href="/curriculo.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3.5 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
                style={{ background: 'var(--gradient-sun)' }}
              >
                Currículo
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// src/data/projects.ts
// Projetos curados — pessoais + organização CodeSeven (Generation Brasil TJS13)
import type { Project } from '../types';

const ORG = 'CodeSeven-Turma-JavaScript-13';

export const PROJECTS: Project[] = [
  // ── DESTAQUE ──────────────────────────────────────────────────────────────
  {
    id: 'connectelas',
    name: 'ConnectElas',
    description: 'Plataforma full-stack que conecta mulheres 30+ ao mercado de tecnologia. Back-end NestJS com autenticação JWT e front-end React com fluxo de onboarding completo.',
    tech: ['React', 'TypeScript', 'NestJS', 'MySQL', 'Tailwind CSS'],
    url: `https://github.com/${ORG}/ConnectElas`,
    homepage: 'https://connect-elas-react.vercel.app/home',
    language: 'TypeScript',
    isFeatured: true,
    featured: {
      challenge: 'Reduzir a barreira de entrada para mulheres acima de 30 anos que desejam migrar para a área tech — criando um ambiente seguro, acolhedor e com oportunidades reais de emprego.',
      solution: 'Plataforma full-stack (NestJS + React) com cadastro de perfis, listagem de vagas e sistema de conexão. JWT para autenticação segura e fluxo de onboarding guiado.',
      highlight: 'Arquitetura modular NestJS com módulos independentes de usuários, vagas e match. Front-end React + Tailwind com deploy contínuo na Vercel via GitHub Actions. Desenvolvido em squad ágil.',
    },
  },

  // ── ORGANIZAÇÃO ────────────────────────────────────────────────────────────
  {
    id: '7fit-react',
    name: '7FIT',
    description: 'Plataforma social para atividades físicas: crie, descubra e participe de eventos esportivos na sua comunidade. React + TypeScript com deploy na Vercel.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    url: `https://github.com/${ORG}/7fit-react`,
    homepage: 'https://7fit-react.vercel.app',
    language: 'TypeScript',
  },
  {
    id: '7health-react',
    name: '7Health',
    description: 'App de saúde e bem-estar com cadastro de hábitos, metas e progresso. Interface responsiva com React + Tailwind CSS e deploy na Vercel.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    url: `https://github.com/${ORG}/projeto_7health_REACT`,
    homepage: 'https://projeto-7health-react.vercel.app',
    language: 'TypeScript',
  },

  // ── PESSOAIS ───────────────────────────────────────────────────────────────
  {
    id: 'blogpessoal-react',
    name: 'Blog Pessoal',
    description: 'Blog full-stack com React + TypeScript no front e Spring Boot no back. CRUD de posts, autenticação JWT e deploy na Vercel.',
    tech: ['React', 'TypeScript', 'Spring Boot'],
    url: 'https://github.com/lucasrjesus/blogpessoal_react_tjs13',
    homepage: 'https://blogpessoal-react-tjs13-taupe.vercel.app',
    language: 'TypeScript',
  },
  {
    id: 'loja-games',
    name: 'Loja Games API',
    description: 'API REST de e-commerce para loja de games. Modelagem relacional MySQL, endpoints RESTful com NestJS e TypeORM.',
    tech: ['TypeScript', 'NestJS', 'MySQL'],
    url: 'https://github.com/lucasrjesus/loja_games',
    language: 'TypeScript',
  },
  {
    id: 'portifolio-v1',
    name: 'Portfólio v1',
    description: 'Primeira versão do portfólio — HTML, CSS e JS puro com design responsivo e deploy no GitHub Pages.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/lucasrjesus/portifolio_tjs13',
    homepage: 'https://lucasrjesus.github.io/portifolio_tjs13',
    language: 'CSS',
  },
];
